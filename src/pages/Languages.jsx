import { useMemo, useState } from "react";
import { FaLayerGroup, FaHeart, FaGraduationCap, FaChartBar } from "react-icons/fa";

import { useData } from "../lib/useData";
import PageHeader from "../components/ui/PageHeader";
import StatGrid from "../components/ui/StatGrid";
import FilterBar from "../components/ui/FilterBar";
import ItemCard from "../components/ui/ItemCard";
import { LoadingState, EmptyState } from "../components/ui/States";

const SORT_OPTIONS = [
    { key: "proficiency", label: "Proficiency" },
    { key: "name", label: "Name" },
];

export default function Languages() {
    const { data, isLoading } = useData(["programming_languages"]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("proficiency");

    const languages = useMemo(
        () => data?.programming_languages?.programming_language || [],
        [data],
    );

    const filtered = useMemo(() => {
        let result = languages.filter((lang) => {
            if (
                search &&
                !lang.name.toLowerCase().includes(search.toLowerCase())
            )
                return false;
            if (status === "favorites" && !lang.favorite) return false;
            if (status === "learning" && !lang.learning) return false;
            return true;
        });

        result.sort((a, b) =>
            sort === "name"
                ? a.name.localeCompare(b.name)
                : b.percentage - a.percentage,
        );

        return result;
    }, [languages, search, status, sort]);

    if (isLoading) return <LoadingState label="Loading languages..." />;

    const stats = [
        { label: "Total", value: languages.length, icon: FaLayerGroup },
        {
            label: "Favorites",
            value: languages.filter((l) => l.favorite).length,
            icon: FaHeart,
        },
        {
            label: "Learning",
            value: languages.filter((l) => l.learning).length,
            icon: FaGraduationCap,
        },
        {
            label: "Avg. Level",
            value: `${Math.round(
                languages.reduce((sum, l) => sum + l.percentage, 0) /
                    (languages.length || 1),
            )}%`,
            icon: FaChartBar,
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            <PageHeader
                eyebrow="Toolkit"
                title="Programming Languages"
                description="Languages I write regularly, from systems-level C and Rust to scripting and data tooling."
            />
            <StatGrid stats={stats} />
            <FilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search languages..."
                status={status}
                onStatusChange={setStatus}
                sortOptions={SORT_OPTIONS}
                sort={sort}
                onSortChange={setSort}
            />

            {filtered.length === 0 ? (
                <EmptyState
                    action={
                        <button
                            onClick={() => {
                                setSearch("");
                                setStatus("all");
                            }}
                            className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium"
                        >
                            Clear filters
                        </button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((lang, i) => (
                        <ItemCard key={lang.name} item={lang} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
