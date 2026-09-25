import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AsciiObject from "../ascii/AsciiObject";
import PageHead from "../ui/PageHead";
import Meter from "../ui/Meter";
import ProcTable from "../ui/ProcTable";
import { SearchField, Options, Picker, Summary } from "../ui/Filters";
import { LoadingState, EmptyState } from "../ui/States";
import { useData } from "../lib/useData";
import { useDesktop } from "../lib/useMedia";
import { proficiencyLevel } from "../lib/format";

const STATUS_OPTIONS = [
    { key: "all", label: "all" },
    { key: "favorites", label: "★ favorites" },
    { key: "learning", label: "✎ learning" },
];

// One page per inventory: languages, frameworks, tools. They differ only in
// which file they read and what the "group" column is.
const INVENTORIES = {
    languages: {
        file: "programming_languages",
        key: "programming_language",
        path: "~/languages",
        title: "Programming Languages",
        lead: "Languages I write regularly, from systems-level C and Rust to scripting and data tooling.",
        search: "Search languages...",
        scene: "code",
        loading: "loading languages",
    },
    frameworks: {
        file: "frameworks",
        key: "framework",
        path: "~/frameworks",
        title: "Frameworks & Libraries",
        lead: "The frameworks and libraries I reach for across frontend, backend, mobile, and game development.",
        search: "Search frameworks...",
        scene: "stack",
        loading: "loading frameworks",
        group: { field: "language", label: "lang", all: "All Languages" },
    },
    tools: {
        file: "tools",
        key: "tool",
        path: "~/tools",
        title: "Tools & Technologies",
        lead: "Editors, infrastructure, databases, and everyday tooling that shapes how I build software.",
        search: "Search tools...",
        scene: "gear",
        loading: "loading tools",
        group: { field: "category", label: "category", all: "All Categories" },
    },
};

export default function Inventory({ kind }) {
    const cfg = INVENTORIES[kind];
    const { data, isLoading } = useData([cfg.file]);
    const desktop = useDesktop();
    const [params] = useSearchParams();
    const [search, setSearch] = useState(() => params.get("q") ?? "");
    const [status, setStatus] = useState("all");
    const [group, setGroup] = useState("all");

    const items = useMemo(() => data?.[cfg.file]?.[cfg.key] || [], [data, cfg]);
    const groups = useMemo(
        () =>
            cfg.group
                ? [...new Set(items.map((x) => x[cfg.group.field]).filter(Boolean))].sort()
                : [],
        [items, cfg],
    );

    const filtered = useMemo(
        () =>
            items.filter((x) => {
                const q = search.toLowerCase();
                if (
                    q &&
                    !x.name.toLowerCase().includes(q) &&
                    !x.description?.toLowerCase().includes(q)
                )
                    return false;
                if (cfg.group && group !== "all" && x[cfg.group.field] !== group) return false;
                if (status === "favorites" && !x.favorite) return false;
                if (status === "learning" && !x.learning) return false;
                return true;
            }),
        [items, search, status, group, cfg],
    );

    const clear = () => {
        setSearch("");
        setStatus("all");
        setGroup("all");
    };

    const columns = [
        {
            key: "pid",
            label: "PID",
            className: "text-dim tabular-nums",
            render: (_, i) => String(i + 1).padStart(3, "0"),
        },
        {
            key: "name",
            label: "NAME",
            value: (x) => x.name,
            render: (x) => (
                <span className="block truncate text-fg" title={x.description}>
                    {x.name}
                </span>
            ),
        },
        cfg.group && {
            key: "group",
            label: cfg.group.label.toUpperCase(),
            value: (x) => x[cfg.group.field] ?? "",
            render: (x) => <span className="block truncate text-muted">{x[cfg.group.field]}</span>,
        },
        {
            key: "flags",
            label: "S",
            render: (x) => (
                <span className="whitespace-nowrap" title={[x.favorite && "favorite", x.learning && "currently learning"].filter(Boolean).join(", ")}>
                    <span className={x.favorite ? "text-accent" : "text-line"}>★</span>
                    <span className={x.learning ? "text-warn" : "text-line"}>✎</span>
                </span>
            ),
        },
        {
            key: "level",
            label: "LEVEL",
            value: (x) => x.percentage,
            render: (x) => <span className="text-muted">{proficiencyLevel(x.percentage)}</span>,
        },
        {
            key: "pct",
            label: "PROFICIENCY",
            value: (x) => x.percentage,
            desc: true,
            render: (x) => <Meter value={x.percentage} label={x.name} />,
        },
    ].filter(Boolean);

    const template = cfg.group
        ? "3ch minmax(8rem,1fr) minmax(7rem,12rem) 3ch 7.5rem minmax(12rem,1.4fr)"
        : "3ch minmax(8rem,1fr) 3ch 7.5rem minmax(12rem,1.6fr)";

    const avg = Math.round(items.reduce((s, x) => s + x.percentage, 0) / (items.length || 1));

    return (
        <>
            <PageHead
                path={cfg.path}
                title={cfg.title}
                lead={cfg.lead}
                aside={
                    <AsciiObject
                        scene={cfg.scene}
                        className="h-[220px] md:h-[300px]"
                        fontSize={desktop ? 9 : 7}
                        scale={1.3}
                    />
                }
            >
                {!isLoading && (
                    <Summary
                        items={[
                            ["total", items.length],
                            ["favorites", items.filter((x) => x.favorite).length],
                            ["learning", items.filter((x) => x.learning).length],
                            ["avg. level", `${avg}%`],
                        ]}
                    />
                )}
            </PageHead>

            {isLoading ? (
                <LoadingState label={cfg.loading} />
            ) : (
                <section className="max-w-page mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-6">
                        <SearchField value={search} onChange={setSearch} placeholder={cfg.search} />
                        <Options options={STATUS_OPTIONS} value={status} onChange={setStatus} />
                        {cfg.group && (
                            <Picker
                                options={groups}
                                value={group}
                                onChange={setGroup}
                                all={cfg.group.all}
                            />
                        )}
                    </div>
                    {filtered.length === 0 ? (
                        <EmptyState query={search} onClear={clear} />
                    ) : (
                        <ProcTable
                            key={kind}
                            columns={columns}
                            rows={filtered}
                            rowKey={(x) => x.name}
                            initial={{ key: "pct", desc: true }}
                            template={template}
                        />
                    )}
                    <p className="mt-4 text-[12px] text-dim">
                        {filtered.length}/{items.length} shown · click a column to sort ·{" "}
                        <span className="text-accent">★</span> favorite ·{" "}
                        <span className="text-warn">✎</span> learning
                    </p>
                </section>
            )}
        </>
    );
}
