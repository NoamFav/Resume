import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    FaGithub,
    FaExternalLinkAlt,
    FaCode,
    FaSearch,
    FaClock,
    FaCheckCircle,
    FaSpinner,
    FaTerminal,
    FaGlobe,
    FaMobile,
    FaDatabase,
    FaRobot,
    FaGamepad,
    FaShoppingCart,
    FaChartBar,
    FaLock,
    FaCog,
    FaCloud,
    FaFileAlt,
    FaImage,
    FaMusic,
    FaVideo,
    FaBookOpen,
    FaCalculator,
    FaCalendarAlt,
    FaEnvelope,
    FaUsers,
    FaHeart,
    FaStar,
    FaLayerGroup,
    FaPuzzlePiece,
    FaTools,
    FaBug,
    FaGraduationCap,
    FaBriefcase,
    FaHome,
    FaPlus,
    FaArrowUp,
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

// Icon mapping for different project categories and types
const getProjectIcon = (iconType, category) => {
    const iconMap = {
        // Specific icon types
        TERMINAL: FaTerminal,
        GLOBE: FaGlobe,
        MOBILE: FaMobile,
        DATABASE: FaDatabase,
        ROBOT: FaRobot,
        GAMEPAD: FaGamepad,
        SHOPPING: FaShoppingCart,
        CHART: FaChartBar,
        LOCK: FaLock,
        COG: FaCog,
        CLOUD: FaCloud,
        FILE: FaFileAlt,
        IMAGE: FaImage,
        MUSIC: FaMusic,
        VIDEO: FaVideo,
        BOOK: FaBookOpen,
        CALCULATOR: FaCalculator,
        CALENDAR: FaCalendarAlt,
        EMAIL: FaEnvelope,
        USERS: FaUsers,
        HEART: FaHeart,
        STAR: FaStar,
        LAYERS: FaLayerGroup,
        PUZZLE: FaPuzzlePiece,
        TOOLS: FaTools,
        BUG: FaBug,
        EDUCATION: FaGraduationCap,
        BUSINESS: FaBriefcase,
        HOME: FaHome,
        PLUS: FaPlus,
        // Category fallbacks
        "Web Development": FaGlobe,
        "Mobile Development": FaMobile,
        "System Utilities & Monitoring": FaTerminal,
        "Machine Learning": FaRobot,
        "Game Development": FaGamepad,
        "E-commerce": FaShoppingCart,
        "Data Analysis": FaChartBar,
        Security: FaLock,
        DevOps: FaCog,
        "Cloud Services": FaCloud,
        "Desktop Application": FaCog,
        "API Development": FaLayerGroup,
        Database: FaDatabase,
        "Tools & Utilities": FaTools,
        Education: FaGraduationCap,
        Portfolio: FaBriefcase,
        // Default
        default: FaCode,
    };

    // First try icon type, then category, then default
    return iconMap[iconType] || iconMap[category] || iconMap.default;
};

// Progress status component
const ProgressStatus = ({ percentage, progress }) => {
    let statusColor, StatusIcon, statusText;

    if (percentage === 100) {
        statusColor = "text-green-400";
        StatusIcon = FaCheckCircle;
        statusText = "Completed";
    } else if (percentage >= 70) {
        statusColor = "text-blue-400";
        StatusIcon = FaSpinner;
        statusText = "Nearly Done";
    } else if (percentage >= 30) {
        statusColor = "text-yellow-400";
        StatusIcon = FaClock;
        statusText = "In Progress";
    } else {
        statusColor = "text-orange-400";
        StatusIcon = FaClock;
        statusText = "Planning";
    }

    return (
        <div className={`flex items-center gap-2 ${statusColor}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{statusText}</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                {percentage}%
            </span>
        </div>
    );
};

// Progress bar component
const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-2 rounded-full ${
                percentage === 100
                    ? "bg-gradient-to-r from-green-500 to-green-400"
                    : percentage >= 70
                      ? "bg-gradient-to-r from-blue-500 to-blue-400"
                      : percentage >= 30
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                        : "bg-gradient-to-r from-orange-500 to-orange-400"
            }`}
        />
    </div>
);

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
                const response = await fetch(`${base}data/projects.json`);
                const projectsData = await response.json();
                setData(projectsData);
            } catch (error) {
                console.error("Error loading projects data:", error);
                // Fallback data for demo
                setData({
                    project: [
                        {
                            title: "Sysmon-CLI",
                            description:
                                "A lightweight terminal-based system monitoring utility optimized for Mac & Linux power users. Delivers real-time visualization of CPU utilization, memory allocation, disk I/O activity, and network statistics.",
                            git_url: "https://github.com/example/sysmon-cli",
                            category: "System Utilities & Monitoring",
                            icon: "TERMINAL",
                            languages: ["C"],
                            frameworks: ["POSIX syscalls", "IOKit", "procfs"],
                            tools: [],
                            tags: [
                                "System Monitoring",
                                "Terminal",
                                "Performance",
                                "Low-level",
                            ],
                            progress:
                                "Architecture planning completed. Initial implementation of CPU/memory tracking modules in progress.",
                            progress_percentage: 30,
                        },
                        {
                            title: "Portfolio Website",
                            description:
                                "A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, dark mode, and dynamic content loading.",
                            git_url: "https://github.com/example/portfolio",
                            category: "Web Development",
                            icon: "GLOBE",
                            languages: ["JavaScript", "CSS", "HTML"],
                            frameworks: [
                                "React",
                                "Tailwind CSS",
                                "Framer Motion",
                            ],
                            tools: ["Vite", "Git"],
                            tags: [
                                "Portfolio",
                                "React",
                                "Responsive",
                                "Animation",
                            ],
                            progress:
                                "Completed and deployed. Ongoing maintenance and feature additions.",
                            progress_percentage: 100,
                        },
                        {
                            title: "Task Manager App",
                            description:
                                "A full-stack task management application with real-time collaboration features. Built with Node.js backend and React frontend.",
                            git_url: "",
                            category: "Web Development",
                            icon: "TOOLS",
                            languages: ["JavaScript", "SQL"],
                            frameworks: [
                                "React",
                                "Node.js",
                                "Express",
                                "PostgreSQL",
                            ],
                            tools: ["Docker", "JWT"],
                            tags: [
                                "Full-stack",
                                "Real-time",
                                "Collaboration",
                                "CRUD",
                            ],
                            progress:
                                "Backend API completed. Working on frontend implementation and real-time features.",
                            progress_percentage: 65,
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

// Project card component
const ProjectCard = ({ project, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const ProjectIcon = getProjectIcon(project.icon, project.category);

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
            <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500" />

            <div className="p-6">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                            <ProjectIcon className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                                {project.category}
                            </p>
                        </div>
                    </div>
                    <ProgressStatus
                        percentage={project.progress_percentage}
                        progress={project.progress}
                    />
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 line-clamp-3 group-hover:text-white/90 transition-colors">
                    {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <ProgressBar percentage={project.progress_percentage} />
                </div>

                {/* Progress Details */}
                <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-xs text-white/60 mb-1 font-medium">
                        Current Status:
                    </p>
                    <p className="text-sm text-white/80">{project.progress}</p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                    <p className="text-xs text-white/60 mb-2 font-medium uppercase tracking-wide">
                        Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.languages?.map((lang, langIndex) => (
                            <span
                                key={`lang-${langIndex}`}
                                className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            >
                                {lang}
                            </span>
                        ))}
                        {project.frameworks?.map((framework, fwIndex) => (
                            <span
                                key={`fw-${fwIndex}`}
                                className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            >
                                {framework}
                            </span>
                        ))}
                        {project.tools?.map((tool, toolIndex) => (
                            <span
                                key={`tool-${toolIndex}`}
                                className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-white/60 mb-2 font-medium uppercase tracking-wide">
                            Tags
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                                <span
                                    key={`tag-${tagIndex}`}
                                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    {project.git_url && (
                        <a
                            href={project.git_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 font-medium group/link hover:underline"
                        >
                            <FaGithub className="h-4 w-4" />
                            View Source
                            <FaExternalLinkAlt className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                    )}
                    {!project.git_url && (
                        <span className="flex items-center gap-2 text-sm text-white/40">
                            <FaGithub className="h-4 w-4" />
                            Private Repository
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// Filter component
const ProjectFilters = ({ projects, filters, setFilters }) => {
    const categories = useMemo(() => {
        const cats = [...new Set(projects.map((p) => p.category))];
        return cats.sort();
    }, [projects]);

    const statuses = [
        { key: "all", label: "All Projects", icon: FaLayerGroup },
        { key: "completed", label: "Completed", icon: FaCheckCircle },
        { key: "in-progress", label: "In Progress", icon: FaSpinner },
        { key: "planning", label: "Planning", icon: FaClock },
    ];

    return (
        <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search projects..."
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

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => {
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
const ProjectStats = ({ projects }) => {
    const stats = useMemo(() => {
        const total = projects.length;
        const completed = projects.filter(
            (p) => p.progress_percentage === 100,
        ).length;
        const inProgress = projects.filter(
            (p) => p.progress_percentage > 0 && p.progress_percentage < 100,
        ).length;
        const avgProgress = Math.round(
            projects.reduce((acc, p) => acc + p.progress_percentage, 0) / total,
        );

        return { total, completed, inProgress, avgProgress };
    }, [projects]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaLayerGroup className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-white/60">
                        Total Projects
                    </span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.total}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white/60">Completed</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.completed}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaSpinner className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm text-white/60">In Progress</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.inProgress}
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <FaChartBar className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-white/60">Avg Progress</span>
                </div>
                <span className="text-2xl font-bold text-white">
                    {stats.avgProgress}%
                </span>
            </div>
        </motion.div>
    );
};

// Main Projects component
export default function Projects() {
    const { data, isLoading } = useDataLoader();
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        status: "all",
    });

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    // Filter projects based on current filters
    const filteredProjects = useMemo(() => {
        if (!data.project) return [];

        return data.project.filter((project) => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    project.title.toLowerCase().includes(searchLower) ||
                    project.description.toLowerCase().includes(searchLower) ||
                    project.category.toLowerCase().includes(searchLower) ||
                    project.tags?.some((tag) =>
                        tag.toLowerCase().includes(searchLower),
                    ) ||
                    project.languages?.some((lang) =>
                        lang.toLowerCase().includes(searchLower),
                    );

                if (!matchesSearch) return false;
            }

            // Category filter
            if (
                filters.category !== "all" &&
                project.category !== filters.category
            ) {
                return false;
            }

            // Status filter
            if (filters.status !== "all") {
                if (
                    filters.status === "completed" &&
                    project.progress_percentage !== 100
                )
                    return false;
                if (
                    filters.status === "in-progress" &&
                    (project.progress_percentage === 0 ||
                        project.progress_percentage === 100)
                )
                    return false;
                if (
                    filters.status === "planning" &&
                    project.progress_percentage > 30
                )
                    return false;
            }

            return true;
        });
    }, [data.project, filters]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="animate-pulse text-white/70 text-xl flex items-center gap-3">
                    <FaSpinner className="animate-spin" />
                    Loading projects...
                </div>
            </div>
        );
    }

    if (!data.project || data.project.length === 0) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white/70 text-xl text-center">
                    <FaCode className="h-16 w-16 mx-auto mb-4 text-white/40" />
                    <p>No projects found</p>
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
                                Portfolio Showcase
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            My Projects
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            A collection of my work spanning web development,
                            system utilities, and experimental projects. Each
                            project represents a journey of learning and
                            problem-solving.
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
                <ProjectStats projects={data.project} />

                {/* Filters */}
                <ProjectFilters
                    projects={data.project}
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
                            {filteredProjects.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-white">
                            {data.project.length}
                        </span>{" "}
                        projects
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

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={`${project.title}-${index}`}
                                project={project}
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
                            No projects found
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
                        Interested in collaborating?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        I'm always excited to work on new projects and explore
                        innovative solutions. Let's build something amazing
                        together!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                        >
                            Get in Touch <FaEnvelope />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            View GitHub <FaGithub />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
