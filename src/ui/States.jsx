import { useEffect, useState } from "react";

const FRAMES = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

export function LoadingState({ label = "loading" }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((x) => (x + 1) % FRAMES.length), 80);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="max-w-page mx-auto px-4 md:px-6 min-h-[60vh] flex items-center text-[13px] text-muted">
            <span className="text-accent mr-2">{FRAMES[i]}</span>
            {label}…
        </div>
    );
}

export function EmptyState({ query, onClear }) {
    return (
        <div className="py-16 text-[13px]">
            <p className="text-err">
                E486: Pattern not found{query ? `: ${query}` : ""}
            </p>
            <p className="mt-2 text-muted">Try adjusting your filters or search terms.</p>
            {onClear && (
                <button type="button" onClick={onClear} className="btn mt-6 h-9 text-[13px]">
                    :nohlsearch — clear filters
                </button>
            )}
        </div>
    );
}
