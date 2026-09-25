import { useMemo } from "react";
import { Link } from "react-router-dom";
import AsciiObject from "../ascii/AsciiObject";
import Figlet, { figlet } from "../ui/Figlet";
import Fetch from "../ui/Fetch";
import Meter from "../ui/Meter";
import Pane from "../ui/Pane";
import Section from "../ui/Section";
import Terminal from "../term/Terminal";
import { LoadingState } from "../ui/States";
import { useData, ALL } from "../lib/useData";
import { useGithubStats } from "../lib/useGithub";
import { useDesktop } from "../lib/useMedia";
import { byRecent, formatDate, isOngoing, sha, slug, ym } from "../lib/format";
import { useShell } from "../shell/shell-context";
import { HIRE } from "../shell/nav";

const NAME_COLS = figlet("FAVIER")[0].length;
const byStart = (a, b) => new Date(b.start_date) - new Date(a.start_date);
const topBy = (list, n) =>
    [...(list ?? [])]
        .sort((a, b) => b.favorite - a.favorite || b.percentage - a.percentage)
        .slice(0, n);

function GitLog({ entries }) {
    return (
        <ol className="text-[13px] leading-6">
            {entries.map((e, i) => {
                const live = isOngoing(e.end_date);
                const last = i === entries.length - 1;
                return (
                    <li
                        key={`${e.company}-${e.position}-${e.start_date}`}
                        className="grid grid-cols-[1.5rem_minmax(0,1fr)]"
                    >
                        <span className="flex flex-col items-start text-accent select-none" aria-hidden>
                            <span>{live ? "*" : "○"}</span>
                            {!last && <span className="flex-1 border-l border-dim ml-[0.3em]" />}
                        </span>
                        <div className={last ? "" : "pb-7"}>
                            <p>
                                <span className="text-warn">
                                    commit {sha(e.company + e.position + e.start_date)}
                                </span>
                                {i === 0 && <span className="text-accent"> (HEAD -&gt; main)</span>}
                                {live && i !== 0 && <span className="text-accent"> (ongoing)</span>}
                            </p>
                            <p className="text-muted">
                                Date:{"   "}
                                <span className="tabular-nums">
                                    {formatDate(e.start_date)} – {formatDate(e.end_date)}
                                </span>
                            </p>
                            <p className="mt-2 pl-4 md:pl-8 text-fg font-bold">
                                {e.position}{" "}
                                <span className="font-normal text-muted">@ {e.company}</span>
                            </p>
                            <p className="pl-4 md:pl-8 text-muted">{e.description}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

function Tree({ education }) {
    const list = [...education].sort(byStart);
    return (
        <div className="text-[13px] leading-7">
            <p className="text-accent font-bold">~/education</p>
            {list.map((e, i) => {
                const last = i === list.length - 1;
                const years = `${new Date(e.start_date).getFullYear()}–${
                    e.end_date ? new Date(e.end_date).getFullYear() : "now"
                }`;
                return (
                    <div key={`${e.school}-${e.degree}`}>
                        <p className="flex gap-2">
                            <span className="text-dim shrink-0">{last ? "└──" : "├──"}</span>
                            <span>
                                <span className="text-warn tabular-nums">{years}</span>{" "}
                                <span className="text-fg font-bold">{e.degree}</span>
                                <span className="text-muted"> · {e.school}</span>
                            </span>
                        </p>
                        <p className="flex gap-2">
                            <span className="text-dim shrink-0 whitespace-pre">
                                {last ? "    └──" : "│   └──"}
                            </span>
                            <em className="text-accent">{e.field}</em>
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

function Certs({ certs }) {
    const list = [...certs].sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <div className="text-[13px] leading-7 overflow-x-auto no-scrollbar">
            <p className="text-muted">total {list.length}</p>
            <table className="whitespace-nowrap">
                <tbody>
                    {list.map((c) => (
                        <tr key={c.name} className="tui-row">
                            <td className="pr-3 text-dim">-r--r--r--</td>
                            <td className="pr-3 text-muted tabular-nums">{ym(c.date)}</td>
                            <td className="pr-3 text-right tabular-nums">
                                {c.grade ? (
                                    <span className="text-accent">{c.grade}/100</span>
                                ) : (
                                    <span className="text-dim">—</span>
                                )}
                            </td>
                            <td className="pr-3 text-fg">{c.name}</td>
                            <td className="text-dim">{c.organization}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function TechPane({ title, items, to }) {
    return (
        <Pane title={title} right={`${items.length} total`} className="px-5 pt-7 pb-5">
            <ul className="space-y-2.5">
                {topBy(items, 5).map((it) => (
                    <li
                        key={it.name}
                        className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-3 items-center text-[13px]"
                    >
                        <span className="truncate text-fg">
                            {it.name}
                            {it.favorite && <span className="text-accent"> ★</span>}
                        </span>
                        <Meter value={it.percentage} label={it.name} />
                    </li>
                ))}
            </ul>
            <Link to={to} className="mt-5 inline-block text-[12px] text-muted hover:text-fg">
                :e {to.slice(1)}/ <span className="text-dim">→</span>
            </Link>
        </Pane>
    );
}

function ProjectPane({ p }) {
    return (
        <Pane
            as="article"
            title={`~/projects/${slug(p.title)}`}
            right={p.progress_percentage === 100 ? "✓ done" : `${p.progress_percentage}%`}
            className="px-5 pt-7 pb-5 flex flex-col"
        >
            <p className="text-[12px] text-dim">{p.category}</p>
            <h3 className="mt-1 text-lg font-bold text-fg">{p.title}</h3>
            <p className="mt-3 text-[13px] text-muted leading-relaxed line-clamp-4 flex-1">
                {p.description}
            </p>
            <Meter value={p.progress_percentage} label={`${p.title} progress`} className="mt-4" />
            <div className="mt-4 flex flex-wrap gap-1.5">
                {(p.languages ?? []).slice(0, 4).map((l) => (
                    <span key={l} className="tag">
                        {l}
                    </span>
                ))}
            </div>
            <div className="mt-5 flex gap-5 text-[12px]">
                <Link to={`/projects?open=${slug(p.title)}`} className="text-muted hover:text-fg">
                    cat README <span className="text-dim">→</span>
                </Link>
                {p.git_url && (
                    <a
                        href={p.git_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-fg"
                    >
                        git clone <span className="text-dim">↗</span>
                    </a>
                )}
            </div>
        </Pane>
    );
}

export default function Home() {
    const { data, isLoading } = useData(ALL);
    const github = useGithubStats();
    const desktop = useDesktop();
    const { wget } = useShell();

    const experience = useMemo(
        () => [...(data?.experience?.experience ?? [])].sort(byRecent),
        [data],
    );
    const featured = useMemo(
        () =>
            [...(data?.projects?.project ?? [])]
                .sort((a, b) => b.progress_percentage - a.progress_percentage)
                .slice(0, 3),
        [data],
    );
    const topSkills = useMemo(
        () =>
            [...(data?.skills?.skill ?? [])]
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 8),
        [data],
    );

    if (isLoading) return <LoadingState label="mounting /home/noam" />;

    const { config, contact, education } = data;
    const email = contact?.contact?.email;
    const social = Object.entries(contact?.social ?? {}).filter(([k]) => k !== "website");
    const specs = data.skills?.specialization?.slice(0, 3) ?? [];

    return (
        <>
            <header className="max-w-page mx-auto px-4 md:px-6 pt-12 md:pt-16">
                <p className="text-[12px] text-dim mb-8">
                    <span className="text-accent">$</span> figlet -f &quot;ANSI Shadow&quot; noam favier
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-center">
                    <div>
                        <h1 className="sr-only">{config.site.title.split(" - ")[0]}</h1>
                        <Figlet text="NOAM" cols={NAME_COLS} />
                        <Figlet text="FAVIER" cols={NAME_COLS} solid="text-accent" className="mt-1" />

                        <p className="mt-10 text-[clamp(1.15rem,2vw,1.5rem)] leading-snug">
                            <em className="text-accent">{config.site.description}</em>
                        </p>
                        {specs.length > 0 && (
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {specs.map((s) => (
                                    <li key={s.name} className="tag">
                                        {s.name.split(" &")[0]}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-9 flex flex-wrap gap-3 text-[13px]">
                            <Link to="/projects" className="btn-primary">
                                ./projects <span>→</span>
                            </Link>
                            <button type="button" onClick={wget} className="btn">
                                wget resume.pdf <span className="text-accent">↓</span>
                            </button>
                            <a href={HIRE} target="_blank" rel="noopener noreferrer" className="btn">
                                start your project <span className="text-dim">↗</span>
                            </a>
                            {email && (
                                <a href={`mailto:${email}`} className="btn">
                                    mail noam <span className="text-dim">↗</span>
                                </a>
                            )}
                        </div>
                        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
                            {social.map(([k, url]) => (
                                <li key={k}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted hover:text-fg"
                                    >
                                        {k} <span className="text-dim">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <AsciiObject
                        scene="monogram"
                        className="h-[300px] md:h-[440px] lg:h-[540px]"
                        fontSize={desktop ? 9 : 7}
                        scale={0.95}
                        field={0.4}
                        fieldRadius={0.75}
                    />
                </div>
            </header>

            <Section n="01" title="whoami" aside="neofetch · zsh" className="mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-12">
                    <Fetch data={data} github={github} />
                    <Terminal
                        data={data}
                        fetch={<Fetch data={data} github={github} compact />}
                        className="h-[460px]"
                    />
                </div>
            </Section>

            {config.site.intro && (
                <Section n="02" title="about" aside="cat README.md" className="mt-28">
                    <p className="font-serif text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.7] text-fg/90 max-w-3xl">
                        {config.site.intro}
                    </p>
                </Section>
            )}

            <Section n="03" title="experience" aside="git log" className="mt-28">
                <GitLog entries={experience} />
            </Section>

            <Section n="04" title="education & certifications" aside="tree · ls -l" className="mt-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Tree education={education.education} />
                    <div>
                        <p className="text-[13px] text-accent font-bold">~/certs</p>
                        <Certs certs={education.certification} />
                    </div>
                </div>
            </Section>

            <Section n="05" title="skills" aside="htop" className="mt-28">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                    {topSkills.map((s, i) => (
                        <li
                            key={s.name}
                            className="grid grid-cols-[2rem_minmax(0,12rem)_minmax(0,1fr)] gap-3 items-center text-[13px]"
                        >
                            <span className="text-dim tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="truncate text-fg">{s.name}</span>
                            <Meter value={s.percentage} label={s.name} />
                        </li>
                    ))}
                </ul>
                <Link to="/skills" className="mt-6 inline-block text-[12px] text-muted hover:text-fg">
                    :e skills/ <span className="text-dim">→</span>
                </Link>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TechPane
                        title="languages"
                        items={data.programming_languages.programming_language}
                        to="/languages"
                    />
                    <TechPane title="frameworks" items={data.frameworks.framework} to="/frameworks" />
                    <TechPane title="tools" items={data.tools.tool} to="/tools" />
                </div>
            </Section>

            <Section
                n="06"
                title="featured projects"
                aside={`ls ~/projects | head -${featured.length}`}
                className="mt-28"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featured.map((p) => (
                        <ProjectPane key={p.title} p={p} />
                    ))}
                </div>
                <Link to="/projects" className="btn mt-10 text-[13px]">
                    ls ~/projects{" "}
                    <span className="text-dim">({data.projects.project.length})</span>{" "}
                    <span>→</span>
                </Link>
            </Section>
        </>
    );
}
