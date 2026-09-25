import { Link } from "react-router-dom";
import { HIRE, NAV, NF } from "./nav";
import { useData } from "../lib/useData";
import { useShell } from "./shell-context";
import Figlet from "../ui/Figlet";

const Col = ({ title, children }) => (
    <div>
        <h3 className="text-[12px] text-dim mb-4">{title}/</h3>
        <ul className="space-y-2 text-[13px]">{children}</ul>
    </div>
);

export default function Footer() {
    const { data } = useData("contact");
    const { wget } = useShell();
    const info = data?.contact?.contact;
    const social = Object.entries(data?.contact?.social ?? {}).filter(
        ([k]) => k !== "website",
    );

    return (
        <footer className="mt-32 border-t border-line">
            <div className="max-w-page mx-auto px-4 md:px-6 pt-14 pb-10">
                <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10">
                    <div className="col-span-2 md:col-span-1 space-y-4 max-w-sm">
                        <p className="text-[13px] text-muted leading-relaxed">
                            Software engineer building systems tools, AI-driven
                            applications, and interactive experiences. Open to
                            freelance work and new opportunities.
                        </p>
                        {info && (
                            <a href={`mailto:${info.email}`} className="link text-[13px] text-fg">
                                {info.email}
                            </a>
                        )}
                        <p className="text-[12px] text-dim">
                            runs{" "}
                            <a href={NF} target="_blank" rel="noopener noreferrer" className="link text-muted">
                                nf-software.com
                            </a>
                        </p>
                    </div>
                    <Col title="site">
                        {NAV.map((n) => (
                            <li key={n.path}>
                                <Link to={n.path} className="text-muted hover:text-fg">
                                    ./{n.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button type="button" onClick={wget} className="text-muted hover:text-fg">
                                ./resume.pdf <span className="text-dim">↓</span>
                            </button>
                        </li>
                    </Col>
                    <Col title="elsewhere">
                        {social.map(([label, href]) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-fg"
                                >
                                    {label} <span className="text-dim">↗</span>
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href={NF} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                                nf-software <span className="text-dim">↗</span>
                            </a>
                        </li>
                        <li>
                            <a href={HIRE} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                                start your project <span className="text-dim">↗</span>
                            </a>
                        </li>
                    </Col>
                </div>

                <Figlet text="NOAM FAVIER" solid="text-line" shadow="text-line/60" className="mt-16" />

                <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row gap-3 justify-between text-[12px] text-dim">
                    <span>
                        © {new Date().getFullYear()} Noam Favier. All rights reserved.
                        {info?.address && <> · {info.address}</>}
                    </span>
                    <span className="hidden md:inline">
                        press <span className="kbd">?</span> for keys
                    </span>
                </div>
            </div>
        </footer>
    );
}
