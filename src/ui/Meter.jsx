import { useEffect, useRef, useState } from "react";

// Fires once, the first time the element scrolls into view
export const useSeen = () => {
    const ref = useRef(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || seen) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setSeen(true);
                io.disconnect();
            }
        });
        io.observe(el);
        return () => io.disconnect();
    }, [seen]);
    return [ref, seen];
};

const BARS = "|".repeat(240);

// htop's meter: `[||||||||||||        88%]`. The bars are real characters
// clipped to the value, so it stays a text meter at any width, and it fills
// in chunky steps the first time it comes on screen.
export default function Meter({ value, label, className = "", tone = "text-accent" }) {
    const [ref, seen] = useSeen();
    return (
        <span
            ref={ref}
            role="meter"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            className={`flex items-center min-w-0 text-[13px] leading-5 ${className}`}
        >
            <span className="text-fg">[</span>
            <span className="flex-1 w-0 min-w-0 overflow-hidden whitespace-nowrap">
                <span
                    className={`block overflow-hidden ${tone} meter-fill`}
                    style={{ width: seen ? `${value}%` : "0%" }}
                    aria-hidden
                >
                    {BARS}
                </span>
            </span>
            <span className="w-[4.5ch] text-right text-muted tabular-nums">
                {value}%
            </span>
            <span className="text-fg">]</span>
        </span>
    );
}
