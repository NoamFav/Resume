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

// Icon mapping for different skill categories and types
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
                const response = await fetch(`${base}data/skills.json`);
                const skillsData = await response.json();
                setData(skillsData);
            } catch (error) {
                console.error("Error loading skills data:", error);
                // Fallback data for demo
                setData({
                    skill: [
                        {
                            name: "Programming",
                            percentage: 95,
                            category: "Technical",
                            description:
                                "Proficient in multiple programming languages and paradigms",
                        },
                        {
                            name: "Web Development",
                            percentage: 90,
                            category: "Technical",
                            description:
                                "Full-stack web development with modern frameworks",
                        },
                        {
                            name: "Problem Solving",
                            percentage: 95,
                            category: "Soft",
                            description:
                                "Analyzing complex issues and developing effective solutions",
                        },
                        {
                            name: "Communication",
                            percentage: 85,
                            category: "Soft",
                            description:
                                "Clearly conveying technical concepts to various audiences",
                        },
                        {
                            name: "Machine Learning",
                            percentage: 80,
                            category: "Technical",
                            description:
                                "Building and deploying ML models for real-world applications",
                        },
                        {
                            name: "Team Management",
                            percentage: 75,
                            category: "Soft",
                            description:
                                "Leading and coordinating development teams effectively",
                        },
                    ],
                    specialization: [
                        {
                            name: "Low-level System Programming & Hardware Integration",
                            description:
                                "Developing efficient software with direct hardware access and control",
                            proficiency: 85,
                            related_skills: [
                                "Programming",
                                "Problem Solving",
                                "Performance Optimization",
                            ],
                            key_projects: ["Sysmon-CLI", "SysDash Ultra"],
                            languages: ["C/C++", "Rust"],
                        },
                        {
                            name: "AI/ML Integration & Data-driven Insights",
                            description:
                                "Incorporating machine learning models and AI capabilities into applications",
                            proficiency: 75,
                            related_skills: [
                                "Machine Learning",
                                "Data Analysis",
                                "Problem Solving",
                            ],
                            key_projects: [
                                "Smart-Commit",
                                "Iris - AI Coding Assistant",
                            ],
                            languages: ["Python", "C++", "Rust"],
                        },
                    ],
                    paradigm: [
                        {
                            name: "Functional & Reactive Programming",
                            description:
                                "Using immutable data and function composition to build reactive systems",
                            proficiency: 80,
                            related_skills: ["Programming", "Data Structures"],
                            key_languages: ["Rust", "TypeScript"],
                        },
                        {
                            name: "Object-Oriented & Component-based Design",
                            description:
                                "Structuring code around objects and reusable components",
                            proficiency: 85,
                            related_skills: [
                                "Programming",
                                "Software Engineering",
                            ],
                            key_languages: ["C++", "Swift", "Java", "C#"],
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

// Skill card component
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

// Filter component
const SkillsFilters = ({ data, filters, setFilters }) => {
    const categories = useMemo(() => {
        if (!data.skill) return [];
        const cats = [...new Set(data.skill.map((s) => s.category))];
        return cats.sort();
    }, [data.skill]);

    const filterTypes = [
        { key: "all", label: "All Skills", icon: FaLayerGroup },
        { key: "skills", label: "Core Skills", icon: FaStar },
        {
            key: "specializations",
            label: "Specializations",
            icon: FaBullseye,
        },
        { key: "paradigms", label: "Paradigms", icon: FaBrain },
    ];

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search skills..."
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

            {/* Category Filter for Skills */}
            {filters.type === "all" || filters.type === "skills"
                ? categories.length > 1 && (
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
                  )
                : null}
        </div>
    );
};

// Statistics component
const SkillsStats = ({ data }) => {
    const stats = useMemo(() => {
        const skillCount = data.skill?.length || 0;
        const specializationCount = data.specialization?.length || 0;
        const paradigmCount = data.paradigm?.length || 0;
        const total = skillCount + specializationCount + paradigmCount;

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
            avgSkillLevel,
            topSkills,
        };
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
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
        if (filters.type === "all" || filters.type === "skills") {
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

                {/* Skills Categories Overview */}
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
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-green-600/20 rounded-lg">
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
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-sm text-white/80">
                                                    {skill.name}
                                                </span>
                                                <span className="text-xs text-green-300 font-medium">
                                                    {skill.percentage}%
                                                </span>
                                            </div>
                                        ))}
                                    {data.skill?.length > 3 && (
                                        <p className="text-xs text-white/50 pt-2">
                                            +{data.skill.length - 3} more skills
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Specializations */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-purple-600/20 rounded-lg">
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
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-sm text-white/80 line-clamp-1">
                                                    {spec.name.split(" &")[0]}
                                                </span>
                                                <span className="text-xs text-purple-300 font-medium">
                                                    {spec.proficiency}%
                                                </span>
                                            </div>
                                        ))}
                                    {data.specialization?.length > 2 && (
                                        <p className="text-xs text-white/50 pt-2">
                                            +{data.specialization.length - 2}{" "}
                                            more specializations
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Paradigms */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-pink-600/20 rounded-lg">
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
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-sm text-white/80 line-clamp-1">
                                                    {
                                                        paradigm.name.split(
                                                            " &",
                                                        )[0]
                                                    }
                                                </span>
                                                <span className="text-xs text-pink-300 font-medium">
                                                    {paradigm.proficiency}%
                                                </span>
                                            </div>
                                        ))}
                                    {data.paradigm?.length > 2 && (
                                        <p className="text-xs text-white/50 pt-2">
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
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to leverage these skills?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        I'm passionate about applying my diverse skill set to
                        solve complex problems and create innovative solutions.
                        Let's discuss how I can contribute to your next project!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                        >
                            Let's Connect <FaHeart />
                        </a>
                        <a
                            href="/projects"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            View Projects <FaChevronRight />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
