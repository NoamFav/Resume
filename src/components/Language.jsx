import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import {
    FaCode,
    FaSearch,
    FaHeart,
    FaGraduationCap,
    FaStar,
    FaChartBar,
    FaLayerGroup,
    FaArrowUp,
    FaEnvelope,
    FaGithub,
    FaFilter,
    FaBookOpen,
    FaLightbulb,
    FaRocket,
    FaCrown,
    FaFire,
    FaTrophy,
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

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Progress bar component
const ProgressBar = ({ percentage, color = "blue" }) => {
    const colorMap = {
        blue: "from-blue-500 to-blue-400",
        green: "from-green-500 to-green-400",
        purple: "from-purple-500 to-purple-400",
        orange: "from-orange-500 to-orange-400",
        red: "from-red-500 to-red-400",
        yellow: "from-yellow-500 to-yellow-400",
        pink: "from-pink-500 to-pink-400",
        indigo: "from-indigo-500 to-indigo-400",
    };

    return (
        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-2.5 rounded-full bg-gradient-to-r ${colorMap[color]}`}
            />
        </div>
    );
};

// Proficiency level component
const ProficiencyLevel = ({ percentage }) => {
    let level, color, icon;

    if (percentage >= 90) {
        level = "Expert";
        color = "text-purple-400";
        icon = FaCrown;
    } else if (percentage >= 75) {
        level = "Advanced";
        color = "text-blue-400";
        icon = FaTrophy;
    } else if (percentage >= 60) {
        level = "Intermediate";
        color = "text-green-400";
        icon = FaRocket;
    } else if (percentage >= 40) {
        level = "Beginner";
        color = "text-yellow-400";
        icon = FaLightbulb;
    } else {
        level = "Learning";
        color = "text-orange-400";
        icon = FaGraduationCap;
    }

    const Icon = icon;

    return (
        <div className={`flex items-center gap-2 ${color}`}>
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{level}</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                {percentage}%
            </span>
        </div>
    );
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
                        {
                            name: "JavaScript",
                            percentage: 80,
                            favorite: true,
                            learning: false,
                            image: "https://cdn.simpleicons.org/javascript",
                        },
                        {
                            name: "TypeScript",
                            percentage: 75,
                            favorite: false,
                            learning: false,
                            image: "https://cdn.simpleicons.org/typescript",
                        },
                        {
                            name: "Rust",
                            percentage: 50,
                            favorite: true,
                            learning: true,
                            image: "https://cdn.simpleicons.org/rust",
                        },
                        {
                            name: "Go",
                            percentage: 45,
                            favorite: false,
                            learning: true,
                            image: "https://cdn.simpleicons.org/go",
                        },
                        {
                            name: "C++",
                            percentage: 70,
                            favorite: false,
                            learning: false,
                            image: "https://cdn.simpleicons.org/cplusplus",
                        },
                        {
                            name: "Swift",
                            percentage: 35,
                            favorite: false,
                            learning: true,
                            image: "https://cdn.simpleicons.org/swift",
                        },
                        {
                            name: "PHP",
                            percentage: 65,
                            favorite: false,
                            learning: false,
                            image: "https://cdn.simpleicons.org/php",
                        },
                        {
                            name: "C#",
                            percentage: 60,
                            favorite: false,
                            learning: false,
                            image: "https://cdn.simpleicons.org/csharp",
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

// Language card component
const LanguageCard = ({ language, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const getColorByPercentage = (percentage) => {
        if (percentage >= 90) return "purple";
        if (percentage >= 75) return "blue";
        if (percentage >= 60) return "green";
        if (percentage >= 40) return "yellow";
        return "orange";
    };

    const color = getColorByPercentage(language.percentage);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={scaleIn}
            transition={{ delay: 0.1 * index }}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group hover:shadow-xl hover:-translate-y-2"
        >
            {/* Header with gradient */}
            <div
                className={`h-2 bg-gradient-to-r ${
                    color === "purple"
                        ? "from-purple-600 via-pink-600 to-purple-600"
                        : color === "blue"
                          ? "from-blue-600 via-cyan-600 to-blue-600"
                          : color === "green"
                            ? "from-green-600 via-emerald-600 to-green-600"
                            : color === "yellow"
                              ? "from-yellow-600 via-orange-600 to-yellow-600"
                              : "from-orange-600 via-red-600 to-orange-600"
                } group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-purple-500`}
            />

            <div className="p-6">
                {/* Header with image and proficiency */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        {language.image && (
                            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors overflow-hidden">
                                <img
                                    src={language.image}
                                    alt={language.name}
                                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                            "flex";
                                    }}
                                />
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded hidden items-center justify-center">
                                    <FaCode className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                {language.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                {language.favorite && (
                                    <FaHeart className="h-3 w-3 text-red-400" />
                                )}
                                {language.learning && (
                                    <FaGraduationCap className="h-3 w-3 text-green-400" />
                                )}
                            </div>
                        </div>
                    </div>
                    <ProficiencyLevel percentage={language.percentage} />
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/60">
                            Proficiency
                        </span>
                        <span className="text-sm font-medium text-white">
                            {language.percentage}%
                        </span>
                    </div>
                    <ProgressBar
                        percentage={language.percentage}
                        color={color}
                    />
                </div>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {language.favorite && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5">
                            <FaHeart className="h-3 w-3" />
                            Favorite
                        </span>
                    )}
                    {language.learning && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1.5">
                            <FaGraduationCap className="h-3 w-3" />
                            Learning
                        </span>
                    )}
                    {language.percentage >= 90 && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                            <FaCrown className="h-3 w-3" />
                            Expert
                        </span>
                    )}
                </div>

                {/* Experience indicator */}
                <div className="pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Experience Level</span>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`h-3 w-3 ${
                                        i < Math.ceil(language.percentage / 20)
                                            ? "text-yellow-400"
                                            : "text-white/20"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Filter component
const LanguageFilters = ({ languages, filters, setFilters }) => {
    const filterOptions = [
        { key: "all", label: "All Languages", icon: FaLayerGroup },
        { key: "favorites", label: "Favorites", icon: FaHeart },
        { key: "learning", label: "Currently Learning", icon: FaGraduationCap },
        { key: "expert", label: "Expert Level", icon: FaCrown },
        { key: "advanced", label: "Advanced", icon: FaTrophy },
    ];

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search languages..."
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

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => {
                    const OptionIcon = option.icon;
                    return (
                        <button
                            key={option.key}
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    filter: option.key,
                                }))
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                filters.filter === option.key
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <OptionIcon className="h-4 w-4" />
                            {option.label}
                        </button>
                    );
                })}
            </div>

            {/* Sort options */}
            <div className="flex flex-wrap gap-2">
                <span className="text-sm text-white/60 self-center">
                    Sort by:
                </span>
                {[
                    { key: "proficiency", label: "Proficiency" },
                    { key: "name", label: "Name" },
                    { key: "favorites", label: "Favorites First" },
                ].map((sort) => (
                    <button
                        key={sort.key}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                sort: sort.key,
                            }))
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                            filters.sort === sort.key
                                ? "bg-purple-600 text-white"
                                : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                        {sort.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Statistics component
const LanguageStats = ({ languages }) => {
    const stats = useMemo(() => {
        const total = languages.length;
        const favorites = languages.filter((lang) => lang.favorite).length;
        const learning = languages.filter((lang) => lang.learning).length;
        const expert = languages.filter((lang) => lang.percentage >= 90).length;
        const avgProficiency = Math.round(
            languages.reduce((acc, lang) => acc + lang.percentage, 0) / total,
        );

        return { total, favorites, learning, expert, avgProficiency };
    }, [languages]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaLayerGroup className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-white/60">Total</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.total}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaHeart className="h-5 w-5 text-red-400" />
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
                    <FaCrown className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-white/60">Expert</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.expert}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaChartBar className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm text-white/60">Avg Level</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.avgProficiency}%
                </span>
            </div>
        </motion.div>
    );
};

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
    const filteredLanguages = useMemo(() => {
        if (!data.programming_language) return [];

        let filtered = data.programming_language.filter((language) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                if (!language.name.toLowerCase().includes(searchLower)) {
                    return false;
                }
            }

            // Category filter
            switch (filters.filter) {
                case "favorites":
                    return language.favorite;
                case "learning":
                    return language.learning;
                case "expert":
                    return language.percentage >= 90;
                case "advanced":
                    return (
                        language.percentage >= 75 && language.percentage < 90
                    );
                default:
                    return true;
            }
        });

        // Sort
        switch (filters.sort) {
            case "proficiency":
                filtered.sort((a, b) => b.percentage - a.percentage);
                break;
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "favorites":
                filtered.sort(
                    (a, b) =>
                        b.favorite - a.favorite || b.percentage - a.percentage,
                );
                break;
        }

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
                <LanguageStats languages={data.programming_language} />

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
                            {filteredLanguages.length}
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
                {filteredLanguages.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredLanguages.map((language, index) => (
                            <LanguageCard
                                key={`${language.name}-${index}`}
                                language={language}
                                index={index}
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
