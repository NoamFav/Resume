import { createContext, useContext } from "react";

// Terminal colorschemes. The values live in index.css; this only picks one and
// remembers it. The inline script in index.html applies it before first paint.
export const SCHEMES = [
    { id: "night", label: "night", note: "the default, phosphor green on black" },
    { id: "paper", label: "paper", note: "ink on warm paper" },
    { id: "amber", label: "amber", note: "an old amber CRT" },
];

export const SchemeContext = createContext(null);
export const useScheme = () => useContext(SchemeContext);
