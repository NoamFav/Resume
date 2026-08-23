import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    FaStar,
    FaChartBar,
    FaBullseye,
    FaBrain,
    FaLayerGroup,
} from "react-icons/fa";

import { useData } from "../lib/useData";
import PageHeader from "../components/ui/PageHeader";
import StatGrid from "../components/ui/StatGrid";
import FilterBar from "../components/ui/FilterBar";
import ProgressBar from "../components/ui/ProgressBar";
import { LoadingState } from "../components/ui/States";

function SkillCard({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">{skill.name}</h3>
                <span className="text-xs text-zinc-500">
                    {skill.percentage}%
                </span>
            </div>
            <ProgressBar value={skill.percentage} className="mb-3" />
            <p className="text-sm text-zinc-500">{skill.description}</p>
        </motion.div>
    );
}

function ExpertiseCard({ item, index, accent }) {
    const tags = item.related_skills || [];
    const projects = item.key_projects || [];
    const langs = item.languages || item.key_languages || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
        >
            <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="text-white font-medium">{item.name}</h3>
                <span className="text-xs text-zinc-500 shrink-0">
                    {item.proficiency}%
                </span>
            </div>
            <ProgressBar value={item.proficiency} className="mb-3" />
            <p className="text-sm text-zinc-500 mb-4">{item.description}</p>

            {(tags.length > 0 || projects.length > 0 || langs.length > 0) && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800">
                    {langs.map((l) => (
                        <span
                            key={l}
                            className={`text-xs px-2 py-0.5 rounded-full ${accent}`}
                        >
                            {l}
                        </span>
                    ))}
                    {projects.slice(0, 3).map((p) => (
                        <span
                            key={p}
                            className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
                        >
                            {p}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default function Skills() {
    const { data, isLoading } = useData(["skills"]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const skills = useMemo(() => data?.skills?.skill || [], [data]);
    const specializations = useMemo(
        () => data?.skills?.specialization || [],
        [data],
    );
    const paradigms = useMemo(() => data?.skills?.paradigm || [], [data]);

    const categories = useMemo(
        () => [...new Set(skills.map((s) => s.category))].sort(),
        [skills],
    );

    const filteredSkills = useMemo(() => {
        return skills.filter((skill) => {
            if (
                search &&
                !skill.name.toLowerCase().includes(search.toLowerCase()) &&
                !skill.description?.toLowerCase().includes(search.toLowerCase())
            )
                return false;
            if (category !== "all" && skill.category !== category)
                return false;
            return true;
        });
    }, [skills, search, category]);

    if (isLoading) return <LoadingState label="Loading skills..." />;

    const avg = Math.round(
        skills.reduce((sum, s) => sum + s.percentage, 0) / (skills.length || 1),
    );

    const stats = [
        { label: "Core Skills", value: skills.length, icon: FaStar },
        {
            label: "Specializations",
            value: specializations.length,
            icon: FaBullseye,
        },
        { label: "Paradigms", value: paradigms.length, icon: FaBrain },
        { label: "Avg. Level", value: `${avg}%`, icon: FaChartBar },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            <PageHeader
                eyebrow="Expertise"
                title="Skills"
                description="Core technical and soft skills, plus the specializations and paradigms I lean on most in my work."
            />
            <StatGrid stats={stats} />

            <FilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search skills..."
                categories={categories}
                category={category}
                onCategoryChange={setCategory}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                {filteredSkills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
            </div>

            {specializations.length > 0 && (
                <div className="mb-20">
                    <div className="flex items-center gap-2 mb-8">
                        <FaBullseye className="h-4 w-4 text-blue-400" />
                        <h2 className="text-2xl font-semibold text-white">
                            Specializations
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {specializations.map((spec, i) => (
                            <ExpertiseCard
                                key={spec.name}
                                item={spec}
                                index={i}
                                accent="bg-blue-500/10 text-blue-300"
                            />
                        ))}
                    </div>
                </div>
            )}

            {paradigms.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-8">
                        <FaLayerGroup className="h-4 w-4 text-purple-400" />
                        <h2 className="text-2xl font-semibold text-white">
                            Paradigms
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {paradigms.map((paradigm, i) => (
                            <ExpertiseCard
                                key={paradigm.name}
                                item={paradigm}
                                index={i}
                                accent="bg-purple-500/10 text-purple-300"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
