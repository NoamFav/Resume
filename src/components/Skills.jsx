import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import {
    FaCertificate,
    FaSearch,
    FaStar,
    FaChartBar,
    FaCode,
    FaUsers,
    FaBrain,
    FaRocket,
    FaLightbulb,
    FaCog,
    FaDatabase,
    FaGlobe,
    FaShieldAlt,
    FaLayerGroup,
    FaArrowUp,
    FaChevronRight,
    FaTrophy,
    FaBullseye,
    FaHeart,
    FaSpinner,
    FaTerminal,
    FaMicrochip,
    FaNetworkWired,
    FaRobot,
    FaPalette,
    FaBalanceScale,
    FaCubes,
    FaProjectDiagram,
    FaTools,
    FaLanguage,
    FaServer,
    FaMobile,
    FaDesktop,
    FaCloud,
    FaEdit,
    FaChartLine,
    FaFile,
    FaPlay,
    FaGamepad,
    FaEye,
    FaBox,
    FaWrench,
    FaBolt,
    FaCodeBranch,
    FaTable,
    FaReact,
} from "react-icons/fa";

import { GoContainer } from "react-icons/go";

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

// Enhanced icon mapping for different skill categories and types
const getSkillIcon = (category, name) => {
    const iconMap = {
        // Category icons
        Technical: FaCode,
        Soft: FaUsers,

        // Specific skill icons
        Programming: FaCode,
        "Web Development": FaGlobe,
        "Mobile Development": FaMicrochip,
        DevOps: FaCog,
        Databases: FaDatabase,
        "Machine Learning": FaRobot,
        "Data Analysis": FaChartBar,
        Networking: FaNetworkWired,
        Security: FaShieldAlt,
        "Team Management": FaUsers,
        "Project Management": FaProjectDiagram,
        "Problem Solving": FaLightbulb,
        Communication: FaUsers,
        Creativity: FaPalette,
        Algorithms: FaBrain,
        "Data Structures": FaCubes,

        // Language category icons
        "Systems Programming": FaTerminal,
        "Application Development": FaDesktop,
        "Web Technologies": FaGlobe,
        Scripting: FaPlay,
        "Data Processing": FaChartLine,
        "Config and Markup": FaFile,

        // Tool category icons
        "Development Environments": FaEdit,
        "Version Control": FaCodeBranch,
        Containerization: GoContainer,
        "Network Analysis": FaNetworkWired,
        "Data Visualization": FaEye,
        Automation: FaBolt,
        "Server and Proxy": FaServer,

        // Framework category icons
        "Web Frontend": FaReact,
        "Web Backend": FaServer,
        "Mobile UI": FaMobile,
        "Game Engines": FaGamepad,
        "Data Science": FaChartLine,
        "Database ORM": FaTable,
        "CLI and TUI": FaTerminal,
        "Native UI": FaDesktop,
        Graphics: FaPalette,
        "Infra and DevOps": FaCloud,
        "Parsing and Lang Tools": FaWrench,

        // Specialization icons
        "Low-level System Programming": FaTerminal,
        "Real-time Data Processing": FaChartBar,
        "AI/ML Integration": FaRobot,
        "UI/UX Design": FaPalette,
        "Performance Optimization": FaRocket,
        "Cross-platform Development": FaLayerGroup,
        "Network Traffic Analysis": FaNetworkWired,
        "Automated Workflow": FaCog,

        // Paradigm icons
        "Functional Programming": FaBalanceScale,
        "Object-Oriented": FaCubes,
        "Systems Architecture": FaProjectDiagram,

        // Default
        default: FaStar,
    };

    // Try to match by name first, then category, then default
    const nameKey = Object.keys(iconMap).find((key) => name?.includes(key));
    return iconMap[nameKey] || iconMap[category] || iconMap.default;
};

// Progress bar component with different colors
const ProgressBar = ({ percentage, color = "blue", size = "normal" }) => {
    const colorMap = {
        blue: "from-blue-500 to-blue-400",
        green: "from-green-500 to-green-400",
        purple: "from-purple-500 to-purple-400",
        yellow: "from-yellow-500 to-yellow-400",
        red: "from-red-500 to-red-400",
        pink: "from-pink-500 to-pink-400",
        orange: "from-orange-500 to-orange-400",
        teal: "from-teal-500 to-teal-400",
        indigo: "from-indigo-500 to-indigo-400",
    };

    const height = size === "large" ? "h-3" : "h-2";

    return (
        <div
            className={`w-full bg-white/5 rounded-full ${height} overflow-hidden mb-3`}
        >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`${height} rounded-full bg-gradient-to-r ${colorMap[color]}`}
            />
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
                const [skillsRes, langsRes, toolsRes, frameworksRes] =
                    await Promise.all([
                        fetch(`${base}data/skills.json`),
                        fetch(`${base}data/programming_languages.json`),
                        fetch(`${base}data/tools.json`),
                        fetch(`${base}data/frameworks.json`),
                    ]);

                const [skillsData, langs, tools, frameworks] =
                    await Promise.all([
                        skillsRes.json(),
                        langsRes.json(),
                        toolsRes.json(),
                        frameworksRes.json(),
                    ]);

                setData({
                    ...skillsData,
                    programming_language: langs.programming_language || [],
                    tool: tools.tool || [],
                    framework: frameworks.framework || [],
                });
            } catch (err) {
                console.error("Data load error:", err);
                // Optional: fallback
                setData({});
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return { data, isLoading };
};
// Category display component
const CategorySection = ({ title, categories, type, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const getCategoryColor = (categoryKey) => {
        const colorMap = {
            // Language categories
            systems_programming: "red",
            application_development: "blue",
            web_technologies: "green",
            scripting: "yellow",
            data_processing: "purple",
            config_and_markup: "orange",

            // Tool categories
            development_environments: "indigo",
            version_control: "green",
            containerization: "blue",
            databases: "purple",
            frameworks: "pink",
            network_analysis: "red",
            data_visualization: "teal",
            automation: "yellow",
            server_and_proxy: "orange",

            // Framework categories
            web_frontend: "blue",
            web_backend: "green",
            mobile_ui: "purple",
            game_engines: "red",
            data_science: "teal",
            database_orm: "purple",
            cli_and_tui: "yellow",
            native_ui: "indigo",
            graphics: "pink",
            infra_and_devops: "orange",
            parsing_and_lang_tools: "teal",
        };
        return colorMap[categoryKey] || "blue";
    };

    const formatCategoryName = (key) => {
        return key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={scaleIn}
            transition={{ delay: 0.1 * index }}
            className="mb-8"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-lg">
                    {type === "language" && (
                        <FaLanguage className="h-6 w-6 text-blue-400" />
                    )}
                    {type === "tool" && (
                        <FaTools className="h-6 w-6 text-green-400" />
                    )}
                    {type === "framework" && (
                        <FaBox className="h-6 w-6 text-purple-400" />
                    )}
                </div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(categories).map(
                    ([categoryKey, items], catIndex) => {
                        const color = getCategoryColor(categoryKey);
                        const CategoryIcon = getSkillIcon(
                            formatCategoryName(categoryKey),
                        );

                        return (
                            <motion.div
                                key={categoryKey}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * catIndex }}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 group"
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`p-2 bg-${color}-600/20 rounded-lg group-hover:bg-${color}-600/30 transition-colors`}
                                    >
                                        <CategoryIcon
                                            className={`h-5 w-5 text-${color}-400`}
                                        />
                                    </div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                                        {formatCategoryName(categoryKey)}
                                    </h4>
                                </div>

                                {/* Items */}
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item, itemIndex) => (
                                        <motion.span
                                            key={item}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: 0.05 * itemIndex,
                                            }}
                                            className={`text-xs px-3 py-1.5 rounded-full bg-${color}-500/20 text-${color}-300 border border-${color}-500/30 hover:bg-${color}-500/30 hover:scale-105 transition-all cursor-default`}
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Count badge */}
                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <span className="text-xs text-white/60">
                                        {items.length}{" "}
                                        {items.length === 1 ? "item" : "items"}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    },
                )}
            </div>
        </motion.div>
    );
};

// Skill card component (existing)
const SkillCard = ({ skill, index, type = "skill" }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const SkillIcon = getSkillIcon(skill.category, skill.name);
    const percentage = skill.percentage || skill.proficiency;

    const getCardColor = () => {
        if (type === "specialization") return "purple";
        if (type === "paradigm") return "pink";
        if (skill.category === "Soft") return "green";
        return "blue";
    };

    const color = getCardColor();

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={scaleIn}
            transition={{ delay: 0.1 * index }}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group hover:shadow-xl hover:-translate-y-1"
        >
            {/* Header with gradient */}
            <div
                className={`h-2 bg-gradient-to-r ${
                    color === "purple"
                        ? "from-purple-600 via-purple-500 to-purple-400"
                        : color === "pink"
                          ? "from-pink-600 via-pink-500 to-pink-400"
                          : color === "green"
                            ? "from-green-600 via-green-500 to-green-400"
                            : "from-blue-600 via-blue-500 to-blue-400"
                } group-hover:opacity-80`}
            />

            <div className="p-6">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors`}
                        >
                            <SkillIcon
                                className={`h-6 w-6 ${
                                    color === "purple"
                                        ? "text-purple-400"
                                        : color === "pink"
                                          ? "text-pink-400"
                                          : color === "green"
                                            ? "text-green-400"
                                            : "text-blue-400"
                                } group-hover:scale-110 transition-transform`}
                            />
                        </div>
                        <div className="flex-1">
                            <h3
                                className={`text-lg font-semibold text-white group-hover:${
                                    color === "purple"
                                        ? "text-purple-300"
                                        : color === "pink"
                                          ? "text-pink-300"
                                          : color === "green"
                                            ? "text-green-300"
                                            : "text-blue-300"
                                } transition-colors`}
                            >
                                {skill.name}
                            </h3>
                            {skill.category && (
                                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                                    {skill.category}
                                </p>
                            )}
                        </div>
                    </div>
                    <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                            color === "purple"
                                ? "bg-purple-600/20 text-purple-300"
                                : color === "pink"
                                  ? "bg-pink-600/20 text-pink-300"
                                  : color === "green"
                                    ? "bg-green-600/20 text-green-300"
                                    : "bg-blue-600/20 text-blue-300"
                        } group-hover:bg-opacity-30 transition-colors`}
                    >
                        {percentage}%
                    </span>
                </div>

                {/* Progress Bar */}
                <ProgressBar percentage={percentage} color={color} />

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 group-hover:text-white/90 transition-colors">
                    {skill.description}
                </p>

                {/* Additional Info for Specializations/Paradigms */}
                {(skill.related_skills ||
                    skill.key_projects ||
                    skill.languages ||
                    skill.key_languages) && (
                    <div className="space-y-3">
                        {skill.related_skills && (
                            <div>
                                <p className="text-xs text-white/60 mb-2 font-medium uppercase tracking-wide">
                                    Related Skills
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {skill.related_skills.map(
                                        (relatedSkill, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                                            >
                                                {relatedSkill}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        {skill.key_projects && (
                            <div>
                                <p className="text-xs text-white/60 mb-2 font-medium uppercase tracking-wide">
                                    Key Projects
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {skill.key_projects.map((project, idx) => (
                                        <span
                                            key={idx}
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                color === "purple"
                                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                    : color === "pink"
                                                      ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                                                      : color === "green"
                                                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                            }`}
                                        >
                                            {project}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(skill.languages || skill.key_languages) && (
                            <div>
                                <p className="text-xs text-white/60 mb-2 font-medium uppercase tracking-wide">
                                    Languages
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {(
                                        skill.languages || skill.key_languages
                                    ).map((lang, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Filter component (existing but enhanced)
const SkillsFilters = ({ data, filters, setFilters }) => {
    const categories = useMemo(() => {
        if (!data.skill) return [];
        const cats = [...new Set(data.skill.map((s) => s.category))];
        return cats.sort();
    }, [data.skill]);

    const filterTypes = [
        { key: "all", label: "All Skills", icon: FaLayerGroup },
        { key: "core", label: "Core Skills", icon: FaStar },
        { key: "specializations", label: "Specializations", icon: FaBullseye },
        { key: "paradigms", label: "Paradigms", icon: FaBrain },
    ];

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search skills, technologies, or categories..."
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

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
                {filterTypes.map((type) => {
                    const TypeIcon = type.icon;
                    return (
                        <button
                            key={type.key}
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    type: type.key,
                                }))
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                filters.type === type.key
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <TypeIcon className="h-4 w-4" />
                            {type.label}
                        </button>
                    );
                })}
            </div>

            {/* Category Filter for Core Skills */}
            {(filters.type === "all" || filters.type === "core") &&
                categories.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: "all",
                                }))
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
                                    setFilters((prev) => ({
                                        ...prev,
                                        category,
                                    }))
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

// Statistics component (enhanced)
const SkillsStats = ({ data }) => {
    const stats = useMemo(() => {
        const skillCount = data.skill?.length || 0;
        const specializationCount = data.specialization?.length || 0;
        const paradigmCount = data.paradigm?.length || 0;

        // Count categories
        const languageCount = data.programming_language?.length || 0;
        const toolCount = data.tool?.length || 0;
        const frameworkCount = data.framework?.length || 0;

        const total =
            skillCount +
            specializationCount +
            paradigmCount +
            languageCount +
            toolCount +
            frameworkCount;

        const avgSkillLevel = data.skill?.length
            ? Math.round(
                  data.skill.reduce((acc, s) => acc + s.percentage, 0) /
                      data.skill.length,
              )
            : 0;

        const topSkills =
            data.skill?.filter((s) => s.percentage >= 90).length || 0;

        return {
            total,
            skillCount,
            specializationCount,
            paradigmCount,
            languageCount,
            toolCount,
            frameworkCount,
            avgSkillLevel,
            topSkills,
        };
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4 mb-8"
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
                    <FaStar className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white/60">Core Skills</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.skillCount}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaBullseye className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-white/60">
                        Specializations
                    </span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.specializationCount}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaBrain className="h-5 w-5 text-pink-400" />
                    <span className="text-sm text-white/60">Paradigms</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.paradigmCount}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaLanguage className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-white/60">Languages</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.languageCount}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaTools className="h-5 w-5 text-orange-400" />
                    <span className="text-sm text-white/60">Tools</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.toolCount}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaBox className="h-5 w-5 text-teal-400" />
                    <span className="text-sm text-white/60">Frameworks</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.frameworkCount}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaChartBar className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm text-white/60">Avg Level</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.avgSkillLevel}%
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaTrophy className="h-5 w-5 text-orange-400" />
                    <span className="text-sm text-white/60">Expert (90%+)</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.topSkills}
                </span>
            </div>
        </motion.div>
    );
};

// Main Skills component
export default function Skills() {
    const { data, isLoading } = useDataLoader();
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        type: "all",
    });

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Filter and combine all skills based on current filters
    const filteredItems = useMemo(() => {
        let items = [];

        // Add skills if type allows
        if (filters.type === "all" || filters.type === "core") {
            const skills = (data.skill || []).map((skill) => ({
                ...skill,
                type: "skill",
            }));
            items = [...items, ...skills];
        }

        // Add specializations if type allows
        if (filters.type === "all" || filters.type === "specializations") {
            const specializations = (data.specialization || []).map((spec) => ({
                ...spec,
                type: "specialization",
            }));
            items = [...items, ...specializations];
        }

        // Add paradigms if type allows
        if (filters.type === "all" || filters.type === "paradigms") {
            const paradigms = (data.paradigm || []).map((paradigm) => ({
                ...paradigm,
                type: "paradigm",
            }));
            items = [...items, ...paradigms];
        }

        // Apply filters
        return items.filter((item) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    item.name.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower) ||
                    item.category?.toLowerCase().includes(searchLower) ||
                    item.related_skills?.some((skill) =>
                        skill.toLowerCase().includes(searchLower),
                    ) ||
                    item.key_projects?.some((project) =>
                        project.toLowerCase().includes(searchLower),
                    ) ||
                    (item.languages || item.key_languages)?.some((lang) =>
                        lang.toLowerCase().includes(searchLower),
                    );

                if (!matchesSearch) return false;
            }

            // Category filter (only for skills)
            if (
                item.type === "skill" &&
                filters.category !== "all" &&
                item.category !== filters.category
            ) {
                return false;
            }

            return true;
        });
    }, [data, filters]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="animate-pulse text-white/70 text-xl flex items-center gap-3">
                    <FaSpinner className="animate-spin" />
                    Loading skills...
                </div>
            </div>
        );
    }

    if (!data.skill && !data.specialization && !data.paradigm) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white/70 text-xl text-center">
                    <FaCertificate className="h-16 w-16 mx-auto mb-4 text-white/40" />
                    <p>No skills data found</p>
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
                            <FaCertificate className="h-5 w-5 text-green-400" />
                            <span className="text-sm font-medium text-white/80">
                                Skills & Expertise
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
                            My Skills
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            A comprehensive overview of my technical expertise,
                            core competencies, and specialized knowledge areas.
                            From foundational skills to advanced
                            specializations.
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
                <SkillsStats data={data} />

                {/* Filters */}
                <SkillsFilters
                    data={data}
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
                            {filteredItems.length}
                        </span>{" "}
                        {filters.search && (
                            <span>
                                results matching "
                                <span className="text-green-300">
                                    {filters.search}
                                </span>
                                "
                            </span>
                        )}
                    </p>
                </motion.div>

                {/* Skills Grid */}
                {filteredItems.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredItems.map((item, index) => (
                            <SkillCard
                                key={`${item.name}-${index}`}
                                skill={item}
                                index={index}
                                type={item.type}
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
                            No skills found
                        </h3>
                        <p className="text-white/60 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={() =>
                                setFilters({
                                    search: "",
                                    category: "all",
                                    type: "all",
                                })
                            }
                            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full font-medium transition-all"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}

                {/* Technology Categories Section */}
                {(data.language_categories ||
                    data.tool_categories ||
                    data.framework_categories) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-20 pt-16 border-t border-white/10"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Technology Stack
                            </h2>
                            <p className="text-white/70 max-w-2xl mx-auto">
                                A detailed breakdown of programming languages,
                                development tools, and frameworks I work with
                                across different categories.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {data.language_categories && (
                                <CategorySection
                                    title="Programming Languages"
                                    categories={data.language_categories}
                                    type="language"
                                    index={0}
                                />
                            )}

                            {data.tool_categories && (
                                <CategorySection
                                    title="Development Tools"
                                    categories={data.tool_categories}
                                    type="tool"
                                    index={1}
                                />
                            )}

                            {data.framework_categories && (
                                <CategorySection
                                    title="Frameworks & Libraries"
                                    categories={data.framework_categories}
                                    type="framework"
                                    index={2}
                                />
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Skills Overview */}
                {data.skill && data.specialization && data.paradigm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 pt-16 border-t border-white/10"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            Skills Overview
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {/* Core Skills */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                                        <FaStar className="h-6 w-6 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Core Skills
                                    </h3>
                                </div>
                                <p className="text-white/70 text-sm mb-4">
                                    Fundamental technical and soft skills that
                                    form the foundation of my expertise.
                                </p>
                                <div className="space-y-2">
                                    {data.skill
                                        ?.slice(0, 3)
                                        .map((skill, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between items-center py-1"
                                            >
                                                <span className="text-sm text-white/80">
                                                    {skill.name}
                                                </span>
                                                <span className="text-xs text-green-300 font-medium bg-green-600/20 px-2 py-1 rounded-full">
                                                    {skill.percentage}%
                                                </span>
                                            </div>
                                        ))}
                                    {data.skill?.length > 3 && (
                                        <p className="text-xs text-white/50 pt-2 border-t border-white/5">
                                            +{data.skill.length - 3} more skills
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Specializations */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                                        <FaBullseye className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Specializations
                                    </h3>
                                </div>
                                <p className="text-white/70 text-sm mb-4">
                                    Advanced expertise areas where I excel and
                                    deliver exceptional results.
                                </p>
                                <div className="space-y-2">
                                    {data.specialization
                                        ?.slice(0, 2)
                                        .map((spec, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between items-center py-1"
                                            >
                                                <span className="text-sm text-white/80 line-clamp-1">
                                                    {spec.name.split(" &")[0]}
                                                </span>
                                                <span className="text-xs text-purple-300 font-medium bg-purple-600/20 px-2 py-1 rounded-full">
                                                    {spec.proficiency}%
                                                </span>
                                            </div>
                                        ))}
                                    {data.specialization?.length > 2 && (
                                        <p className="text-xs text-white/50 pt-2 border-t border-white/5">
                                            +{data.specialization.length - 2}{" "}
                                            more specializations
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Paradigms */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-pink-600/20 rounded-lg group-hover:bg-pink-600/30 transition-colors">
                                        <FaBrain className="h-6 w-6 text-pink-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">
                                        Paradigms
                                    </h3>
                                </div>
                                <p className="text-white/70 text-sm mb-4">
                                    Programming paradigms and architectural
                                    approaches I utilize in development.
                                </p>
                                <div className="space-y-2">
                                    {data.paradigm
                                        ?.slice(0, 2)
                                        .map((paradigm, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between items-center py-1"
                                            >
                                                <span className="text-sm text-white/80 line-clamp-1">
                                                    {
                                                        paradigm.name.split(
                                                            " &",
                                                        )[0]
                                                    }
                                                </span>
                                                <span className="text-xs text-pink-300 font-medium bg-pink-600/20 px-2 py-1 rounded-full">
                                                    {paradigm.proficiency}%
                                                </span>
                                            </div>
                                        ))}
                                    {data.paradigm?.length > 2 && (
                                        <p className="text-xs text-white/50 pt-2 border-t border-white/5">
                                            +{data.paradigm.length - 2} more
                                            paradigms
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-20 pt-16 border-t border-white/10"
                >
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to leverage these skills?
                        </h2>
                        <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
                            I'm passionate about applying my diverse skill set
                            to solve complex problems and create innovative
                            solutions. Let's discuss how I can contribute to
                            your next project!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2 hover:scale-105"
                            >
                                <FaHeart className="h-4 w-4" />
                                Let's Connect
                            </Link>
                            <Link
                                to="/projects"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2 hover:scale-105"
                            >
                                View Projects
                                <FaChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Additional CTA Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400 mb-1">
                                    {data.skill?.length || 0}+
                                </div>
                                <div className="text-sm text-white/60">
                                    Core Skills Mastered
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400 mb-1">
                                    {
                                        Object.values(
                                            data.language_categories || {},
                                        ).flat().length
                                    }
                                    +
                                </div>
                                <div className="text-sm text-white/60">
                                    Technologies Used
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400 mb-1">
                                    {data.specialization?.length || 0}+
                                </div>
                                <div className="text-sm text-white/60">
                                    Areas of Expertise
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
