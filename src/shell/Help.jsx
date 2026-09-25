import { useEffect } from "react";
import { NAV } from "./nav";

const KEYS = [
    ["1 – 6", NAV.map((n) => n.label).join(" · ")],
    [":  ⌘K", "command line: pages, projects, languages, tools, colorschemes"],
    ["/", "search the current page (or type in the shell on ~)"],
    ["d", "wget resume.pdf"],
    ["t", "cycle colorscheme"],
    ["j  k", "scroll down / up"],
    ["gg  G", "top / bottom of the page"],
    ["?", "this help"],
    ["esc", "close / leave insert mode"],
];

export default function Help({ onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        addEventListener("keydown", onKey);
        return () => removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/70"
            onMouseDown={onClose}
        >
            <div
                role="dialog"
                aria-label="Keyboard help"
                className="pane w-full max-w-lg bg-bg px-6 pt-7 pb-5"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <span className="pane-title">:help keys</span>
                <span className="pane-title-right">esc to close</span>
                <dl className="grid grid-cols-[7rem_1fr] gap-y-2.5 text-[13px]">
                    {KEYS.map(([k, v]) => (
                        <div key={k} className="contents">
                            <dt className="text-accent">{k}</dt>
                            <dd className="text-muted">{v}</dd>
                        </div>
                    ))}
                </dl>
                <p className="mt-5 pt-4 border-t border-line text-[12px] text-dim">
                    Everything here also works with a mouse. The shell on the
                    home page takes <span className="text-muted">help</span> too.
                </p>
            </div>
        </div>
    );
}
