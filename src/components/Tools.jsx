import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import UnifiedSkillCard from "./Cards";

import {
    FaTools,
    FaSearch,
    FaGraduationCap,
    FaLayerGroup,
    FaChartBar,
    FaArrowUp,
    FaSpinner,
    FaHeart,
    FaCheckCircle,
    FaSort,
    FaGithub,
    FaEnvelope,
    FaTrophy,
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

// Proficiency level indicator

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
                const response = await fetch(`${base}data/tools.json`);
                const toolsData = await response.json();
                setData(toolsData);
            } catch (error) {
                console.error("Error loading tools data:", error);
                // Fallback data for demo
                setData({
                    tool: [
                        {
                            name: "Docker",
                            percentage: 70,
                            favorite: false,
                            learning: true,
                            image: "https://cdn.simpleicons.org/docker",
                            category: "DevOps",
                            description:
                                "Containerization platform for building, shipping, and running applications",
                        },
                        {
                            name: "GitHub Actions",
                            percentage: 40,
                            favorite: false,
                            learning: false,
                            image: "https://cdn.simpleicons.org/githubactions",
                            category: "CI/CD",
                            description:
                                "Automated workflows for continuous integration and deployment",
                        },
                        {
                            name: "MySQL",
                            percentage: 60,
                            favorite: true,
                            learning: true,
                            image: "https://cdn.simpleicons.org/mysql",
                            category: "Database",
                            description:
                                "Popular relational database management system",
                        },
                        {
                            name: "React",
                            percentage: 85,
                            favorite: true,
                            learning: false,
                            image: "https://cdn.simpleicons.org/react",
                            category: "Frontend",
                            description:
                                "JavaScript library for building user interfaces",
                        },
                        {
                            name: "Node.js",
                            percentage: 75,
                            favorite: true,
                            learning: false,
                            image: "https://cdn.simpleicons.org/nodedotjs",
                            category: "Backend",
                            description:
                                "JavaScript runtime for server-side development",
                        },
                        {
                            name: "Python",
                            percentage: 80,
                            favorite: true,
                            learning: true,
                            image: "https://cdn.simpleicons.org/python",
                            category: "Language",
                            description:
                                "Versatile programming language for various applications",
                        },
                        {
                            name: "MongoDB",
                            percentage: 65,
                            favorite: false,
                            learning: true,
                            image: "https://cdn.simpleicons.org/mongodb",
                            category: "Database",
                            description: "NoSQL document-based database",
                        },
                        {
                            name: "VS Code",
                            percentage: 95,
                            favorite: true,
                            learning: false,
                            image: "https://cdn.simpleicons.org/visualstudiocode",
                            category: "Editor",
                            description:
                                "Powerful code editor with extensive extension support",
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

// Filter component
const ToolFilters = ({ tools, filters, setFilters }) => {
    const categories = useMemo(() => {
        const cats = [...new Set(tools.map((t) => t.category).filter(Boolean))];
        return cats.sort();
    }, [tools]);

    const statusOptions = [
        { key: "all", label: "All Tools", icon: FaLayerGroup },
        { key: "favorites", label: "Favorites", icon: FaHeart },
        { key: "learning", label: "Learning", icon: FaGraduationCap },
        { key: "expert", label: "Expert (90%+)", icon: FaTrophy },
        { key: "advanced", label: "Advanced (70%+)", icon: FaCheckCircle },
    ];

    const sortOptions = [
        { key: "name", label: "Name" },
        { key: "percentage", label: "Proficiency" },
        { key: "category", label: "Category" },
        { key: "favorites", label: "Favorites First" },
    ];

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search tools..."
                    value={filters.search}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
            </div>

            <div className="flex flex-wrap gap-4">
                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => {
                        const StatusIcon = status.icon;
                        return (
                            <button
                                key={status.key}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        status: status.key,
                                    }))
                                }
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    filters.status === status.key
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <StatusIcon className="h-4 w-4" />
                                {status.label}
                            </button>
                        );
                    })}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                    <FaSort className="h-4 w-4 text-white/40" />
                    <select
                        value={filters.sort}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                sort: e.target.value,
                            }))
                        }
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {sortOptions.map((option) => (
                            <option
                                key={option.key}
                                value={option.key}
                                className="bg-slate-800"
                            >
                                Sort by {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Category Filter */}
            {categories.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, category: "all" }))
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                            filters.category === "all"
                                ? "bg-purple-600 text-white"
                                : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, category }))
                            }
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                                filters.category === category
                                    ? "bg-purple-600 text-white"
                                    : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Statistics component
const ToolStats = ({ tools }) => {
    const stats = useMemo(() => {
        const total = tools.length;
        const favorites = tools.filter((t) => t.favorite).length;
        const learning = tools.filter((t) => t.learning).length;
        const expert = tools.filter((t) => t.percentage >= 90).length;
        const avgProficiency = Math.round(
            tools.reduce((acc, t) => acc + t.percentage, 0) / total,
        );

        return { total, favorites, learning, expert, avgProficiency };
    }, [tools]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaTools className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-white/60">Total Tools</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.total}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaHeart className="h-5 w-5 text-pink-400" />
                    <span className="text-sm text-white/60">Favorites</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.favorites}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaGraduationCap className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white/60">Learning</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.learning}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaTrophy className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-white/60">Expert</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.expert}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaChartBar className="h-5 w-5 text-orange-400" />
                    <span className="text-sm text-white/60">Avg Skill</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.avgProficiency}%
                </span>
            </div>
        </motion.div>
    );
};

// Main Tools component
export default function Tools() {
    const { data, isLoading } = useDataLoader();
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        status: "all",
        sort: "percentage",
    });

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Filter and sort tools
    const filteredAndSortedTools = useMemo(() => {
        if (!data.tool) return [];

        let filtered = data.tool.filter((tool) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    tool.name.toLowerCase().includes(searchLower) ||
                    tool.category?.toLowerCase().includes(searchLower) ||
                    tool.description?.toLowerCase().includes(searchLower);

                if (!matchesSearch) return false;
            }

            // Category filter
            if (
                filters.category !== "all" &&
                tool.category !== filters.category
            ) {
                return false;
            }

            // Status filter
            if (filters.status !== "all") {
                if (filters.status === "favorites" && !tool.favorite)
                    return false;
                if (filters.status === "learning" && !tool.learning)
                    return false;
                if (filters.status === "expert" && tool.percentage < 90)
                    return false;
                if (filters.status === "advanced" && tool.percentage < 70)
                    return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (filters.sort) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "percentage":
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
    }, [data.tool, filters]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="animate-pulse text-white/70 text-xl flex items-center gap-3">
                    <FaSpinner className="animate-spin" />
                    Loading tools...
                </div>
            </div>
        );
    }

    if (!data.tool || data.tool.length === 0) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white/70 text-xl text-center">
                    <FaTools className="h-16 w-16 mx-auto mb-4 text-white/40" />
                    <p>No tools found</p>
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
                <div className="absolute inset-0 bg-orange-600 opacity-10 blur-3xl rounded-full -top-1/2 left-1/4 w-1/2 h-full" />
                <div className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl rounded-full -bottom-1/2 right-1/4 w-1/2 h-full" />
                <div className="absolute top-40 left-20 w-24 h-24 bg-purple-500 opacity-20 blur-3xl rounded-full" />
                <div className="absolute bottom-40 right-20 w-32 h-32 bg-pink-500 opacity-20 blur-3xl rounded-full" />
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
                            <FaTools className="h-5 w-5 text-orange-400" />
                            <span className="text-sm font-medium text-white/80">
                                Development Arsenal
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent">
                            Tools & Technologies
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            My technical toolkit spanning languages, frameworks,
                            databases, and development tools. Each tool
                            represents hours of learning, practice, and
                            real-world application.
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
                <ToolStats tools={data.tool} />

                {/* Filters */}
                <ToolFilters
                    tools={data.tool}
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
                            {filteredAndSortedTools.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-white">
                            {data.tool.length}
                        </span>{" "}
                        tools
                        {filters.search && (
                            <span>
                                {" "}
                                matching "
                                <span className="text-orange-300">
                                    {filters.search}
                                </span>
                                "
                            </span>
                        )}
                    </p>
                </motion.div>

                {/* Tools Grid */}
                {filteredAndSortedTools.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredAndSortedTools.map((tool, index) => (
                            <UnifiedSkillCard
                                item={tool}
                                index={index}
                                type="tool"
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
                            No tools found
                        </h3>
                        <p className="text-white/60 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() =>
                                setFilters({
                                    search: "",
                                    category: "all",
                                    status: "all",
                                    sort: "percentage",
                                })
                            }
                            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-medium transition-all"
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
                        Always Learning & Growing
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        Technology evolves rapidly, and so do I. I'm constantly
                        exploring new tools, mastering existing ones, and
                        staying up-to-date with industry best practices.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2"
                        >
                            Let's Collaborate <FaEnvelope />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            View My Work <FaGithub />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
