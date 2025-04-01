import React, { useEffect, useState, useMemo } from "react";
import Logo from "../assets/logo.png";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaCode,
    FaEnvelope,
    FaMapMarkerAlt,
    FaExternalLinkAlt,
    FaChevronRight,
    FaGraduationCap,
    FaBriefcase,
    FaCertificate,
    FaArrowRight,
    FaPhone,
    FaUserAlt,
    FaFileDownload,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Helper function to format dates
const formatDate = (dateString, format = "short") => {
    if (!dateString) return "Present";

    const date = new Date(dateString);
    const month = date.toLocaleString("default", {
        month: format === "short" ? "short" : "long",
    });
    const year = date.getFullYear();

    return `${month} ${year}`;
};

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function Hero() {
    // State variables
    const [config, setConfig] = useState(null);
    const [contact, setContact] = useState(null);
    const [skills, setSkills] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [projects, setProjects] = useState(null);
    const [experience, setExperience] = useState(null);
    const [education, setEducation] = useState(null);
    const [activeTab, setActiveTab] = useState("languages");
    const [isLoading, setIsLoading] = useState(true);

    // Animation hooks
    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [contentRef, contentInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const base = import.meta.env.BASE_URL.endsWith("/")
            ? import.meta.env.BASE_URL
            : import.meta.env.BASE_URL + "/";

        const loadData = async () => {
            try {
                const [
                    configData,
                    contactData,
                    skillsData,
                    languagesData,
                    projectsData,
                    experienceData,
                    educationData,
                ] = await Promise.all([
                    fetch(`${base}data/config.json`).then((res) => res.json()),
                    fetch(`${base}data/contact.json`).then((res) => res.json()),
                    fetch(`${base}data/skills.json`).then((res) => res.json()),
                    fetch(`${base}data/programming_languages.json`).then(
                        (res) => res.json(),
                    ),
                    fetch(`${base}data/projects.json`).then((res) =>
                        res.json(),
                    ),
                    fetch(`${base}data/experience.json`).then((res) =>
                        res.json(),
                    ),
                    fetch(`${base}data/education.json`).then((res) =>
                        res.json(),
                    ),
                ]);

                setConfig(configData);
                setContact(contactData);
                setSkills(skillsData);
                setLanguages(languagesData);
                setProjects(projectsData);
                setExperience(experienceData);
                setEducation(educationData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Memoized derived data
    const { topLanguages, topSkills, featuredProjects, specializations } =
        useMemo(() => {
            if (!languages || !skills || !projects || !config) {
                return {
                    topLanguages: [],
                    topSkills: [],
                    featuredProjects: [],
                    specializations: [],
                };
            }

            // Get top languages based on percentage and favorite status
            const topLangs = languages.programming_language
                .sort(
                    (a, b) =>
                        b.favorite - a.favorite || b.percentage - a.percentage,
                )
                .slice(0, config.display.featured_languages);

            // Get top skills based on percentage
            const topSkls = skills.skill
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, config.display.featured_skills);

            // Get completed projects or the most complete ones
            const featProjs = projects.project
                .sort((a, b) => b.progress_percentage - a.progress_percentage)
                .slice(0, config.display.featured_projects);

            // Get specializations
            const specs = skills.specialization || [];

            return {
                topLanguages: topLangs,
                topSkills: topSkls,
                featuredProjects: featProjs,
                specializations: specs,
            };
        }, [languages, skills, projects, config]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-slate-900">
                <div className="animate-pulse text-white/70 text-xl">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (
        !config ||
        !contact ||
        !skills ||
        !languages ||
        !projects ||
        !experience ||
        !education
    ) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-slate-900">
                <div className="text-white/70 text-xl">
                    Could not load profile data
                </div>
            </div>
        );
    }

    return (
        <section className="w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen">
            {/* Header with Blur Effect */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl rounded-full -top-1/2 left-1/4 w-1/2 h-full"></div>
                <div className="absolute inset-0 bg-purple-600 opacity-10 blur-3xl rounded-full -bottom-1/2 right-1/4 w-1/2 h-full"></div>
                <div className="absolute top-40 left-20 w-24 h-24 bg-green-500 opacity-20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-40 right-20 w-32 h-32 bg-yellow-500 opacity-20 blur-3xl rounded-full"></div>

                <motion.div
                    ref={headerRef}
                    initial="hidden"
                    animate={headerInView ? "visible" : "hidden"}
                    variants={staggerChildren}
                    className="relative z-10 max-w-7xl mx-auto py-20 px-6 md:py-28"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
                        {/* Profile Image with Animation */}
                        <motion.div
                            variants={fadeIn}
                            className="md:w-1/4 flex-shrink-0"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <img
                                    src={Logo}
                                    alt="Profile"
                                    className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaUserAlt className="inline-block mr-1" />{" "}
                                    Portfolio
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Intro */}
                        <div className="md:w-3/4 text-center md:text-left">
                            <motion.h1
                                variants={fadeIn}
                                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                            >
                                {config.site.title.split(" - ")[0]}
                            </motion.h1>

                            <motion.p
                                variants={fadeIn}
                                className="text-2xl md:text-3xl font-light mb-6 text-blue-200"
                            >
                                {config.site.description}
                            </motion.p>

                            {/* Specializations Carousel */}
                            <motion.div variants={fadeIn} className="mb-8">
                                <p className="uppercase tracking-widest text-xs font-semibold text-blue-300 mb-3">
                                    Specializing in
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {specializations
                                        .slice(0, 3)
                                        .map((spec, index) => (
                                            <motion.span
                                                key={spec.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.1 * index,
                                                    duration: 0.5,
                                                }}
                                                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm hover:bg-white/20 transition-colors duration-300 cursor-default"
                                            >
                                                {spec.name}
                                            </motion.span>
                                        ))}
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={staggerChildren}
                                className="flex flex-wrap gap-4 justify-center md:justify-start"
                            >
                                <motion.a
                                    variants={fadeIn}
                                    href="/contact"
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                                >
                                    Get in Touch <FaEnvelope />
                                </motion.a>
                                <motion.a
                                    variants={fadeIn}
                                    href="/projects"
                                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all flex items-center gap-2"
                                >
                                    View Portfolio{" "}
                                    <FaChevronRight className="h-3 w-3" />
                                </motion.a>
                                <motion.a
                                    variants={fadeIn}
                                    href="/resume"
                                    className="px-8 py-3 bg-transparent hover:bg-white/5 border border-white/20 text-white/80 hover:text-white rounded-full font-medium transition-all flex items-center gap-2"
                                >
                                    Download CV <FaFileDownload />
                                </motion.a>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                variants={staggerChildren}
                                className="flex justify-center md:justify-start gap-6 mt-8"
                            >
                                {contact.social && contact.social.github && (
                                    <motion.a
                                        variants={fadeIn}
                                        href={contact.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full text-lg hover:scale-110 hover:shadow-lg"
                                        aria-label="GitHub Profile"
                                    >
                                        <FaGithub />
                                    </motion.a>
                                )}
                                {contact.social && contact.social.linkedin && (
                                    <motion.a
                                        variants={fadeIn}
                                        href={contact.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full text-lg hover:scale-110 hover:shadow-lg"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <FaLinkedin />
                                    </motion.a>
                                )}
                                {contact.social && contact.social.instagram && (
                                    <motion.a
                                        variants={fadeIn}
                                        href={contact.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full text-lg hover:scale-110 hover:shadow-lg"
                                        aria-label="Instagram Profile"
                                    >
                                        <FaInstagram />
                                    </motion.a>
                                )}
                                {contact.social && contact.social.leetcode && (
                                    <motion.a
                                        variants={fadeIn}
                                        href={contact.social.leetcode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/10 hover:bg-white/20 transition-all p-3 rounded-full text-lg hover:scale-110 hover:shadow-lg"
                                        aria-label="LeetCode Profile"
                                    >
                                        <FaCode />
                                    </motion.a>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Skills & Projects Showcase */}
                    <motion.div
                        ref={contentRef}
                        initial="hidden"
                        animate={contentInView ? "visible" : "hidden"}
                        variants={fadeIn}
                        className="max-w-7xl mx-auto px-6 pb-20 mt-16"
                    >
                        {/* Navigation Tabs */}
                        <div className="flex justify-center mb-10 overflow-x-auto whitespace-nowrap px-4 py-2">
                            <div className="inline-flex rounded-full bg-white/5 backdrop-blur-sm p-1.5 shadow-xl">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab("education")}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        activeTab === "education"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FaGraduationCap /> Education
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab("experience")}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        activeTab === "experience"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FaBriefcase /> Experience
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab("languages")}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        activeTab === "languages"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FaCode /> Languages
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab("skills")}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        activeTab === "skills"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FaCertificate /> Skills
                                    </span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab("projects")}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                        activeTab === "projects"
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                                            : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FaExternalLinkAlt /> Projects
                                    </span>
                                </motion.button>
                            </div>
                        </div>

                        {/* Content Panels with Card Glow Effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10 relative"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>

                            {/* Education Panel */}
                            {activeTab === "education" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <FaGraduationCap className="mr-2 text-blue-400" />{" "}
                                            Education & Certifications
                                        </h2>
                                        <a
                                            href="/education"
                                            className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1 hover:underline group"
                                        >
                                            View full education
                                            <FaChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Formal Education Section */}
                                        <div>
                                            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6 pb-2 border-b border-white/10">
                                                <FaGraduationCap className="text-blue-400" />
                                                Formal Education
                                            </h3>

                                            <div className="space-y-5">
                                                {education.education.map(
                                                    (edu, index) => {
                                                        const startYear =
                                                            new Date(
                                                                edu.start_date,
                                                            ).getFullYear();
                                                        const endYear =
                                                            edu.end_date
                                                                ? new Date(
                                                                      edu.end_date,
                                                                  ).getFullYear()
                                                                : "Present";

                                                        const isOngoing =
                                                            !edu.end_date ||
                                                            new Date(
                                                                edu.end_date,
                                                            ) > new Date();

                                                        return (
                                                            <motion.div
                                                                key={`${edu.school}-${edu.degree}`}
                                                                initial={{
                                                                    opacity: 0,
                                                                    x: -20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    x: 0,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        0.1 *
                                                                        index,
                                                                    duration: 0.5,
                                                                }}
                                                                className="relative pl-6 border-l-2 border-blue-500/30 hover:border-blue-500/70 transition-all pb-2 group"
                                                            >
                                                                {isOngoing && (
                                                                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-0 animate-pulse"></div>
                                                                )}
                                                                <div className="text-white/60 text-sm mb-1">
                                                                    {startYear}{" "}
                                                                    - {endYear}
                                                                </div>
                                                                <h4 className="text-lg font-medium text-white mb-1 group-hover:text-blue-300 transition-colors">
                                                                    {edu.degree}
                                                                </h4>
                                                                <div className="text-white/90">
                                                                    {edu.school}
                                                                </div>
                                                                <div className="text-blue-300 text-sm mt-1">
                                                                    {edu.field}
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>

                                        {/* Certifications Section */}
                                        <div>
                                            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6 pb-2 border-b border-white/10">
                                                <FaCertificate className="text-green-400" />
                                                Certifications
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {education.certification.map(
                                                    (cert, index) => {
                                                        // Format date
                                                        const certDate =
                                                            new Date(cert.date);
                                                        const year =
                                                            certDate.getFullYear();
                                                        const month =
                                                            certDate.toLocaleString(
                                                                "default",
                                                                {
                                                                    month: "short",
                                                                },
                                                            );

                                                        return (
                                                            <motion.div
                                                                key={cert.name}
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        0.1 *
                                                                        index,
                                                                    duration: 0.5,
                                                                }}
                                                                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 hover:shadow-lg hover:shadow-green-500/10 group"
                                                            >
                                                                <h4 className="text-lg font-medium text-white mb-1 group-hover:text-green-300 transition-colors">
                                                                    {cert.name}
                                                                </h4>
                                                                <div className="text-white/80 text-sm">
                                                                    {
                                                                        cert.organization
                                                                    }
                                                                </div>
                                                                <div className="text-white/60 text-sm mt-2">
                                                                    {month}{" "}
                                                                    {year}
                                                                </div>
                                                                {cert.grade && (
                                                                    <div className="text-green-300 mt-1 text-sm flex items-center">
                                                                        Grade:{" "}
                                                                        <span className="ml-1 bg-green-500/20 px-2 py-0.5 rounded-full">
                                                                            {
                                                                                cert.grade
                                                                            }
                                                                            /100
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </motion.div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Experience Panel */}
                            {activeTab === "experience" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <FaBriefcase className="mr-2 text-blue-400" />{" "}
                                            Professional Experience
                                        </h2>
                                        <a
                                            href="/experience"
                                            className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1 hover:underline group"
                                        >
                                            View full experience
                                            <FaChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <div className="relative">
                                        {/* Timeline */}
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-50"></div>

                                        <div className="space-y-8 pl-8">
                                            {experience.experience
                                                .sort(
                                                    (a, b) =>
                                                        new Date(b.start_date) -
                                                        new Date(a.start_date),
                                                )
                                                .slice(0, 5)
                                                .map((exp, index) => {
                                                    // Format dates
                                                    const startDate =
                                                        formatDate(
                                                            exp.start_date,
                                                        );
                                                    const endDate = formatDate(
                                                        exp.end_date,
                                                    );

                                                    const isOngoing =
                                                        !exp.end_date ||
                                                        new Date(exp.end_date) >
                                                            new Date();

                                                    // Color variations for dots
                                                    const colors = [
                                                        "bg-blue-500",
                                                        "bg-purple-500",
                                                        "bg-green-500",
                                                        "bg-yellow-500",
                                                        "bg-pink-500",
                                                    ];

                                                    return (
                                                        <motion.div
                                                            key={`${exp.company}-${exp.position}-${exp.start_date}`}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    0.1 * index,
                                                                duration: 0.5,
                                                            }}
                                                            className="relative"
                                                        >
                                                            {/* Timeline dot */}
                                                            <div
                                                                className={`absolute w-5 h-5 rounded-full ${colors[index % colors.length]} -left-[26px] top-0 shadow-lg ${isOngoing ? "animate-pulse" : ""}`}
                                                            ></div>

                                                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 hover:shadow-lg group">
                                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                                                        {
                                                                            exp.position
                                                                        }
                                                                    </h3>
                                                                    <div className="text-white/60 text-sm flex items-center gap-1 mt-1 md:mt-0">
                                                                        <FaBriefcase className="h-3 w-3" />
                                                                        {
                                                                            startDate
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            endDate
                                                                        }
                                                                        {isOngoing && (
                                                                            <span className="ml-2 bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full">
                                                                                Current
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="text-white/90 font-medium mb-2">
                                                                    {
                                                                        exp.company
                                                                    }
                                                                </div>
                                                                <p className="text-white/70">
                                                                    {
                                                                        exp.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Languages Panel */}
                            {activeTab === "languages" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <FaCode className="mr-2 text-blue-400" />{" "}
                                            Top Programming Languages
                                        </h2>
                                        <a
                                            href="/languages"
                                            className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1 hover:underline group"
                                        >
                                            View all languages
                                            <FaChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {topLanguages.map((lang, index) => (
                                            <motion.div
                                                key={lang.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.1 * index,
                                                    duration: 0.5,
                                                }}
                                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 group hover:shadow-lg"
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center gap-3">
                                                        {lang.image && (
                                                            <img
                                                                src={lang.image}
                                                                alt={lang.name}
                                                                className="w-8 h-8 rounded-md group-hover:scale-110 transition-transform"
                                                            />
                                                        )}
                                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                                            {lang.name}
                                                        </h3>
                                                    </div>
                                                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 group-hover:bg-blue-600/30 transition-colors">
                                                        {lang.percentage}%
                                                    </span>
                                                </div>

                                                <div className="w-full bg-white/5 rounded-full h-2.5 mb-2 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${lang.percentage}%`,
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            delay:
                                                                0.2 +
                                                                0.1 * index,
                                                        }}
                                                        className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 group-hover:from-blue-400 group-hover:to-blue-300 transition-all"
                                                    ></motion.div>
                                                </div>

                                                <div className="flex mt-3 gap-2">
                                                    {lang.favorite && (
                                                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>{" "}
                                                            Favorite
                                                        </span>
                                                    )}
                                                    {lang.learning && (
                                                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>{" "}
                                                            Learning
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Skills Panel */}
                            {activeTab === "skills" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <FaCertificate className="mr-2 text-green-400" />{" "}
                                            Key Skills & Expertise
                                        </h2>
                                        <a
                                            href="/skills"
                                            className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1 hover:underline group"
                                        >
                                            View all skills
                                            <FaChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {topSkills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.1 * index,
                                                    duration: 0.5,
                                                }}
                                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 group hover:shadow-lg"
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <h3 className="text-xl font-semibold text-white group-hover:text-green-300 transition-colors">
                                                        {skill.name}
                                                    </h3>
                                                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-600/20 text-green-300 group-hover:bg-green-600/30 transition-colors">
                                                        {skill.percentage}%
                                                    </span>
                                                </div>

                                                <div className="w-full bg-white/5 rounded-full h-2.5 mb-4 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${skill.percentage}%`,
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            delay:
                                                                0.2 +
                                                                0.1 * index,
                                                        }}
                                                        className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-400 group-hover:from-green-400 group-hover:to-green-300 transition-all"
                                                    ></motion.div>
                                                </div>

                                                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                                    {skill.description}
                                                </p>

                                                <div className="mt-3">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                                                        {skill.category}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Projects Panel */}
                            {activeTab === "projects" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center">
                                            <FaExternalLinkAlt className="mr-2 text-blue-400" />{" "}
                                            Featured Projects
                                        </h2>
                                        <a
                                            href="/projects"
                                            className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1 hover:underline group"
                                        >
                                            View all projects
                                            <FaChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {featuredProjects.map(
                                            (project, index) => (
                                                <motion.div
                                                    key={project.title}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: 0.1 * index,
                                                        duration: 0.5,
                                                    }}
                                                    className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all border border-white/5 hover:border-white/10 group hover:shadow-xl hover:-translate-y-1"
                                                >
                                                    <div className="h-3 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500"></div>
                                                    <div className="p-6">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                                                {project.title}
                                                            </h3>
                                                            {project.progress_percentage ===
                                                            100 ? (
                                                                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 flex items-center gap-1">
                                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>{" "}
                                                                    Completed
                                                                </span>
                                                            ) : (
                                                                <div className="flex flex-col items-end">
                                                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                                                                        {
                                                                            project.progress_percentage
                                                                        }
                                                                        %
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <p className="text-sm text-white/70 line-clamp-3 mb-4 min-h-[3em] group-hover:text-white/90 transition-colors">
                                                            {
                                                                project.description
                                                            }
                                                        </p>

                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {project.languages &&
                                                                project.languages
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            lang,
                                                                            index,
                                                                        ) => (
                                                                            <span
                                                                                key={`${project.title}-${lang}-${index}`}
                                                                                className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                                                                            >
                                                                                {
                                                                                    lang
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )}
                                                        </div>

                                                        {project.git_url && (
                                                            <a
                                                                href={
                                                                    project.git_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200 mt-2 gap-1 group-hover:underline"
                                                            >
                                                                View on GitHub
                                                                <FaExternalLinkAlt className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Contact Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-md border-t border-white/10 sticky bottom-0"
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-white/60 text-sm mb-4 md:mb-0 hover:text-white/90 transition-colors">
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 hover:text-blue-300 transition-colors"
                        >
                            <FaEnvelope className="h-4 w-4" />
                            {contact.email}
                        </a>
                    </div>
                    {contact.phone && (
                        <div className="text-white/60 text-sm mb-4 md:mb-0 hover:text-white/90 transition-colors">
                            <a
                                href={`tel:${contact.phone}`}
                                className="flex items-center gap-2 hover:text-blue-300 transition-colors"
                            >
                                <FaPhone className="h-4 w-4" />
                                {contact.phone}
                            </a>
                        </div>
                    )}
                    <div className="text-white/60 text-sm hover:text-white/90 transition-colors">
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt className="h-4 w-4" />
                            {contact.address}
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
