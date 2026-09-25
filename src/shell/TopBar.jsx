import { Link, useLocation } from "react-router-dom";
import { NAV, NF, isActive } from "./nav";
import { useScheme } from "./schemes";
import { useShell } from "./shell-context";

// tmux's window list, more or less: `2:projects*` is the active window.
export default function TopBar() {
    const { pathname } = useLocation();
    const { scheme, cycle } = useScheme();
    const { openCommand, wget } = useShell();

    return (
        <header className="sticky top-0 z-40 bg-bg/95 border-b border-line">
            <div className="max-w-page mx-auto h-11 px-4 md:px-6 flex items-center gap-3 md:gap-6">
                <Link
                    to="/"
                    className="shrink-0 font-bold tracking-tight text-fg"
                    aria-label="Noam Favier, home"
                >
                    <span className="text-accent">noam</span>
                    <span className="text-dim">@</span>
                    <span className="hidden sm:inline">favier</span>
                    <span className="cursor-blink text-accent" aria-hidden>
                        ▋
                    </span>
                </Link>

                <nav
                    aria-label="Main"
                    className="flex-1 min-w-0 overflow-x-auto no-scrollbar"
                >
                    <ul className="flex items-center text-[13px]">
                        {NAV.map((item) => {
                            const active = isActive(pathname, item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        aria-current={active ? "page" : undefined}
                                        className={`block px-2 py-[3px] whitespace-nowrap ${
                                            active
                                                ? "bg-accent text-ink font-bold"
                                                : "text-muted hover:text-fg"
                                        }`}
                                    >
                                        <span
                                            className={`hidden sm:inline ${active ? "" : "text-dim"}`}
                                        >
                                            {item.key}:
                                        </span>
                                        {item.label}
                                        <span className="hidden sm:inline">
                                            {active ? "*" : " "}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <button
                    type="button"
                    onClick={wget}
                    className="hidden lg:inline-flex items-center gap-2 text-[12px] text-muted hover:text-fg"
                    title="Download the PDF (d)"
                >
                    <span className="text-accent">↓</span> resume.pdf
                </button>
                <a
                    href={NF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden xl:inline text-[12px] text-muted hover:text-fg"
                >
                    nf-software <span className="text-dim">↗</span>
                </a>
                <button
                    type="button"
                    onClick={openCommand}
                    className="hidden md:inline-flex items-center gap-2 text-[12px] text-muted hover:text-fg"
                >
                    <span className="kbd">:</span>
                    command
                </button>
                <button
                    type="button"
                    onClick={cycle}
                    className="shrink-0 text-[12px] text-muted hover:text-fg"
                    title="Switch colorscheme (t)"
                >
                    <span className="text-accent">◐</span>
                    <span className="hidden sm:inline"> {scheme}</span>
                </button>
            </div>
        </header>
    );
}
