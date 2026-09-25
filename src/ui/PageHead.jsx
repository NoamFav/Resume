// Page header: the `cd` that got you here, a big title with an optional
// cursive accent, a lead paragraph, and whatever the page wants beside it.
export default function PageHead({ path, title, accent, lead, aside, children }) {
    return (
        <header className="max-w-page mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-12 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-8 md:gap-10 items-end">
            <div>
                <p className="text-[12px] text-dim mb-7">
                    <span className="text-accent">$</span> cd {path}
                </p>
                <h1 className="text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1] font-bold tracking-[-0.03em] text-fg">
                    {title}
                    {accent && (
                        <>
                            {" "}
                            <em className="text-accent">{accent}</em>
                        </>
                    )}
                </h1>
                {lead && (
                    <p className="mt-7 max-w-xl text-muted leading-relaxed">{lead}</p>
                )}
                {children}
            </div>
            {aside}
        </header>
    );
}
