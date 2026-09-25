import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMMANDS, CLEAR, completions, lastLogin } from "./commands";
import { useScheme } from "../shell/schemes";
import { useShell } from "../shell/shell-context";
import { useSeen } from "../ui/Meter";

const Prompt = () => (
    <span className="shrink-0 whitespace-pre">
        <span className="text-accent font-bold">guest</span>
        <span className="text-dim">@</span>
        <span className="text-fg">favier</span> <span className="text-muted">~</span>{" "}
        <span className="text-accent">$</span>{" "}
    </span>
);

// Longest common prefix, for tab completion with several candidates
const lcp = (xs) =>
    xs.reduce((p, x) => {
        let i = 0;
        while (i < p.length && p[i] === x[i]) i++;
        return p.slice(0, i);
    });

// A real (small) shell. Output is kept as React nodes, so commands can print
// meters and links, not just text.
export default function Terminal({ data, fetch, className = "" }) {
    const navigate = useNavigate();
    const { setScheme } = useScheme();
    const { wget } = useShell();
    const [lines, setLines] = useState(() => [{ out: lastLogin() }]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [hi, setHi] = useState(-1);
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);
    const [seenRef, seen] = useSeen();

    const run = useCallback(
        (raw) => {
            const line = raw.trim();
            const entry = { cmd: raw };
            if (line) {
                const [name, ...args] = line.split(/\s+/);
                const fn = COMMANDS[name.toLowerCase()];
                const res = fn
                    ? fn(args, { d: data, navigate, setScheme, wget, fetch, history: [...history, line] })
                    : `zsh: command not found: ${name}`;
                if (res === CLEAR) {
                    setLines([]);
                    setHistory((h) => [...h, line]);
                    return;
                }
                entry.out = res;
                entry.err = !fn;
                setHistory((h) => [...h, line]);
            }
            setLines((ls) => [...ls, entry]);
        },
        [data, navigate, setScheme, wget, fetch, history],
    );

    // The first time it's on screen, it types `help` to itself
    useEffect(() => {
        if (!seen || !data) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
            run("help");
            return;
        }
        const word = "help";
        let i = 0;
        let t = 0;
        setTyping(true);
        const tick = () => {
            i++;
            setInput(word.slice(0, i));
            if (i < word.length) t = setTimeout(tick, 90 + Math.random() * 60);
            else
                t = setTimeout(() => {
                    setInput("");
                    setTyping(false);
                    run(word);
                }, 260);
        };
        t = setTimeout(tick, 500);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seen, !!data]);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [lines]);

    const complete = () => {
        const parts = input.split(/\s+/);
        const word = parts[parts.length - 1];
        const pool = parts.length === 1 ? Object.keys(COMMANDS) : completions(data);
        const hits = [...new Set(pool.filter((c) => c.startsWith(word)))];
        if (!hits.length) return;
        if (hits.length === 1) {
            parts[parts.length - 1] = hits[0];
            setInput(parts.join(" ") + (hits[0].endsWith("/") ? "" : " "));
            return;
        }
        const pre = lcp(hits);
        if (pre.length > word.length) {
            parts[parts.length - 1] = pre;
            setInput(parts.join(" "));
        } else {
            setLines((ls) => [...ls, { cmd: input, out: hits.join("  ") }]);
        }
    };

    const onKey = (e) => {
        if (typing) {
            e.preventDefault();
            return;
        }
        if (e.key === "Enter") {
            e.preventDefault();
            run(input);
            setInput("");
            setHi(-1);
        } else if (e.key === "Tab") {
            e.preventDefault();
            complete();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!history.length) return;
            const n = hi < 0 ? history.length - 1 : Math.max(0, hi - 1);
            setHi(n);
            setInput(history[n]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (hi < 0) return;
            const n = hi + 1;
            if (n >= history.length) {
                setHi(-1);
                setInput("");
            } else {
                setHi(n);
                setInput(history[n]);
            }
        } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
            e.preventDefault();
            setLines([]);
        } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
            e.preventDefault();
            setLines((ls) => [...ls, { cmd: input + "^C" }]);
            setInput("");
        }
    };

    return (
        <div
            ref={seenRef}
            className={`pane flex flex-col bg-bg ${className}`}
            onMouseUp={() => {
                // click anywhere in the pane to type, unless selecting text
                if (!getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
            }}
        >
            <span className="pane-title">zsh — guest@favier</span>
            <span className="pane-title-right">type help</span>
            <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                className="flex-1 min-h-0 mt-4 overflow-y-auto px-4 pt-1 pb-3 text-[13px] leading-6 cursor-text"
            >
                {lines.map((l, i) => (
                    <div key={i} className="mb-1">
                        {l.cmd !== undefined && (
                            <p className="flex">
                                <Prompt />
                                <span className="break-all">{l.cmd}</span>
                            </p>
                        )}
                        {l.out !== undefined && l.out !== null && (
                            <div className={`whitespace-pre-wrap break-words ${l.err ? "text-err" : "text-fg/90"}`}>
                                {Array.isArray(l.out)
                                    ? l.out.map((o, j) => <div key={j}>{o}</div>)
                                    : l.out}
                            </div>
                        )}
                    </div>
                ))}
                <label className="flex items-baseline">
                    <Prompt />
                    <span className="relative flex-1 min-w-0">
                        <input
                            ref={inputRef}
                            data-search
                            value={input}
                            onChange={(e) => !typing && setInput(e.target.value)}
                            onKeyDown={onKey}
                            spellCheck={false}
                            autoComplete="off"
                            autoCapitalize="off"
                            aria-label="Shell input. Type help for commands."
                            className="w-full bg-transparent outline-none text-fg caret-accent"
                        />
                    </span>
                </label>
            </div>
        </div>
    );
}
