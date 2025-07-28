import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    FaLayerGroup,
    FaSearch,
    FaHeart,
    FaGraduationCap,
    FaChartBar,
    FaStar,
    FaCode,
    FaSpinner,
    FaArrowUp,
    FaChevronRight,
    FaExternalLinkAlt,
    FaFilter,
    FaTrophy,
    FaCertificate,
    FaBookOpen,
    FaLightbulb,
    FaRocket,
    FaTools,
    FaGithub,
    FaGlobe,
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
        purple: "from-purple-500 to-purple-400",
        green: "from-green-500 to-green-400",
        indigo: "from-indigo-500 to-indigo-400",
        yellow: "from-yellow-500 to-yellow-400",
        red: "from-red-500 to-red-400",
        pink: "from-pink-500 to-pink-400",
    };

    return (
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-2 rounded-full bg-gradient-to-r ${colorMap[color]}`}
            />
        </div>
    );
};

// Get skill level based on percentage
const getSkillLevel = (percentage) => {
    if (percentage >= 90)
        return {
            level: "Expert",
            color: "text-purple-400",
            bgColor: "bg-purple-500/20",
        };
    if (percentage >= 75)
        return {
            level: "Advanced",
            color: "text-blue-400",
            bgColor: "bg-blue-500/20",
        };
    if (percentage >= 50)
        return {
            level: "Intermediate",
            color: "text-green-400",
            bgColor: "bg-green-500/20",
        };
    if (percentage >= 25)
        return {
            level: "Beginner",
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/20",
        };
    return {
        level: "Learning",
        color: "text-orange-400",
        bgColor: "bg-orange-500/20",
    };
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
                        {
                            name: "TensorFlow",
                            percentage: 60,
                            favorite: false,
                            learning: true,
                            language: "Python",
                            image: "https://cdn.simpleicons.org/tensorflow",
                        },
                        {
                            name: "Vue.js",
                            percentage: 70,
                            favorite: false,
                            learning: false,
                            language: "JavaScript",
                            image: "https://cdn.simpleicons.org/vuedotjs",
                        },
                        {
                            name: "SwiftUI",
                            percentage: 50,
                            favorite: true,
                            learning: true,
                            language: "Swift",
                            image: "https://cdn.simpleicons.org/swift",
                        },
                        {
                            name: "Unity",
                            percentage: 80,
                            favorite: true,
                            learning: false,
                            language: "C#",
                            image: "https://cdn.simpleicons.org/unity",
                        },
                        {
                            name: "Express.js",
                            percentage: 90,
                            favorite: true,
                            learning: false,
                            language: "JavaScript",
                            image: "https://cdn.simpleicons.org/express",
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

// Framework card component
const FrameworkCard = ({ framework, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skillLevel = getSkillLevel(framework.percentage);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={scaleIn}
            transition={{ delay: 0.1 * index }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group hover:shadow-xl hover:-translate-y-2"
        >
            {/* Header with gradient based on skill level */}
            <div
                className={`h-1 rounded-t-xl mb-4 ${
                    framework.percentage >= 90
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : framework.percentage >= 75
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                          : framework.percentage >= 50
                            ? "bg-gradient-to-r from-green-600 to-emerald-600"
                            : framework.percentage >= 25
                              ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                              : "bg-gradient-to-r from-orange-600 to-red-600"
                }`}
            />

            {/* Framework Info */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {framework.image && (
                        <div className="relative">
                            <img
                                src={framework.image}
                                alt={framework.name}
                                className="w-12 h-12 rounded-lg group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {framework.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-white/60">
                                {framework.language}
                            </span>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${skillLevel.bgColor} ${skillLevel.color} font-medium`}
                            >
                                {skillLevel.level}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                        {framework.percentage}%
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <ProgressBar
                    percentage={framework.percentage}
                    color={
                        framework.percentage >= 90
                            ? "purple"
                            : framework.percentage >= 75
                              ? "blue"
                              : framework.percentage >= 50
                                ? "green"
                                : framework.percentage >= 25
                                  ? "yellow"
                                  : "red"
                    }
                />
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {framework.favorite && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 group-hover:bg-red-500/30 transition-colors">
                        <FaHeart className="h-3 w-3" />
                        <span className="text-xs font-medium">Favorite</span>
                    </div>
                )}
                {framework.learning && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 group-hover:bg-green-500/30 transition-colors">
                        <FaGraduationCap className="h-3 w-3" />
                        <span className="text-xs font-medium">Learning</span>
                    </div>
                )}
                {framework.percentage >= 90 && (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <FaTrophy className="h-3 w-3" />
                        <span className="text-xs font-medium">Expert</span>
                    </div>
                )}
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center justify-between">
                    <span>Proficiency Level:</span>
                    <span className={`font-medium ${skillLevel.color}`}>
                        {skillLevel.level}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Primary Language:</span>
                    <span className="font-medium text-blue-300">
                        {framework.language}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg text-sm font-medium transition-colors">
                    <FaBookOpen className="h-3 w-3" />
                    Learn More
                </button>
                <button className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-lg transition-colors">
                    <FaExternalLinkAlt className="h-3 w-3" />
                </button>
            </div>
        </motion.div>
    );
};

// Filter component
const FrameworkFilters = ({ frameworks, filters, setFilters }) => {
    const languages = useMemo(() => {
        const langs = [...new Set(frameworks.map((f) => f.language))];
        return langs.sort();
    }, [frameworks]);

    const statusFilters = [
        { key: "all", label: "All Frameworks", icon: FaLayerGroup },
        { key: "favorites", label: "Favorites", icon: FaHeart },
        { key: "learning", label: "Currently Learning", icon: FaGraduationCap },
        { key: "expert", label: "Expert Level", icon: FaTrophy },
        { key: "advanced", label: "Advanced", icon: FaCertificate },
    ];

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search frameworks..."
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

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
                {statusFilters.map((status) => {
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

            {/* Language Filter */}
            {languages.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, language: "all" }))
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                            filters.language === "all"
                                ? "bg-purple-600 text-white"
                                : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                        All Languages
                    </button>
                    {languages.map((language) => (
                        <button
                            key={language}
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, language }))
                            }
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                                filters.language === language
                                    ? "bg-purple-600 text-white"
                                    : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                        >
                            {language}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Statistics component
const FrameworkStats = ({ frameworks }) => {
    const stats = useMemo(() => {
        const total = frameworks.length;
        const favorites = frameworks.filter((f) => f.favorite).length;
        const learning = frameworks.filter((f) => f.learning).length;
        const expert = frameworks.filter((f) => f.percentage >= 90).length;
        const avgProficiency = Math.round(
            frameworks.reduce((acc, f) => acc + f.percentage, 0) / total,
        );

        const languageDistribution = frameworks.reduce((acc, f) => {
            acc[f.language] = (acc[f.language] || 0) + 1;
            return acc;
        }, {});

        const topLanguage = Object.entries(languageDistribution).sort(
            ([, a], [, b]) => b - a,
        )[0];

        return {
            total,
            favorites,
            learning,
            expert,
            avgProficiency,
            topLanguage: topLanguage ? topLanguage[0] : "N/A",
            topLanguageCount: topLanguage ? topLanguage[1] : 0,
        };
    }, [frameworks]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
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
                    <FaTrophy className="h-5 w-5 text-purple-400" />
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

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaCode className="h-5 w-5 text-indigo-400" />
                    <span className="text-sm text-white/60">Top Lang</span>
                </div>
                <span className="text-lg font-bold text-white">
                    {stats.topLanguage}
                </span>
            </div>
        </motion.div>
    );
};

// Main Frameworks component
export default function Frameworks() {
    const { data, isLoading } = useDataLoader();
    const [filters, setFilters] = useState({
        search: "",
        language: "all",
        status: "all",
    });

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Filter frameworks based on current filters
    const filteredFrameworks = useMemo(() => {
        if (!data.framework) return [];

        return data.framework.filter((framework) => {
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
                filters.language !== "all" &&
                framework.language !== filters.language
            ) {
                return false;
            }

            // Status filter
            if (filters.status !== "all") {
                if (filters.status === "favorites" && !framework.favorite)
                    return false;
                if (filters.status === "learning" && !framework.learning)
                    return false;
                if (filters.status === "expert" && framework.percentage < 90)
                    return false;
                if (
                    filters.status === "advanced" &&
                    (framework.percentage < 75 || framework.percentage >= 90)
                )
                    return false;
            }

            return true;
        });
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
                    <motion.a
                        variants={fadeIn}
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all hover:scale-105"
                    >
                        <FaArrowUp className="h-4 w-4 rotate-45" />
                        Back to Home
                    </motion.a>
                </motion.div>

                {/* Statistics */}
                <FrameworkStats frameworks={data.framework} />

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
                            {filteredFrameworks.length}
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
                {filteredFrameworks.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredFrameworks
                            .sort(
                                (a, b) =>
                                    b.percentage - a.percentage ||
                                    (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0),
                            )
                            .map((framework, index) => (
                                <FrameworkCard
                                    key={`${framework.name}-${index}`}
                                    framework={framework}
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
