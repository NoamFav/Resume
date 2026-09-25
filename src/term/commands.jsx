// The home page shell. Each command gets the argv and a context, and returns
// what to print (a string, a node, or an array of either) or `CLEAR`.
import { SCHEMES } from "../shell/schemes";
import { NF } from "../shell/nav";
import { isOngoing, slug, ym } from "../lib/format";

export const CLEAR = Symbol("clear");

const DIRS = ["projects", "skills", "languages", "frameworks", "tools"];
const FILES = ["about.txt", "contact.txt", "resume.pdf"];

const Dir = ({ children }) => <span className="text-accent font-bold">{children}/</span>;
const Dim = ({ children }) => <span className="text-dim">{children}</span>;
const Err = ({ children }) => <span className="text-err">{children}</span>;

const bar = (pct, w = 20) => {
    const n = Math.round((pct / 100) * w);
    return (
        <>
            [<span className="text-accent">{"|".repeat(n)}</span>
            {" ".repeat(w - n)}
            <Dim>{String(pct).padStart(4)}%</Dim>]
        </>
    );
};

const cols = (names) => (
    <span className="flex flex-wrap gap-x-6">
        {names.map((n, i) => (
            <span key={i}>{n}</span>
        ))}
    </span>
);

const projects = (d) => d?.projects?.project ?? [];
const findProject = (d, name) =>
    projects(d).find((p) => slug(p.title) === slug(name.replace(/\/$/, "")));

const top = (list, n) =>
    [...(list ?? [])].sort((a, b) => b.percentage - a.percentage).slice(0, n);

const table = (rows) => (
    <span className="grid grid-cols-[max-content_1fr] gap-x-4">
        {rows.map(([k, v], i) => (
            <span key={i} className="contents">
                <span className="text-accent">{k}</span>
                <span className="min-w-0">{v}</span>
            </span>
        ))}
    </span>
);

const HELP = [
    ["help", "this list"],
    ["whoami", "who you're looking at"],
    ["ls [dir]", "list files; try ls projects"],
    ["cat <file>", "about.txt, contact.txt"],
    ["cd <dir>", "go to a page: projects, skills, tools…"],
    ["open <name>", "a project's repo, github, linkedin…"],
    ["neofetch", "the system summary"],
    ["git log", "work history"],
    ["htop", "top skills"],
    ["wget resume.pdf", "download the PDF"],
    ["theme [name]", SCHEMES.map((s) => s.id).join(" · ")],
    ["mail", "write to me"],
    ["clear", "or ctrl-l"],
];

export const COMMANDS = {
    help: () => [
        table(HELP),
        <Dim key="d">tab completes, ↑↓ walks history. there may be others.</Dim>,
    ],

    whoami: (_, { d }) => [
        <span key="n" className="text-fg font-bold">
            {d?.config?.site?.title?.split(" - ")[0] ?? "Noam Favier"}
        </span>,
        d?.config?.site?.description ?? "",
    ],

    ls: (args, { d }) => {
        const long = args.some((a) => a.startsWith("-") && a.includes("l"));
        const target = args.find((a) => !a.startsWith("-"));
        if (!target || target === "~" || target === ".") {
            if (!long) return cols([...DIRS.map((x) => <Dir key={x}>{x}</Dir>), ...FILES]);
            return DIRS.map((x) => (
                <span key={x}>
                    <Dim>drwxr-xr-x  noam  </Dim>
                    <Dir>{x}</Dir>
                </span>
            )).concat(
                FILES.map((f) => (
                    <span key={f}>
                        <Dim>-rw-r--r--  noam  </Dim>
                        {f}
                    </span>
                )),
            );
        }
        const dir = target.replace(/^~\//, "").replace(/\/$/, "");
        if (dir === "projects") {
            const list = projects(d);
            if (!long) return cols(list.map((p) => <Dir key={p.title}>{slug(p.title)}</Dir>));
            return list.map((p) => (
                <span key={p.title}>
                    <Dim>drwxr-xr-x  noam  </Dim>
                    <span className="tabular-nums">{String(p.progress_percentage).padStart(3)}% </span>
                    <Dir>{slug(p.title)}</Dir>
                    <Dim>  {p.category}</Dim>
                </span>
            ));
        }
        const inv = {
            languages: d?.programming_languages?.programming_language,
            frameworks: d?.frameworks?.framework,
            tools: d?.tools?.tool,
            skills: d?.skills?.skill,
        }[dir];
        if (inv) return cols(inv.map((x) => x.name.toLowerCase()));
        if (findProject(d, dir)) return cols(["README.md", <Dim key="s">src/</Dim>]);
        return <Err>ls: {target}: No such file or directory</Err>;
    },

    cat: (args, { d }) => {
        if (!args.length) return <Err>cat: missing operand</Err>;
        return args.map((f, i) => {
            const file = f.replace(/^~\//, "");
            if (file === "about.txt")
                return (
                    <span key={i} className="block max-w-[68ch] whitespace-normal font-serif text-[1.02rem] leading-relaxed text-fg/90">
                        {d?.config?.site?.intro}
                    </span>
                );
            if (file === "contact.txt") {
                const c = d?.contact;
                return (
                    <span key={i}>
                        {table([
                            ["email", c?.contact?.email],
                            ["based", c?.contact?.address],
                            ...Object.entries(c?.social ?? {}).map(([k, v]) => [
                                k,
                                v.replace(/^https?:\/\/(www\.)?/, "").replace(/\?.*$/, "").replace(/\/$/, ""),
                            ]),
                        ])}
                    </span>
                );
            }
            if (file === "resume.pdf")
                return (
                    <span key={i}>
                        <Err>cat: resume.pdf: binary file</Err> <Dim>— try </Dim>wget resume.pdf
                    </span>
                );
            const m = file.match(/^(?:projects\/)?([^/]+)\/README\.md$/);
            const p = m && findProject(d, m[1]);
            if (p)
                return (
                    <span key={i} className="block whitespace-normal max-w-[72ch]">
                        <span className="text-fg font-bold"># {p.title}</span>
                        <br />
                        <br />
                        {p.description}
                        <br />
                        <br />
                        <Dim>status: </Dim>
                        {p.progress}
                    </span>
                );
            if (DIRS.includes(file.replace(/\/$/, "")) || findProject(d, file.replace(/^projects\//, "")))
                return <Err key={i}>cat: {f}: Is a directory</Err>;
            return <Err key={i}>cat: {f}: No such file or directory</Err>;
        });
    },

    cd: (args, { navigate }) => {
        const t = (args[0] ?? "~").replace(/^~\/?/, "").replace(/\/$/, "");
        if (!t) return <Dim>already home.</Dim>;
        if (t === "..") return <Dim>there is nothing above ~. this is it.</Dim>;
        if (t === "/") return <Err>cd: /: Permission denied</Err>;
        if (DIRS.includes(t)) {
            navigate(`/${t}`);
            return null;
        }
        return <Err>cd: no such file or directory: {args[0]}</Err>;
    },

    open: (args, { d, wget }) => {
        const what = (args[0] ?? "").toLowerCase();
        if (!what) return <Err>open: which one? try open github</Err>;
        if (what === "resume.pdf") {
            wget();
            return null;
        }
        const social = d?.contact?.social ?? {};
        const url =
            what === "nf-software" || what === "website"
                ? NF
                : social[what] ?? findProject(d, what)?.git_url;
        if (!url) return <Err>open: {args[0]}: nothing by that name</Err>;
        window.open(url, "_blank", "noopener");
        return <Dim>opening {url.replace(/^https?:\/\//, "").replace(/\?.*$/, "")} …</Dim>;
    },

    neofetch: (_, { fetch }) => fetch,

    git: (args, { d }) => {
        if (args[0] === "status")
            return [
                "On branch main",
                "Your career is ahead of 'origin/main' by a few commits.",
                <Dim key="d">  (use &quot;mail&quot; to publish your offer)</Dim>,
            ];
        if (args[0] !== "log") return <Err>git: &apos;{args[0] ?? ""}&apos; is not supported here. try git log</Err>;
        return [...(d?.experience?.experience ?? [])]
            .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
            .map((e) => (
                <span key={e.company + e.position + e.start_date}>
                    <span className="text-warn">{ym(e.start_date)}</span> {e.position}
                    <Dim> @ {e.company}</Dim>
                    {isOngoing(e.end_date) && <span className="text-accent"> (HEAD)</span>}
                </span>
            ));
    },

    htop: (_, { d }) =>
        top(d?.skills?.skill, 8).map((s) => (
            <span key={s.name} className="grid grid-cols-[minmax(0,15rem)_auto] gap-x-3">
                <span className="truncate">{s.name}</span>
                <span>{bar(s.percentage)}</span>
            </span>
        )),

    wget: (args, { wget }) => {
        if (args[0] && args[0] !== "resume.pdf") return <Err>wget: {args[0]}: 404 Not Found</Err>;
        wget();
        return <Dim>saving to &apos;noam-favier-resume.pdf&apos; — progress in the statusline ↓</Dim>;
    },

    theme: (args, { setScheme }) => {
        if (!args[0]) return SCHEMES.map((s) => `${s.id.padEnd(7)} ${s.note}`);
        if (!SCHEMES.some((s) => s.id === args[0])) return <Err>theme: unknown scheme {args[0]}</Err>;
        setScheme(args[0]);
        return <Dim>colorscheme {args[0]}</Dim>;
    },

    mail: (_, { d }) => {
        const email = d?.contact?.contact?.email;
        if (email) location.href = `mailto:${email}`;
        return <Dim>opening a draft to {email} …</Dim>;
    },

    echo: (args) => args.join(" "),
    pwd: () => "/home/noam",
    date: () => new Date().toString(),
    uname: (args) => (args[0] === "-a" ? "Favier 2026.9 noam-arm64 human/brain darwin" : "Favier"),
    history: (_, { history }) => history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`),
    clear: () => CLEAR,
    exit: () => <Dim>logout? there&apos;s a whole résumé left. try cd projects.</Dim>,

    sudo: () => <Err>guest is not in the sudoers file. This incident will be reported.</Err>,
    rm: () => <Err>rm: permission denied. nice try.</Err>,
    vim: () => <Dim>you&apos;re already in it. look at the statusline.</Dim>,
    emacs: () => <Err>zsh: command not found: emacs</Err>,
    make: (args) => <Err>make: *** No rule to make target &apos;{args[0] ?? "all"}&apos;.  Stop.</Err>,
    ping: () => <Dim>64 bytes from noam: icmp_seq=0 ttl=64 time=0.4 ms</Dim>,
};

COMMANDS.nvim = COMMANDS.vim;
COMMANDS.vi = COMMANDS.vim;
COMMANDS.dir = COMMANDS.ls;
COMMANDS.curl = COMMANDS.wget;
COMMANDS.hire = COMMANDS.mail;
COMMANDS.contact = (a, c) => COMMANDS.cat(["contact.txt"], c);
COMMANDS.about = (a, c) => COMMANDS.cat(["about.txt"], c);
COMMANDS.top = COMMANDS.htop;
COMMANDS.btop = COMMANDS.htop;
COMMANDS.colorscheme = COMMANDS.theme;
COMMANDS.man = () => <Dim>no manual entry. try help.</Dim>;

// Everything tab can complete after a command
export const completions = (d) => [
    ...Object.keys(COMMANDS),
    ...DIRS,
    ...FILES,
    ...projects(d).map((p) => slug(p.title)),
    ...projects(d).map((p) => `projects/${slug(p.title)}/README.md`),
    ...Object.keys(d?.contact?.social ?? {}),
    "nf-software",
    ...SCHEMES.map((s) => s.id),
    "log",
    "status",
];

export const lastLogin = () => {
    const t = new Date(Date.now() - 1000 * 60 * 60 * 26);
    return `Last login: ${t.toDateString()} ${t.toTimeString().slice(0, 8)} on ttys001`;
};

