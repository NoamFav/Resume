// Numbered section header: "02 ── custom work ──────────── ~/contact"
export default function Section({ n, title, aside, id, className = "", children }) {
    return (
        <section id={id} className={`max-w-page mx-auto px-4 md:px-6 ${className}`}>
            <header className="flex items-center gap-3 mb-10 text-[12px]">
                {n && <span className="text-accent">{n}</span>}
                <h2 className="text-fg font-bold whitespace-nowrap">{title}</h2>
                <span className="flex-1 border-t border-line" aria-hidden />
                {aside && <span className="text-dim whitespace-nowrap">{aside}</span>}
            </header>
            {children}
        </section>
    );
}
