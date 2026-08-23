import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaCode,
    FaEnvelope,
    FaArrowRight,
    FaFileDownload,
    FaBriefcase,
    FaGraduationCap,
    FaCertificate,
    FaStar,
    FaBook,
    FaGlobe,
} from "react-icons/fa";

import Logo from "../assets/logo.png";
import { useData } from "../lib/useData";
import { useGithubStats } from "../lib/useGithub";
import { formatDate, isOngoing } from "../lib/format";
import ProgressBar from "../components/ui/ProgressBar";
import { LoadingState } from "../components/ui/States";

const SOCIAL_ICONS = {
    website: FaGlobe,
    github: FaGithub,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    leetcode: FaCode,
};

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectionHeading({ eyebrow, title, action }) {
    return (
        <div className="flex items-end justify-between mb-8 gap-4">
            <div>
                <span className="text-xs font-medium tracking-wide uppercase text-blue-400">
                    {eyebrow}
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mt-1">
                    {title}
                </h2>
            </div>
            {action}
        </div>
    );
}

function ViewAllLink({ to, children }) {
    return (
        <Link
            to={to}
            className="hidden sm:flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors shrink-0"
        >
            {children} <FaArrowRight className="h-3 w-3" />
        </Link>
    );
}

function TechColumn({ title, items, to }) {
    const top = [...items]
        .sort((a, b) => b.favorite - a.favorite || b.percentage - a.percentage)
        .slice(0, 4);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-medium text-white">{title}</h3>
                <Link
                    to={to}
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                    View all
                </Link>
            </div>
            <div className="space-y-4">
                {top.map((item) => (
                    <div key={item.name}>
                        <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-4 h-4 shrink-0"
                                    />
                                )}
                                <span className="text-sm text-zinc-300 truncate">
                                    {item.name}
                                </span>
                            </div>
                            <span className="text-xs text-zinc-500 shrink-0">
                                {item.percentage}%
                            </span>
                        </div>
                        <ProgressBar value={item.percentage} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const { data, isLoading } = useData([
        "config",
        "contact",
        "skills",
        "programming_languages",
        "tools",
        "frameworks",
        "projects",
        "experience",
        "education",
    ]);
    const github = useGithubStats();

    const specializations = useMemo(
        () => data?.skills?.specialization?.slice(0, 3) || [],
        [data],
    );

    const featuredProjects = useMemo(() => {
        if (!data?.projects?.project) return [];
        return [...data.projects.project]
            .sort((a, b) => b.progress_percentage - a.progress_percentage)
            .slice(0, 3);
    }, [data]);

    const topSkills = useMemo(
        () =>
            [...(data?.skills?.skill || [])]
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 6),
        [data],
    );

    const sortedExperience = useMemo(
        () =>
            [...(data?.experience?.experience || [])].sort(
                (a, b) => new Date(b.start_date) - new Date(a.start_date),
            ),
        [data],
    );

    if (isLoading) return <LoadingState label="Loading profile..." />;

    const { config, contact, education } = data;
    const contactInfo = contact?.contact;

    return (
        <div>
            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="shrink-0"
                    >
                        <img
                            src={Logo}
                            alt="Noam Favier"
                            className="w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover border border-zinc-800"
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                        className="text-center md:text-left"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4"
                        >
                            {config.site.title.split(" - ")[0]}
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="text-xl md:text-2xl text-zinc-400 mb-6"
                        >
                            {config.site.description}
                        </motion.p>

                        {specializations.length > 0 && (
                            <motion.div
                                variants={fadeUp}
                                className="flex flex-wrap gap-2 justify-center md:justify-start mb-8"
                            >
                                {specializations.map((spec) => (
                                    <span
                                        key={spec.name}
                                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400"
                                    >
                                        {spec.name.split(" &")[0]}
                                    </span>
                                ))}
                            </motion.div>
                        )}

                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap gap-3 justify-center md:justify-start mb-8"
                        >
                            <Link
                                to="/projects"
                                className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                            >
                                View Projects <FaArrowRight className="h-3 w-3" />
                            </Link>
                            <a
                                href={`${import.meta.env.BASE_URL}resume.pdf`}
                                download
                                className="px-6 py-3 border border-zinc-800 hover:border-zinc-700 rounded-full text-sm font-medium text-white transition-colors flex items-center gap-2"
                            >
                                Download Resume <FaFileDownload className="h-3 w-3" />
                            </a>
                            {contactInfo && (
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="px-6 py-3 border border-zinc-800 hover:border-zinc-700 rounded-full text-sm font-medium text-white transition-colors flex items-center gap-2"
                                >
                                    Get in Touch <FaEnvelope className="h-3 w-3" />
                                </a>
                            )}
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="flex gap-5 justify-center md:justify-start"
                        >
                            {Object.entries(contact.social || {}).map(
                                ([platform, url]) => {
                                    const Icon = SOCIAL_ICONS[platform];
                                    if (!Icon || !url) return null;
                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-zinc-500 hover:text-white transition-colors"
                                            aria-label={platform}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    );
                                },
                            )}
                        </motion.div>
                    </motion.div>
                </div>

                {/* GitHub live stats */}
                {github && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden mt-16 max-w-xl mx-auto md:mx-0"
                    >
                        <div className="bg-black p-5 text-center">
                            <div className="text-2xl font-semibold text-white">
                                {github.publicRepos}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">
                                Public Repos
                            </div>
                        </div>
                        <div className="bg-black p-5 text-center">
                            <div className="text-2xl font-semibold text-white">
                                {github.stars}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">
                                GitHub Stars
                            </div>
                        </div>
                        <div className="bg-black p-5 text-center">
                            <div className="text-2xl font-semibold text-white">
                                {github.followers}
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">
                                Followers
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* About */}
            {config.site.intro && (
                <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
                    <SectionHeading eyebrow="About" title="A little about me" />
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-zinc-400 leading-relaxed max-w-3xl"
                    >
                        {config.site.intro}
                    </motion.p>
                </section>
            )}

            {/* Experience */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
                <SectionHeading eyebrow="Experience" title="Where I've worked" />
                <div className="space-y-3">
                    {sortedExperience.map((exp) => (
                        <motion.div
                            key={`${exp.company}-${exp.position}-${exp.start_date}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex items-center gap-3 sm:w-56 shrink-0">
                                <FaBriefcase className="h-4 w-4 text-zinc-600 shrink-0" />
                                <div>
                                    <div className="text-white font-medium leading-tight">
                                        {exp.position}
                                    </div>
                                    <div className="text-sm text-zinc-500">
                                        {exp.company}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400 flex-1">
                                {exp.description}
                            </p>
                            <div className="text-xs text-zinc-500 sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end gap-2">
                                <span>
                                    {formatDate(exp.start_date)} –{" "}
                                    {formatDate(exp.end_date)}
                                </span>
                                {isOngoing(exp.end_date) && (
                                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                        Current
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
                <SectionHeading eyebrow="Background" title="Education & certifications" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-5">
                            <FaGraduationCap className="text-blue-400" />
                            Education
                        </h3>
                        <div className="space-y-5">
                            {education.education.map((edu) => (
                                <div
                                    key={`${edu.school}-${edu.degree}`}
                                    className="pl-4 border-l-2 border-zinc-800"
                                >
                                    <div className="text-xs text-zinc-500 mb-1">
                                        {new Date(
                                            edu.start_date,
                                        ).getFullYear()}{" "}
                                        –{" "}
                                        {edu.end_date
                                            ? new Date(
                                                  edu.end_date,
                                              ).getFullYear()
                                            : "Present"}
                                    </div>
                                    <div className="text-white font-medium">
                                        {edu.degree}
                                    </div>
                                    <div className="text-sm text-zinc-400">
                                        {edu.school}
                                    </div>
                                    <div className="text-sm text-blue-400/80 mt-0.5">
                                        {edu.field}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-400 mb-5">
                            <FaCertificate className="text-blue-400" />
                            Certifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {education.certification.map((cert) => (
                                <div
                                    key={cert.name}
                                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
                                >
                                    <div className="text-white text-sm font-medium mb-1">
                                        {cert.name}
                                    </div>
                                    <div className="text-xs text-zinc-500">
                                        {cert.organization}
                                    </div>
                                    <div className="text-xs text-zinc-600 mt-2">
                                        {formatDate(cert.date)}
                                        {cert.grade && ` · ${cert.grade}/100`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
                <SectionHeading
                    eyebrow="Skills"
                    title="Core competencies"
                    action={
                        <ViewAllLink to="/skills">
                            <FaStar className="h-3 w-3" /> View all
                        </ViewAllLink>
                    }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-sm font-medium">
                                    {skill.name}
                                </span>
                                <span className="text-xs text-zinc-500">
                                    {skill.percentage}%
                                </span>
                            </div>
                            <ProgressBar value={skill.percentage} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech stack */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
                <SectionHeading eyebrow="Toolkit" title="Technologies I use" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <TechColumn
                        title="Languages"
                        items={data.programming_languages.programming_language}
                        to="/languages"
                    />
                    <TechColumn
                        title="Frameworks"
                        items={data.frameworks.framework}
                        to="/frameworks"
                    />
                    <TechColumn
                        title="Tools"
                        items={data.tools.tool}
                        to="/tools"
                    />
                </div>
            </section>

            {/* Projects */}
            <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
                <SectionHeading
                    eyebrow="Portfolio"
                    title="Featured projects"
                    action={
                        <ViewAllLink to="/projects">
                            <FaBook className="h-3 w-3" /> View all
                        </ViewAllLink>
                    }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {featuredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors flex flex-col"
                        >
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <h3 className="text-white font-medium">
                                    {project.title}
                                </h3>
                                <span className="text-xs text-zinc-500 shrink-0">
                                    {project.progress_percentage}%
                                </span>
                            </div>
                            <p className="text-sm text-zinc-500 line-clamp-3 mb-4 flex-1">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {project.languages?.slice(0, 3).map((lang) => (
                                    <span
                                        key={lang}
                                        className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
