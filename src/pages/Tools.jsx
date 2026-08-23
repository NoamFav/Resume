import { useMemo, useState } from "react";
import { FaTools, FaHeart, FaGraduationCap, FaChartBar } from "react-icons/fa";

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

export default function Tools() {
    const { data, isLoading } = useData(["tools"]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("proficiency");

    const tools = useMemo(() => data?.tools?.tool || [], [data]);

    const categories = useMemo(
        () => [...new Set(tools.map((t) => t.category).filter(Boolean))].sort(),
        [tools],
    );

    const filtered = useMemo(() => {
        let result = tools.filter((tool) => {
            if (
                search &&
                !tool.name.toLowerCase().includes(search.toLowerCase()) &&
                !tool.description?.toLowerCase().includes(search.toLowerCase())
            )
                return false;
            if (category !== "all" && tool.category !== category) return false;
            if (status === "favorites" && !tool.favorite) return false;
            if (status === "learning" && !tool.learning) return false;
            return true;
        });

        result.sort((a, b) =>
            sort === "name"
                ? a.name.localeCompare(b.name)
                : b.percentage - a.percentage,
        );

        return result;
    }, [tools, search, status, category, sort]);

    if (isLoading) return <LoadingState label="Loading tools..." />;

    const stats = [
        { label: "Total", value: tools.length, icon: FaTools },
        {
            label: "Favorites",
            value: tools.filter((t) => t.favorite).length,
            icon: FaHeart,
        },
        {
            label: "Learning",
            value: tools.filter((t) => t.learning).length,
            icon: FaGraduationCap,
        },
        {
            label: "Avg. Level",
            value: `${Math.round(
                tools.reduce((sum, t) => sum + t.percentage, 0) /
                    (tools.length || 1),
            )}%`,
            icon: FaChartBar,
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            <PageHeader
                eyebrow="Toolkit"
                title="Tools & Technologies"
                description="Editors, infrastructure, databases, and everyday tooling that shapes how I build software."
            />
            <StatGrid stats={stats} />
            <FilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search tools..."
                status={status}
                onStatusChange={setStatus}
                categories={categories}
                category={category}
                onCategoryChange={setCategory}
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
                                setCategory("all");
                            }}
                            className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium"
                        >
                            Clear filters
                        </button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((tool, i) => (
                        <ItemCard
                            key={tool.name}
                            item={tool}
                            index={i}
                            meta={tool.category}
                            description={tool.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
