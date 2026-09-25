import { useEffect, useMemo, useState } from "react";
import { useData, ALL } from "../lib/useData";

const KEY = "resume-booted";

const hasGL = () => {
    try {
        return !!document.createElement("canvas").getContext("webgl2");
    } catch {
        return false;
    }
};

// Should this visit get the boot log? Once per tab session, never with
// reduced motion.
export const shouldBoot = () => {
    try {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
        if (sessionStorage.getItem(KEY)) return false;
        sessionStorage.setItem(KEY, "1");
        return true;
    } catch {
        return false;
    }
};

const count = (d, file, key) => d?.[file]?.[key]?.length ?? "?";

const lines = (d) => [
    ["", "NF-BIOS 2.6  (c) 2020–" + new Date().getFullYear() + " Noam Favier"],
    ["", "Detecting drives ......... /home/noam"],
    ["", ""],
    ["ok", "Mounted /home/noam"],
    ["ok", `Started experience.service (${count(d, "experience", "experience")} entries)`],
    ["ok", `Started education.service (${count(d, "education", "education")} degrees, ${count(d, "education", "certification")} certs)`],
    ["ok", `Indexed ~/projects (${count(d, "projects", "project")} repositories)`],
    [
        "ok",
        `Loaded ${count(d, "programming_languages", "programming_language")} languages · ${count(d, "frameworks", "framework")} frameworks · ${count(d, "tools", "tool")} tools`,
    ],
    hasGL() ? ["ok", "Started gpu-ascii.service"] : ["warn", "gpu-ascii.service: no WebGL2, running without 3D"],
    ["ok", "Reached target résumé."],
    ["", ""],
    ["", "favier login: guest (automatic login)"],
];

const TAG = {
    ok: <span className="text-accent">  OK  </span>,
    warn: <span className="text-warn"> WARN </span>,
};

// A systemd-flavoured boot log over the page on first visit. Any key or click
// skips it; it never delays the content underneath, which is already mounted.
export default function Boot({ onDone }) {
    const { data } = useData(ALL);
    const all = useMemo(() => lines(data), [data]);
    const [n, setN] = useState(0);

    useEffect(() => {
        if (n > all.length) {
            const t = setTimeout(onDone, 260);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => setN((x) => x + 1), n < 3 ? 110 : 55);
        return () => clearTimeout(t);
    }, [n, all.length, onDone]);

    useEffect(() => {
        const skip = () => onDone();
        addEventListener("keydown", skip);
        addEventListener("pointerdown", skip);
        return () => {
            removeEventListener("keydown", skip);
            removeEventListener("pointerdown", skip);
        };
    }, [onDone]);

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-bg px-4 md:px-8 py-6 text-[13px] leading-6 overflow-hidden select-none"
        >
            {all.slice(0, n).map(([kind, text], i) => (
                <p key={i} className={kind ? "text-fg" : "text-muted"}>
                    {kind && <>[{TAG[kind]}] </>}
                    {text || " "}
                </p>
            ))}
            <span className="cursor-blink text-accent">▋</span>
            <p className="fixed bottom-4 right-6 text-[11px] text-dim">
                any key to skip
            </p>
        </div>
    );
}
