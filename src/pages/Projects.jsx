import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaLayerGroup,
    FaCheckCircle,
    FaSpinner,
    FaChartBar,
} from "react-icons/fa";

import { useData } from "../lib/useData";
import PageHeader from "../components/ui/PageHeader";
import StatGrid from "../components/ui/StatGrid";
import ProgressBar from "../components/ui/ProgressBar";
import { LoadingState, EmptyState } from "../components/ui/States";

const STATUS_OPTIONS = [
    { key: "all", label: "All" },
    { key: "completed", label: "Completed" },
    { key: "in-progress", label: "In Progress" },
    { key: "planning", label: "Planning" },
];

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors flex flex-col"
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                    <h3 className="text-white font-medium">{project.title}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        {project.category}
                    </p>
                </div>
                {project.progress_percentage === 100 ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center gap-1 shrink-0">
                        <FaCheckCircle className="h-2.5 w-2.5" /> Done
                    </span>
                ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 shrink-0">
                        {project.progress_percentage}%
                    </span>
                )}
            </div>

            <p className="text-sm text-zinc-500 line-clamp-3 mb-4">
                {project.description}
            </p>

            <ProgressBar value={project.progress_percentage} className="mb-4" />

            <div className="flex flex-wrap gap-1.5 mb-4">
                {[...(project.languages || []), ...(project.frameworks || [])]
                    .slice(0, 4)
                    .map((tech, i) => (
                        <span
                            key={`${tech}-${i}`}
                            className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
                        >
                            {tech}
                        </span>
                    ))}
            </div>

            <div className="mt-auto pt-2">
                {project.git_url ? (
                    <a
                        href={project.git_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                        <FaGithub className="h-3.5 w-3.5" />
                        View source
                        <FaExternalLinkAlt className="h-2.5 w-2.5" />
                    </a>
                ) : (
                    <span className="text-sm text-zinc-600">
                        Private repository
                    </span>
                )}
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const { data, isLoading } = useData(["projects"]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");

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
                        project.languages?.some((l) =>
                            l.toLowerCase().includes(q),
                        );
                    if (!matches) return false;
                }
                if (category !== "all" && project.category !== category)
                    return false;
                if (status === "completed" && project.progress_percentage !== 100)
                    return false;
                if (
                    status === "in-progress" &&
                    (project.progress_percentage === 0 ||
                        project.progress_percentage === 100)
                )
                    return false;
                if (status === "planning" && project.progress_percentage > 30)
                    return false;
                return true;
            })
            .sort((a, b) => b.progress_percentage - a.progress_percentage);
    }, [projects, search, status, category]);

    if (isLoading) return <LoadingState label="Loading projects..." />;

    const stats = [
        { label: "Total", value: projects.length, icon: FaLayerGroup },
        {
            label: "Completed",
            value: projects.filter((p) => p.progress_percentage === 100)
                .length,
            icon: FaCheckCircle,
        },
        {
            label: "In Progress",
            value: projects.filter(
                (p) =>
                    p.progress_percentage > 0 && p.progress_percentage < 100,
            ).length,
            icon: FaSpinner,
        },
        {
            label: "Avg. Progress",
            value: `${Math.round(
                projects.reduce((s, p) => s + p.progress_percentage, 0) /
                    (projects.length || 1),
            )}%`,
            icon: FaChartBar,
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            <PageHeader
                eyebrow="Portfolio"
                title="Projects"
                description="A collection of tools, games, and experiments — spanning systems programming, web apps, and AI-driven software."
            />
            <StatGrid stats={stats} />

            <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-10">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                        {STATUS_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setStatus(opt.key)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                    status === opt.key
                                        ? "bg-white text-black"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    {categories.length > 1 && (
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[10rem]"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <p className="text-sm text-zinc-500 mb-6">
                Showing {filtered.length} of {projects.length} projects
            </p>

            {filtered.length === 0 ? (
                <EmptyState
                    action={
                        <button
                            onClick={() => {
                                setSearch("");
                                setStatus("all");
                                setCategory("all");
                            }}
                            className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium"
                        >
                            Clear filters
                        </button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
