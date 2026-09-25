import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV, NF } from "./nav";
import { SCHEMES, useScheme } from "./schemes";
import { useData, ALL } from "../lib/useData";
import { slug } from "../lib/format";

const buildItems = (d) => {
    const go = (path) => ({ navigate }) => navigate(path);
    const open = (href) => () => window.open(href, "_blank", "noopener");
    const email = d?.contact?.contact?.email;
    const social = d?.contact?.social ?? {};
    const items = [
        ...NAV.map((n) => ({
            label: n.label,
            hint: n.path === "/" ? "~" : `~${n.path}`,
            kind: "cd",
            run: go(n.path),
        })),
        { label: "wget resume.pdf", hint: "download the PDF", kind: "get", run: ({ wget }) => wget() },
        ...(d?.projects?.project ?? []).map((p) => ({
            label: p.title.toLowerCase(),
            hint: p.category,
            kind: "repo",
            run: go(`/projects?open=${slug(p.title)}`),
        })),
        ...[
            ["programming_languages", "programming_language", "lang", "/languages"],
            ["frameworks", "framework", "lib", "/frameworks"],
            ["tools", "tool", "tool", "/tools"],
        ].flatMap(([file, key, kind, path]) =>
            (d?.[file]?.[key] ?? []).map((it) => ({
                label: it.name.toLowerCase(),
                hint: `${it.percentage}%${it.category || it.language ? ` · ${it.category || it.language}` : ""}`,
                kind,
                run: go(`${path}?q=${encodeURIComponent(it.name)}`),
            })),
        ),
        ...(d?.skills?.skill ?? []).map((s) => ({
            label: s.name.toLowerCase(),
            hint: `${s.percentage}% · ${s.category}`,
            kind: "skill",
            run: go(`/skills?q=${encodeURIComponent(s.name)}`),
        })),
        ...SCHEMES.map((s) => ({
            label: `colorscheme ${s.id}`,
            hint: s.note,
            kind: "set",
            run: ({ setScheme }) => setScheme(s.id),
        })),
        ...(email
            ? [
                  {
                      label: "copy email",
                      hint: email,
                      kind: "yank",
                      run: ({ say }) =>
                          navigator.clipboard
                              ?.writeText(email)
                              .then(() => say(`"${email}" yanked to clipboard`)),
                  },
                  { label: "mail", hint: email, kind: "open", run: () => (location.href = `mailto:${email}`) },
              ]
            : []),
        ...Object.entries(social)
            .filter(([k]) => k !== "website")
            .map(([k, url]) => ({
                label: k,
                hint: url.replace(/^https?:\/\/(www\.)?/, "").replace(/\?.*$/, "").replace(/\/$/, ""),
                kind: "open",
                run: open(url),
            })),
        { label: "nf-software", hint: "nf-software.com", kind: "open", run: open(NF) },
        { label: "help", hint: "keys and commands", kind: "help", run: ({ openHelp }) => openHelp() },
    ];
    return items.map((it, i) => ({ ...it, id: i }));
};

// Subsequence match with bonuses for runs and word starts. Good enough for a
// hundred entries and it tolerates "iskr" or "cs amb".
const score = (q, text) => {
    let from = 0;
    let s = 0;
    let run = 0;
    for (const ch of q) {
        if (ch === " ") continue;
        const i = text.indexOf(ch, from);
        if (i < 0) return -1;
        run = i === from ? run + 1 : 0;
        const wordStart = i === 0 || " -/".includes(text[i - 1]);
        s += 1 + run * 2 + (wordStart ? 3 : 0);
        from = i + 1;
    }
    return s - text.length * 0.02;
};

// Ex commands that aren't in the list but ought to do something
const EX = {
    q: ({ say, close }) => {
        close();
        say("E37: No write since last change (add ! to override)");
    },
    "q!": ({ say, close }) => {
        close();
        say("E162: Nothing to quit. Stay a while.");
    },
    w: ({ wget, close }) => {
        close();
        wget();
    },
    wq: ({ say, close, email }) => {
        close();
        if (email) location.href = `mailto:${email}`;
        say('"offer.txt" [New] — let\'s talk');
    },
};
EX.x = EX.wq;

export default function CommandLine({ onClose, say, wget, openHelp }) {
    const navigate = useNavigate();
    const { setScheme } = useScheme();
    const { data } = useData(ALL);
    const [query, setQuery] = useState("");
    const [sel, setSel] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const items = useMemo(() => buildItems(data), [data]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items.filter((i) => ["cd", "get", "set", "yank"].includes(i.kind));
        // A leading kind narrows the list: "tool git", "repo iris", "lang go"
        const [head, ...rest] = q.split(/\s+/);
        const byKind = rest.length > 0 && items.some((i) => i.kind === head);
        const pool = byKind ? items.filter((i) => i.kind === head) : items;
        const needle = byKind ? rest.join(" ") : q;
        return pool
            .map((it) => ({ it, s: score(needle, it.label) }))
            .filter((r) => r.s >= 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 40)
            .map((r) => r.it);
    }, [query, items]);

    useEffect(() => inputRef.current?.focus(), []);
    useEffect(() => setSel(0), [query]);
    useEffect(() => {
        listRef.current
            ?.querySelector(`[data-i="${sel}"]`)
            ?.scrollIntoView({ block: "nearest" });
    }, [sel]);

    const ctx = {
        navigate,
        setScheme,
        say,
        wget,
        openHelp,
        close: onClose,
        email: data?.contact?.contact?.email,
    };

    const run = (item) => {
        onClose();
        item.run(ctx);
    };

    const submit = () => {
        const q = query.trim();
        if (EX[q]) return EX[q](ctx);
        if (results[sel]) return run(results[sel]);
        onClose();
        say(`E492: Not an editor command: ${q}`);
    };

    const onKey = (e) => {
        const move = (d) => {
            e.preventDefault();
            setSel((s) => (s + d + results.length) % Math.max(results.length, 1));
        };
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        } else if (e.key === "Enter") {
            e.preventDefault();
            submit();
        } else if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey) || (e.ctrlKey && e.key === "n")) {
            move(1);
        } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey) || (e.ctrlKey && e.key === "p")) {
            move(-1);
        } else if (e.key === "Backspace" && !query) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50" onMouseDown={onClose}>
            <div
                className="absolute bottom-0 inset-x-0"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <ul
                    ref={listRef}
                    role="listbox"
                    className="max-h-[min(50vh,420px)] overflow-y-auto bg-surface border-t border-line text-[13px]"
                >
                    {results.map((it, i) => (
                        <li
                            key={it.id}
                            data-i={i}
                            role="option"
                            aria-selected={i === sel}
                            onMouseEnter={() => setSel(i)}
                            onClick={() => run(it)}
                            className={`flex items-baseline gap-3 px-4 h-7 leading-7 cursor-pointer ${
                                i === sel ? "bg-accent text-ink" : "text-fg"
                            }`}
                        >
                            <span className="truncate">{it.label}</span>
                            <span className={`shrink-0 text-[11px] ${i === sel ? "text-ink/70" : "text-dim"}`}>
                                {it.kind}
                            </span>
                            <span className={`ml-auto truncate text-[12px] ${i === sel ? "text-ink/70" : "text-muted"}`}>
                                {it.hint}
                            </span>
                        </li>
                    ))}
                    {!results.length && (
                        <li className="px-4 h-7 leading-7 text-dim">
                            no match — Enter runs it as an ex command
                        </li>
                    )}
                </ul>
                <div className="flex items-center h-7 bg-bg border-t border-line text-[13px]">
                    <span className="pl-3 pr-1 text-accent">:</span>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onKey}
                        spellCheck={false}
                        autoComplete="off"
                        aria-label="Command"
                        className="flex-1 bg-transparent outline-none text-fg caret-accent"
                    />
                    <span className="hidden sm:block px-3 text-[11px] text-dim">
                        ↑↓ select · ⏎ run · esc close
                    </span>
                </div>
            </div>
        </div>
    );
}
