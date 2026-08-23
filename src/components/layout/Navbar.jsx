import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGithub, FaBars, FaTimes, FaFileDownload } from "react-icons/fa";

const NAV_LINKS = [
    { to: "/", label: "Home", end: true },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/languages", label: "Languages" },
    { to: "/frameworks", label: "Frameworks" },
    { to: "/tools", label: "Tools" },
];

const linkClasses = ({ isActive }) =>
    `text-sm transition-colors ${
        isActive ? "text-white font-medium" : "text-zinc-400 hover:text-white"
    }`;

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-900">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="font-semibold text-white tracking-tight"
                    onClick={() => setOpen(false)}
                >
                    Noam Favier
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={linkClasses}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://github.com/NoamFav"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub className="h-4 w-4" />
                    </a>
                    <a
                        href={`${import.meta.env.BASE_URL}resume.pdf`}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        Resume <FaFileDownload className="h-3.5 w-3.5" />
                    </a>
                </div>

                <button
                    onClick={() => setOpen((o) => !o)}
                    className="md:hidden text-white p-2 -mr-2"
                    aria-label="Toggle menu"
                >
                    {open ? (
                        <FaTimes className="h-5 w-5" />
                    ) : (
                        <FaBars className="h-5 w-5" />
                    )}
                </button>
            </div>

            {open && (
                <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-black overflow-y-auto border-t border-zinc-900 px-6 py-4 space-y-1">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `block py-2.5 text-sm ${
                                    isActive
                                        ? "text-white font-medium"
                                        : "text-zinc-400"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <a
                        href={`${import.meta.env.BASE_URL}resume.pdf`}
                        download
                        className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 bg-white text-black rounded-full text-sm font-medium"
                    >
                        Download Resume <FaFileDownload className="h-3.5 w-3.5" />
                    </a>
                </div>
            )}
        </header>
    );
}
