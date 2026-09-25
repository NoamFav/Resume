import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AsciiObject from "../ascii/AsciiObject";
import PageHead from "../ui/PageHead";
import Meter from "../ui/Meter";
import { SearchField, Options, Picker, Summary } from "../ui/Filters";
import { LoadingState, EmptyState } from "../ui/States";
import { useData } from "../lib/useData";
import { useDesktop } from "../lib/useMedia";
import { slug } from "../lib/format";

const STATUS_OPTIONS = [
    { key: "all", label: "all" },
    { key: "completed", label: "completed" },
    { key: "in-progress", label: "in progress" },
    { key: "planning", label: "planning" },
];

const glyph = (pct) => (pct === 100 ? "✓" : pct > 30 ? "◐" : "○");

function Row({ project, open, onToggle }) {
    const id = slug(project.title);
    const chips = [...(project.frameworks ?? []), ...(project.tags ?? [])];
    return (
        <li id={id} className="border-b border-line scroll-mt-24">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className={`tui-row w-full grid grid-cols-[1.25rem_minmax(0,1fr)_minmax(0,9rem)] md:grid-cols-[1.25rem_minmax(0,14rem)_minmax(0,1fr)_minmax(0,12rem)] lg:grid-cols-[1.25rem_minmax(0,14rem)_minmax(0,16rem)_minmax(0,1fr)_minmax(0,12rem)] gap-4 items-center px-3 py-3 text-left text-[13px] ${
                    open ? "bg-raise" : ""
                }`}
            >
                <span className={project.progress_percentage === 100 ? "text-accent" : "text-warn"}>
                    {glyph(project.progress_percentage)}
                </span>
                <span className="truncate text-fg font-bold">
                    {id}
                    <span className="text-dim font-normal">/</span>
                </span>
                <span className="hidden md:block truncate text-muted">{project.category}</span>
                <span className="hidden lg:block truncate text-dim">
                    {(project.languages ?? []).join(" · ")}
                </span>
                <Meter value={project.progress_percentage} label={`${project.title} progress`} />
            </button>

            {open && (
                <div className="px-3 pb-8 pt-4 md:pl-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8">
                    <div>
                        <p className="text-[12px] text-dim mb-3">
                            <span className="text-accent">$</span> cat {id}/README.md
                        </p>
                        <h3 className="text-xl font-bold text-fg">
                            <span className="text-accent"># </span>
                            {project.title}
                        </h3>
                        <p className="mt-4 font-serif text-[1.1rem] leading-[1.7] text-fg/90 max-w-2xl">
                            {project.description}
                        </p>
                        {project.progress && (
                            <p className="mt-5 pl-4 border-l-2 border-accent text-[13px] text-muted leading-relaxed max-w-2xl">
                                {project.progress}
                            </p>
                        )}
                    </div>
                    <div className="text-[13px] space-y-5">
                        <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-y-1.5">
                            <dt className="text-accent">category</dt>
                            <dd className="text-fg">{project.category}</dd>
                            <dt className="text-accent">progress</dt>
                            <dd className="text-fg tabular-nums">{project.progress_percentage}%</dd>
                            {project.languages?.length > 0 && (
                                <>
                                    <dt className="text-accent">langs</dt>
                                    <dd className="text-fg">{project.languages.join(", ")}</dd>
                                </>
                            )}
                        </dl>
                        {chips.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {chips.map((t, i) => (
                                    <span key={`${t}-${i}`} className="tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                        {project.git_url ? (
                            <a
                                href={project.git_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn h-9 text-[13px]"
                            >
                                View source <span className="text-dim">↗</span>
                            </a>
                        ) : (
                            <p className="text-dim">Private repository</p>
                        )}
                    </div>
                </div>
            )}
        </li>
    );
}

export default function Projects() {
    const { data, isLoading } = useData(["projects"]);
    const desktop = useDesktop();
    const [params, setParams] = useSearchParams();
    const [search, setSearch] = useState(() => params.get("q") ?? "");
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");
    const [open, setOpen] = useState(() => params.get("open"));

    const projects = useMemo(() => data?.projects?.project || [], [data]);

    const categories = useMemo(
        () => [...new Set(projects.map((p) => p.category))].sort(),
        [projects],
    );

    const filtered = useMemo(() => {
        return projects
            .filter((project) => {
                if (search) {
                    const q = search.toLowerCase();
                    const matches =
                        project.title.toLowerCase().includes(q) ||
                        project.description.toLowerCase().includes(q) ||
                        project.tags?.some((t) => t.toLowerCase().includes(q)) ||
                        project.languages?.some((l) => l.toLowerCase().includes(q));
                    if (!matches) return false;
                }
                if (category !== "all" && project.category !== category) return false;
                if (status === "completed" && project.progress_percentage !== 100) return false;
                if (
                    status === "in-progress" &&
                    (project.progress_percentage === 0 || project.progress_percentage === 100)
                )
                    return false;
                if (status === "planning" && project.progress_percentage > 30) return false;
                return true;
            })
            .sort((a, b) => b.progress_percentage - a.progress_percentage);
    }, [projects, search, status, category]);

    // Arriving with ?open=iris (from the command line or home) scrolls to it
    const openParam = params.get("open");
    useEffect(() => {
        if (!openParam || !data) return;
        setOpen(openParam);
        requestAnimationFrame(() =>
            document.getElementById(openParam)?.scrollIntoView({ block: "start" }),
        );
    }, [openParam, data]);

    const toggle = (id) => {
        setOpen((o) => (o === id ? null : id));
        if (openParam) setParams({}, { replace: true });
    };

    const clear = () => {
        setSearch("");
        setStatus("all");
        setCategory("all");
    };

    const done = projects.filter((p) => p.progress_percentage === 100).length;
    const wip = projects.filter((p) => p.progress_percentage > 0 && p.progress_percentage < 100).length;
    const avg = Math.round(
        projects.reduce((s, p) => s + p.progress_percentage, 0) / (projects.length || 1),
    );

    return (
        <>
            <PageHead
                path="~/projects"
                title="Projects"
                lead="A collection of tools, games, and experiments — spanning systems programming, web apps, and AI-driven software."
                aside={
                    <AsciiObject
                        scene="lab"
                        className="h-[220px] md:h-[300px]"
                        fontSize={desktop ? 9 : 7}
                        scale={1.35}
                    />
                }
            >
                {!isLoading && (
                    <Summary
                        items={[
                            ["total", projects.length],
                            ["completed", done],
                            ["in progress", wip],
                            ["avg. progress", `${avg}%`],
                        ]}
                    />
                )}
            </PageHead>

            {isLoading ? (
                <LoadingState label="indexing ~/projects" />
            ) : (
                <section className="max-w-page mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-6">
                        <SearchField value={search} onChange={setSearch} placeholder="Search projects..." />
                        <Options options={STATUS_OPTIONS} value={status} onChange={setStatus} />
                        <Picker
                            options={categories}
                            value={category}
                            onChange={setCategory}
                            all="All Categories"
                        />
                    </div>

                    <p className="text-[12px] text-dim mb-3">
                        Showing {filtered.length} of {projects.length} projects
                    </p>

                    {filtered.length === 0 ? (
                        <EmptyState query={search} onClear={clear} />
                    ) : (
                        <ul className="border-t border-line">
                            {filtered.map((project) => {
                                const id = slug(project.title);
                                return (
                                    <Row
                                        key={id}
                                        project={project}
                                        open={open === id}
                                        onToggle={() => toggle(id)}
                                    />
                                );
                            })}
                        </ul>
                    )}
                </section>
            )}
        </>
    );
}
