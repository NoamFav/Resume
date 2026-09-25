import { useEffect, useState } from "react";

export const useMedia = (query, initial = false) => {
    const [match, setMatch] = useState(() =>
        typeof window === "undefined" ? initial : window.matchMedia(query).matches,
    );
    useEffect(() => {
        const m = window.matchMedia(query);
        const on = () => setMatch(m.matches);
        on();
        m.addEventListener("change", on);
        return () => m.removeEventListener("change", on);
    }, [query]);
    return match;
};

export const useDesktop = () => useMedia("(min-width: 768px)", true);
