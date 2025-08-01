import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import UnifiedSkillCard from "./Cards";
import UnifiedFilters from "./Sorting";
import UnifiedStats from "./Stats";

import {
    FaCode,
    FaSearch,
    FaArrowUp,
    FaEnvelope,
    FaRocket,
    FaSpinner,
} from "react-icons/fa";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

// Custom hook for data loading
const useDataLoader = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const base = import.meta.env.BASE_URL?.endsWith("/")
            ? import.meta.env.BASE_URL
            : (import.meta.env.BASE_URL || "") + "/";

        const loadData = async () => {
            try {
                const response = await fetch(
                    `${base}data/programming_languages.json`,
                );
                const languagesData = await response.json();
                setData(languagesData);
            } catch (error) {
                console.error("Error loading languages data:", error);
                // Fallback data for demo
                setData({
                    programming_language: [
                        {
                            name: "Java",
                            percentage: 90,
                            favorite: true,
                            learning: false,
                            image: "https://cdn.simpleicons.org/java",
                        },
                        {
                            name: "Python",
                            percentage: 85,
                            favorite: true,
                            learning: false,
                            image: "https://cdn.simpleicons.org/python",
                        },
                    ],
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return { data, isLoading };
};

const LanguageFilters = ({ filters, setFilters }) => (
    <UnifiedFilters
        items={[]} // languages don't need items for categories
        filters={filters}
        setFilters={setFilters}
        config={{ type: "languages" }}
    />
);

// Main Languages component
export default function Languages() {
    const { data, isLoading } = useDataLoader();
    const [filters, setFilters] = useState({
        search: "",
        filter: "all",
        sort: "proficiency",
    });

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Filter and sort languages
    const filteredAndSortedLanguages = useMemo(() => {
        if (!data.programming_language) return [];

        let filtered = data.programming_language.filter((languages) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    languages.name.toLowerCase().includes(searchLower) ||
                    languages.category?.toLowerCase().includes(searchLower) ||
                    languages.description?.toLowerCase().includes(searchLower);

                if (!matchesSearch) return false;
            }

            // Category filter
            if (
                filters.category !== "all" &&
                languages.category !== filters.category
            ) {
                return false;
            }

            // Status filter
            const { status } = filters;
            const { percentage, favorite, learning } = languages;

            if (status !== "all") {
                if (status === "favorites" && !favorite) return false;
                if (status === "learning" && !learning) return false;
                if (status === "expert" && percentage < 90) return false;
                if (
                    status === "advanced" &&
                    (percentage < 70 || percentage >= 90)
                )
                    return false;
                if (
                    status === "intermediate" &&
                    (percentage < 50 || percentage >= 70)
                )
                    return false;
                if (status === "beginner" && percentage >= 50) return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (filters.sort) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "proficiency":
                    return b.percentage - a.percentage;
                case "category":
                    return (a.category || "").localeCompare(b.category || "");
                case "favorites":
                    return (
                        b.favorite - a.favorite || b.percentage - a.percentage
                    );
                default:
                    return 0;
            }
        });

        return filtered;
    }, [data.programming_language, filters]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="animate-pulse text-white/70 text-xl flex items-center gap-3">
                    <FaSpinner className="animate-spin" />
                    Loading languages...
                </div>
            </div>
        );
    }

    if (!data.programming_language || data.programming_language.length === 0) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white/70 text-xl text-center">
                    <FaCode className="h-16 w-16 mx-auto mb-4 text-white/40" />
                    <p>No languages found</p>
                    <p className="text-sm text-white/50 mt-2">
                        Check back later for updates!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl rounded-full -top-1/2 left-1/4 w-1/2 h-full" />
                <div className="absolute inset-0 bg-purple-600 opacity-10 blur-3xl rounded-full -bottom-1/2 right-1/4 w-1/2 h-full" />
                <div className="absolute top-40 left-20 w-24 h-24 bg-green-500 opacity-20 blur-3xl rounded-full" />
                <div className="absolute bottom-40 right-20 w-32 h-32 bg-yellow-500 opacity-20 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial="hidden"
                    animate={headerInView ? "visible" : "hidden"}
                    variants={staggerChildren}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeIn} className="mb-8">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                            <FaCode className="h-5 w-5 text-blue-400" />
                            <span className="text-sm font-medium text-white/80">
                                Programming Languages
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            My Languages
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Explore my programming language proficiency and
                            journey through different technologies. From
                            favorites to languages I'm currently learning,
                            here's my coding toolkit.
                        </p>
                    </motion.div>

                    {/* Back to Home Button */}
                    <motion.div variants={fadeIn}>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all hover:scale-105"
                        >
                            <FaArrowUp className="h-4 w-4 rotate-45" />
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Statistics */}
                <UnifiedStats
                    items={data.programming_language}
                    type="languages"
                    topItem="Go"
                />

                {/* Filters */}
                <LanguageFilters
                    languages={data.programming_language}
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                >
                    <p className="text-white/60 text-sm">
                        Showing{" "}
                        <span className="font-medium text-white">
                            {filteredAndSortedLanguages.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-white">
                            {data.programming_language.length}
                        </span>{" "}
                        languages
                        {filters.search && (
                            <span>
                                {" "}
                                matching "
                                <span className="text-blue-300">
                                    {filters.search}
                                </span>
                                "
                            </span>
                        )}
                    </p>
                </motion.div>

                {/* Languages Grid */}
                {filteredAndSortedLanguages.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredAndSortedLanguages.map((language, index) => (
                            <UnifiedSkillCard
                                item={language}
                                index={index}
                                type="language"
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <FaSearch className="h-16 w-16 mx-auto mb-4 text-white/20" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No languages found
                        </h3>
                        <p className="text-white/60 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() =>
                                setFilters({
                                    search: "",
                                    filter: "all",
                                    sort: "proficiency",
                                })
                            }
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-20 pt-16 border-t border-white/10"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Want to collaborate on a project?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        I'm always excited to work with new technologies and
                        expand my language repertoire. Let's build something
                        amazing together using these tools!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                        >
                            Get in Touch <FaEnvelope />
                        </a>
                        <a
                            href="/projects"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            View Projects <FaRocket />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
