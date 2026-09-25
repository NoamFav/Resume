// The tmux window list. `key` is the number that jumps there from anywhere.
export const NAV = [
    { key: "1", path: "/", label: "whoami" },
    { key: "2", path: "/projects", label: "projects" },
    { key: "3", path: "/skills", label: "skills" },
    { key: "4", path: "/languages", label: "languages" },
    { key: "5", path: "/frameworks", label: "frameworks" },
    { key: "6", path: "/tools", label: "tools" },
];

export const isActive = (pathname, path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

// What the statusline shows as the working directory
export const cwd = (pathname) => {
    const p = pathname.replace(/\/$/, "");
    return p ? `~${p}` : "~";
};

export const PDF = `${import.meta.env.BASE_URL}resume.pdf`;
export const NF = "https://nf-software.com";
export const HIRE = `${NF}/contact`;
