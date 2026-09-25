import { useEffect, useState } from "react";
import { isOngoing } from "../lib/format";

const SWATCHES = ["bg-fg", "bg-muted", "bg-dim", "bg-line", "bg-accent", "bg-warn", "bg-err", "bg-raise"];

// Time since the first entry on the résumé, ticking, like uptime(1)
const useUptime = (since) => {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    if (!since) return "";
    let s = Math.max(0, Math.floor((now - since) / 1000));
    const y = Math.floor(s / 31557600);
    s -= y * 31557600;
    const d = Math.floor(s / 86400);
    s -= d * 86400;
    const pad = (n) => String(n).padStart(2, "0");
    return `${y}y ${d}d ${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
};

const lower = (xs) => xs.map((x) => x.name.toLowerCase()).join(", ");
const favs = (list, n, pred = () => true) =>
    [...(list ?? [])]
        .filter((x) => x.favorite && pred(x))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, n);

// neofetch's key: value readout, about a person instead of a machine
export default function Fetch({ data, github, compact = false }) {
    const exp = data?.experience?.experience ?? [];
    const since = exp.length ? Math.min(...exp.map((e) => new Date(e.start_date).getTime())) : 0;
    const uptime = useUptime(since);
    if (!data) return null;

    const study = data.education?.education?.find((e) => isOngoing(e.end_date));
    const work = exp
        .filter((e) => isOngoing(e.end_date))
        .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0];
    const projects = data.projects?.project ?? [];
    const shipped = projects.filter((p) => p.progress_percentage === 100).length;

    const rows = [
        ["role", data.config?.site?.description],
        work && ["work", `${work.position} · ${work.company}`],
        study && ["study", `${study.degree} · ${study.school}`],
        ["uptime", uptime],
        ["based", data.contact?.contact?.address],
        ["langs", lower(favs(data.programming_languages?.programming_language, 6))],
        ["editor", lower(favs(data.tools?.tool, 1, (t) => t.category === "Editors & Terminals"))],
        !compact && ["tools", lower(favs(data.tools?.tool, 4, (t) => t.category !== "Editors & Terminals"))],
        ["repos", `${projects.length} on the résumé · ${shipped} shipped`],
        github && ["github", `${github.publicRepos} public · ★ ${github.stars} · ${github.followers} followers`],
    ].filter(Boolean);

    return (
        <div className="text-[13px] leading-7 min-w-0">
            <p>
                <span className="text-accent font-bold">noam</span>
                <span className="text-dim">@</span>
                <span className="text-accent font-bold">favier</span>
            </p>
            <p className="text-dim" aria-hidden>
                ───────────
            </p>
            <dl>
                {rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[5.5rem_minmax(0,1fr)]">
                        <dt className="text-accent">{k}</dt>
                        <dd className={`text-fg ${k === "uptime" ? "tabular-nums" : ""}`}>{v}</dd>
                    </div>
                ))}
            </dl>
            <div className="mt-4 flex" aria-hidden>
                {SWATCHES.map((c) => (
                    <span key={c} className={`w-7 h-4 ${c}`} />
                ))}
            </div>
        </div>
    );
}
