import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AsciiObject from "../ascii/AsciiObject";
import PageHead from "../ui/PageHead";
import Meter from "../ui/Meter";
import Pane from "../ui/Pane";
import Section from "../ui/Section";
import ProcTable from "../ui/ProcTable";
import { SearchField, Options, Summary } from "../ui/Filters";
import { LoadingState, EmptyState } from "../ui/States";
import { useData } from "../lib/useData";
import { useDesktop } from "../lib/useMedia";
import { slug } from "../lib/format";

function ExpertisePane({ item, title }) {
    const langs = item.languages || item.key_languages || [];
    const projects = item.key_projects || [];
    const related = item.related_skills || [];
    return (
        <Pane title={title} right={`${item.proficiency}%`} className="px-5 pt-7 pb-5">
            <h3 className="text-fg font-bold">{item.name}</h3>
            <Meter value={item.proficiency} label={item.name} className="mt-3" />
            <p className="mt-4 text-[13px] text-muted leading-relaxed">{item.description}</p>
            {(langs.length > 0 || projects.length > 0 || related.length > 0) && (
                <dl className="mt-5 pt-4 border-t border-line grid grid-cols-[5.5rem_minmax(0,1fr)] gap-y-2 text-[12px]">
                    {langs.length > 0 && (
                        <>
                            <dt className="text-dim">langs</dt>
                            <dd className="flex flex-wrap gap-1.5">
                                {langs.map((l) => (
                                    <span key={l} className="tag border-accent/60 text-accent">
                                        {l}
                                    </span>
                                ))}
                            </dd>
                        </>
                    )}
                    {projects.length > 0 && (
                        <>
                            <dt className="text-dim">projects</dt>
                            <dd className="flex flex-wrap gap-x-3 gap-y-1">
                                {projects.map((p) => (
                                    <Link
                                        key={p}
                                        to={`/projects?open=${slug(p)}`}
                                        className="text-fg hover:text-accent"
                                    >
                                        ./{slug(p)}
                                    </Link>
                                ))}
                            </dd>
                        </>
                    )}
                    {related.length > 0 && (
                        <>
                            <dt className="text-dim">uses</dt>
                            <dd className="text-muted">{related.join(" · ")}</dd>
                        </>
                    )}
                </dl>
            )}
        </Pane>
    );
}

const columns = [
    {
        key: "pid",
        label: "PID",
        className: "text-dim tabular-nums",
        render: (_, i) => String(i + 1).padStart(3, "0"),
    },
    {
        key: "name",
        label: "SKILL",
        value: (s) => s.name,
        render: (s) => <span className="block truncate text-fg">{s.name}</span>,
    },
    {
        key: "cat",
        label: "TYPE",
        value: (s) => s.category,
        render: (s) => <span className="text-muted">{s.category.toLowerCase()}</span>,
    },
    {
        key: "pct",
        label: "LEVEL",
        value: (s) => s.percentage,
        desc: true,
        render: (s) => <Meter value={s.percentage} label={s.name} />,
    },
    {
        key: "desc",
        label: "COMMAND",
        render: (s) => <span className="block truncate text-dim" title={s.description}>{s.description}</span>,
    },
];

export default function Skills() {
    const { data, isLoading } = useData(["skills"]);
    const desktop = useDesktop();
    const [params] = useSearchParams();
    const [search, setSearch] = useState(() => params.get("q") ?? "");
    const [category, setCategory] = useState("all");

    const skills = useMemo(() => data?.skills?.skill || [], [data]);
    const specializations = useMemo(() => data?.skills?.specialization || [], [data]);
    const paradigms = useMemo(() => data?.skills?.paradigm || [], [data]);

    const categories = useMemo(
        () => [...new Set(skills.map((s) => s.category))].sort(),
        [skills],
    );

    const filteredSkills = useMemo(() => {
        const q = search.toLowerCase();
        return skills.filter((skill) => {
            if (
                q &&
                !skill.name.toLowerCase().includes(q) &&
                !skill.description?.toLowerCase().includes(q)
            )
                return false;
            if (category !== "all" && skill.category !== category) return false;
            return true;
        });
    }, [skills, search, category]);

    const avg = Math.round(skills.reduce((sum, s) => sum + s.percentage, 0) / (skills.length || 1));

    return (
        <>
            <PageHead
                path="~/skills"
                title="Skills"
                lead="Core technical and soft skills, plus the specializations and paradigms I lean on most in my work."
                aside={
                    <AsciiObject
                        scene="bars"
                        className="h-[220px] md:h-[300px]"
                        fontSize={desktop ? 9 : 7}
                        scale={1.35}
                    />
                }
            >
                {!isLoading && (
                    <Summary
                        items={[
                            ["core skills", skills.length],
                            ["specializations", specializations.length],
                            ["paradigms", paradigms.length],
                            ["avg. level", `${avg}%`],
                        ]}
                    />
                )}
            </PageHead>

            {isLoading ? (
                <LoadingState label="spawning htop" />
            ) : (
                <>
                    <section className="max-w-page mx-auto px-4 md:px-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-6">
                            <SearchField value={search} onChange={setSearch} placeholder="Search skills..." />
                            <Options
                                options={[
                                    { key: "all", label: "all" },
                                    ...categories.map((c) => ({ key: c, label: c.toLowerCase() })),
                                ]}
                                value={category}
                                onChange={setCategory}
                            />
                        </div>
                        {filteredSkills.length === 0 ? (
                            <EmptyState
                                query={search}
                                onClear={() => {
                                    setSearch("");
                                    setCategory("all");
                                }}
                            />
                        ) : (
                            <ProcTable
                                columns={columns}
                                rows={filteredSkills}
                                rowKey={(s) => s.name}
                                initial={{ key: "pct", desc: true }}
                                template="3ch minmax(10rem,15rem) 6rem minmax(12rem,1fr) minmax(10rem,1.2fr)"
                            />
                        )}
                    </section>

                    {specializations.length > 0 && (
                        <Section n="01" title="Specializations" aside={`${specializations.length} areas`} className="mt-28">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {specializations.map((spec) => (
                                    <ExpertisePane key={spec.name} item={spec} title={`spec/${slug(spec.name)}`} />
                                ))}
                            </div>
                        </Section>
                    )}

                    {paradigms.length > 0 && (
                        <Section n="02" title="Paradigms" aside={`${paradigms.length} ways of working`} className="mt-28">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {paradigms.map((p) => (
                                    <ExpertisePane key={p.name} item={p} title={`paradigm/${slug(p.name)}`} />
                                ))}
                            </div>
                        </Section>
                    )}
                </>
            )}
        </>
    );
}
