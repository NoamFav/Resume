import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import UnifiedSkillCard from "./Cards";
import UnifiedFilters from "./Sorting";
import UnifiedStats from "./Stats";

import {
    FaLayerGroup,
    FaSearch,
    FaSpinner,
    FaArrowUp,
    FaLightbulb,
    FaRocket,
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
                const response = await fetch(`${base}data/frameworks.json`);
                const frameworksData = await response.json();
                setData(frameworksData);
            } catch (error) {
                console.error("Error loading frameworks data:", error);
                // Fallback data for demo
                setData({
                    framework: [
                        {
                            name: "React",
                            percentage: 95,
                            favorite: true,
                            learning: false,
                            language: "JavaScript",
                            image: "https://cdn.simpleicons.org/react",
                        },
                        {
                            name: "PyTorch",
                            percentage: 75,
                            favorite: true,
                            learning: true,
                            language: "Python",
                            image: "https://cdn.simpleicons.org/pytorch",
                        },
                        {
                            name: "Node.js",
                            percentage: 85,
                            favorite: true,
                            learning: false,
                            language: "JavaScript",
                            image: "https://cdn.simpleicons.org/nodedotjs",
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

const FrameworkFilters = ({ frameworks, filters, setFilters }) => (
    <UnifiedFilters
        items={frameworks}
        filters={filters}
        setFilters={setFilters}
        config={{ type: "frameworks" }}
    />
);

// Main Frameworks component
export default function Frameworks() {
    const { data, isLoading } = useDataLoader();
    const [filters, setFilters] = useState({
        search: "",
        language: "all",
        status: "all",
        sort: "proficiency",
    });

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Filter AND SORT frameworks based on current filters
    const filteredAndSortedFrameworks = useMemo(() => {
        if (!data.framework) return [];

        // First, filter the frameworks
        let filtered = data.framework.filter((framework) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    framework.name.toLowerCase().includes(searchLower) ||
                    framework.language.toLowerCase().includes(searchLower);

                if (!matchesSearch) return false;
            }

            // Language filter
            if (
                filters.category !== "all" &&
                framework.language !== filters.category
            ) {
                return false;
            }

            // Status filter
            const { status } = filters;
            const { percentage, favorite, learning } = framework;

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

        // Then, sort the filtered results
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
    }, [data.framework, filters]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="animate-pulse text-white/70 text-xl flex items-center gap-3">
                    <FaSpinner className="animate-spin" />
                    Loading frameworks...
                </div>
            </div>
        );
    }

    if (!data.framework || data.framework.length === 0) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white/70 text-xl text-center">
                    <FaLayerGroup className="h-16 w-16 mx-auto mb-4 text-white/40" />
                    <p>No frameworks found</p>
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
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600 opacity-10 blur-3xl rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 opacity-10 blur-3xl rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 opacity-5 blur-3xl rounded-full" />
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
                            <FaLayerGroup className="h-5 w-5 text-indigo-400" />
                            <span className="text-sm font-medium text-white/80">
                                Technical Stack
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                            Frameworks & Libraries
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            My toolkit of frameworks, libraries, and
                            technologies that I use to build modern
                            applications. From frontend to backend, from web to
                            mobile development.
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
                    items={data.framework}
                    type="frameworks"
                    topItem="React"
                />

                {/* Filters */}
                <FrameworkFilters
                    frameworks={data.framework}
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
                            {filteredAndSortedFrameworks.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-white">
                            {data.framework.length}
                        </span>{" "}
                        frameworks
                        {filters.search && (
                            <span>
                                {" "}
                                matching "
                                <span className="text-indigo-300">
                                    {filters.search}
                                </span>
                                "
                            </span>
                        )}
                    </p>
                </motion.div>

                {/* Frameworks Grid */}
                {filteredAndSortedFrameworks.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredAndSortedFrameworks.map((framework, index) => (
                            <UnifiedSkillCard
                                item={framework}
                                index={index}
                                type="framework"
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
                            No frameworks found
                        </h3>
                        <p className="text-white/60 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() =>
                                setFilters({
                                    search: "",
                                    language: "all",
                                    status: "all",
                                    sort: "percentage",
                                })
                            }
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all"
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
                        Continuous Learning Journey
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        Technology evolves rapidly, and so do I. I'm always
                        exploring new frameworks and deepening my expertise with
                        existing ones to deliver cutting-edge solutions.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/projects"
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
                        >
                            See Projects <FaRocket />
                        </a>
                        <a
                            href="/contact"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            Let's Collaborate <FaLightbulb />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
