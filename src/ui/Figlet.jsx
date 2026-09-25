// Text in the ANSI Shadow figlet face. Built from per-letter rows so nobody
// has to hand-align an 85-column string. Solid blocks take one colour and the
// box-drawing "shadow" another, which is what makes the face read as 3D.
const L = {
    N: ["███╗   ██╗", "████╗  ██║", "██╔██╗ ██║", "██║╚██╗██║", "██║ ╚████║", "╚═╝  ╚═══╝"],
    O: [" ██████╗ ", "██╔═══██╗", "██║   ██║", "██║   ██║", "╚██████╔╝", " ╚═════╝ "],
    A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
    M: ["███╗   ███╗", "████╗ ████║", "██╔████╔██║", "██║╚██╔╝██║", "██║ ╚═╝ ██║", "╚═╝     ╚═╝"],
    F: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "██║     ", "╚═╝     "],
    V: ["██╗   ██╗", "██║   ██║", "██║   ██║", "╚██╗ ██╔╝", " ╚████╔╝ ", "  ╚═══╝  "],
    I: ["██╗", "██║", "██║", "██║", "██║", "╚═╝"],
    E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
    R: ["██████╗ ", "██╔══██╗", "██████╔╝", "██╔══██╗", "██║  ██║", "╚═╝  ╚═╝"],
    " ": ["  ", "  ", "  ", "  ", "  ", "  "],
};

export const figlet = (text) =>
    [0, 1, 2, 3, 4, 5].map((row) => [...text].map((c) => L[c][row]).join(""));

// Split a row into runs of solid and shadow glyphs
const runs = (row) => row.match(/█+|[^█]+/g) ?? [];

// `cols` sizes the glyphs as if the text were that wide, so two lines of
// different lengths can share one font size.
export default function Figlet({ text, cols, solid = "text-fg", shadow = "text-dim", className = "" }) {
    const rows = figlet(text);
    return (
        <div className={`figlet ${className}`} style={{ "--cols": cols ?? rows[0].length }}>
            <pre aria-hidden="true" className="select-none">
                {rows.map((row, i) => (
                    <span key={i} className="block">
                        {runs(row).map((r, j) => (
                            <span key={j} className={r[0] === "█" ? solid : shadow}>
                                {r}
                            </span>
                        ))}
                    </span>
                ))}
            </pre>
        </div>
    );
}
