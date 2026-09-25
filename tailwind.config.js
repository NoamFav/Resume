/** @type {import('tailwindcss').Config} */

// Every colour is a colorscheme variable (see src/index.css), so switching
// scheme is one attribute on <html> and no component knows which one is active.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: v("bg"),
                surface: v("surface"),
                raise: v("raise"),
                line: v("line"),
                fg: v("fg"),
                muted: v("muted"),
                dim: v("dim"),
                accent: v("accent"),
                ink: v("ink"),
                warn: v("warn"),
                err: v("err"),
            },
            fontFamily: {
                mono: ['"Victor Mono"', "ui-monospace", "Menlo", "monospace"],
                serif: [
                    '"Source Serif 4"',
                    "Georgia",
                    "ui-serif",
                    "serif",
                ],
            },
            maxWidth: {
                page: "1240px",
            },
        },
    },
    plugins: [],
};
