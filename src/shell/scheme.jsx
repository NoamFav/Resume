import { useCallback, useState } from "react";
import { SCHEMES, SchemeContext } from "./schemes";

const KEY = "nf-scheme";

const current = () =>
    typeof document !== "undefined"
        ? document.documentElement.dataset.scheme || "night"
        : "night";

export function SchemeProvider({ children }) {
    const [scheme, setSchemeState] = useState(current);

    const setScheme = useCallback((id) => {
        if (!SCHEMES.some((s) => s.id === id)) return;
        document.documentElement.dataset.scheme = id;
        try {
            localStorage.setItem(KEY, id);
        } catch {
            // private mode: the choice just won't outlive the tab
        }
        const bg = getComputedStyle(document.documentElement)
            .getPropertyValue("--bg")
            .trim()
            .replace(/\s+/g, ",");
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", `rgb(${bg})`);
        setSchemeState(id);
    }, []);

    const cycle = useCallback(() => {
        const i = SCHEMES.findIndex((s) => s.id === current());
        setScheme(SCHEMES[(i + 1) % SCHEMES.length].id);
    }, [setScheme]);

    return (
        <SchemeContext.Provider value={{ scheme, setScheme, cycle }}>
            {children}
        </SchemeContext.Provider>
    );
}
