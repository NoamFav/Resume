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

export default function Frameworks() {
    const { data, isLoading } = useData(["frameworks"]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [language, setLanguage] = useState("all");
    const [sort, setSort] = useState("proficiency");

    const frameworks = useMemo(
        () => data?.frameworks?.framework || [],
        [data],
    );

    const languages = useMemo(
        () => [...new Set(frameworks.map((f) => f.language))].sort(),
        [frameworks],
    );

    const filtered = useMemo(() => {
        let result = frameworks.filter((fw) => {
            if (
                search &&
                !fw.name.toLowerCase().includes(search.toLowerCase())
            )
                return false;
            if (language !== "all" && fw.language !== language) return false;
            if (status === "favorites" && !fw.favorite) return false;
            if (status === "learning" && !fw.learning) return false;
            return true;
        });

        result.sort((a, b) =>
            sort === "name"
                ? a.name.localeCompare(b.name)
                : b.percentage - a.percentage,
        );

        return result;
    }, [frameworks, search, status, language, sort]);

    if (isLoading) return <LoadingState label="Loading frameworks..." />;

    const stats = [
        { label: "Total", value: frameworks.length, icon: FaLayerGroup },
        {
            label: "Favorites",
            value: frameworks.filter((f) => f.favorite).length,
            icon: FaHeart,
        },
        {
            label: "Learning",
            value: frameworks.filter((f) => f.learning).length,
            icon: FaGraduationCap,
        },
        {
            label: "Avg. Level",
            value: `${Math.round(
                frameworks.reduce((sum, f) => sum + f.percentage, 0) /
                    (frameworks.length || 1),
            )}%`,
            icon: FaChartBar,
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            <PageHeader
                eyebrow="Toolkit"
                title="Frameworks & Libraries"
                description="The frameworks and libraries I reach for across frontend, backend, mobile, and game development."
            />
            <StatGrid stats={stats} />
            <FilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search frameworks..."
                status={status}
                onStatusChange={setStatus}
                categories={languages}
                category={language}
                onCategoryChange={setLanguage}
                categoryLabel="Languages"
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
                                setLanguage("all");
                            }}
                            className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium"
                        >
                            Clear filters
                        </button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((fw, i) => (
                        <ItemCard
                            key={fw.name}
                            item={fw}
                            index={i}
                            meta={fw.language}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
