import { Link, useLocation } from "react-router-dom";
import { cwd } from "../shell/nav";

export default function NotFound() {
    const { pathname } = useLocation();
    return (
        <section className="max-w-page mx-auto px-4 md:px-6 pt-20 md:pt-28 text-[13px]">
            <p className="text-dim">
                <span className="text-accent">$</span> cd {cwd(pathname)}
            </p>
            <p className="mt-2 text-err">cd: no such file or directory: {cwd(pathname)}</p>
            <h1 className="mt-12 text-[clamp(3rem,9vw,7rem)] leading-none font-bold tracking-[-0.04em] text-fg">
                404<em className="text-accent">.</em>
            </h1>
            <Link to="/" className="btn-primary mt-12">
                cd ~ <span>→</span>
            </Link>
        </section>
    );
}
