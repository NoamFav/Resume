import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cwd } from "./nav";
import { useShell } from "./shell-context";

const MODE_STYLE = {
    NORMAL: "bg-accent text-ink",
    INSERT: "bg-warn text-ink",
    COMMAND: "bg-fg text-bg",
};

const clockFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
});

const useClock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const parts = clockFmt.formatToParts(now);
    const get = (t) => parts.find((p) => p.type === t)?.value ?? "";
    return `${get("hour")}:${get("minute")}:${get("second")} ${get("timeZoneName")}`;
};

// vim reports Top / Bot / All / NN% for where you are in the buffer
const useScrollPos = () => {
    const [pos, setPos] = useState("Top");
    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - innerHeight;
            const y = scrollY;
            if (max <= 4) setPos("All");
            else if (y <= 4) setPos("Top");
            else if (y >= max - 4) setPos("Bot");
            else setPos(`${Math.round((y / max) * 100)}%`);
        };
        update();
        addEventListener("scroll", update, { passive: true });
        addEventListener("resize", update);
        return () => {
            removeEventListener("scroll", update);
            removeEventListener("resize", update);
        };
    }, []);
    return pos;
};

export default function StatusLine() {
    const { pathname } = useLocation();
    const { mode, message, openHelp } = useShell();
    const time = useClock();
    const pos = useScrollPos();

    return (
        <div
            aria-label="Status line"
            className="fixed bottom-0 inset-x-0 z-40 h-7 flex items-stretch text-[12px] leading-7 bg-surface border-t border-line select-none"
        >
            <span className={`px-2.5 font-bold ${MODE_STYLE[mode]}`}>
                {mode}
            </span>
            <span className="px-3 bg-raise text-fg whitespace-nowrap">
                {cwd(pathname)}
            </span>
            {/* Only the message is live; the clock would be read out every second */}
            <span role="status" className="flex-1 min-w-0 px-3 truncate text-muted">
                {message}
            </span>
            <span className="hidden md:flex items-center gap-1.5 px-3 text-muted">
                <span className="text-accent">●</span> open for work
            </span>
            <span className="hidden lg:block px-3 text-dim">utf-8</span>
            <span aria-hidden="true" className="hidden sm:block px-3 text-muted tabular-nums">
                {time}
            </span>
            <span className="px-3 bg-raise text-fg w-[4.5em] text-center tabular-nums">
                {pos}
            </span>
            <button
                type="button"
                onClick={openHelp}
                className="hidden md:block px-3 text-muted hover:text-fg"
            >
                ? help
            </button>
        </div>
    );
}
