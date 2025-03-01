import React, { useState, useEffect } from "react";
import GitActivity from "./GitActivity";
import Logo from "../assets/logo.png";

interface Contact {
    contact_id: number;
    contact_name: string;
    contact_value: string;
}

interface Socials {
    social_id: number;
    social_name: string;
    social_url: string;
}

interface Skill {
    skill_name: string;
    skill_percentage: number;
}

interface Project {
    project_id: number;
    title: string;
    description: string;
    git_url: string;
    languages: string[];
    tools: string[];
    frameworks: string[];
    image_url: string[];
    caption: string[];
    alt: string[];
    links: string[];
}

interface Language {
    id: number;
    name: string;
    percentage: number;
    favorite: boolean;
    learning: boolean;
    image_url: string;
    caption: string;
    alt: string;
}

interface Framework {
    id: number;
    name: string;
    image_url: string;
    caption?: string;
    alt_text?: string;
}

interface Tool {
    id: number;
    name: string;
}

interface Work {
    company_name: string;
    position: string;
    description: string;
    start_date: string;
    end_date?: string;
}

interface Education {
    school: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
}

interface Certification {
    name: string;
    date: string;
    grade: string;
    organization: string;
}

const App: React.FC = () => {
    // 1. State for your data
    const [loading, setLoading] = useState<boolean>(true);
    const [contact, setContact] = useState<Contact[]>([]);
    const [socials, setSocials] = useState<Socials[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [frameworks, setFrameworks] = useState<Framework[]>([]);
    const [tools, setTools] = useState<Tool[]>([]);
    const [experience, setExperience] = useState<Work[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [activeSection, setActiveSection] = useState<string>("about");

    // 2. Define your data-fetching functions
    const fetchContact = async () => {
        const response = await fetch("http://localhost:8000/personal/contacts");
        return response.json();
    };

    const fetchSocials = async () => {
        const response = await fetch("http://localhost:8000/personal/socials");
        return response.json();
    };

    const fetchSkills = async () => {
        const response = await fetch("http://localhost:8000/skills");
        return response.json();
    };

    const fetchProjects = async () => {
        const response = await fetch("http://localhost:8000/projects");
        return response.json();
    };

    const fetchLanguages = async () => {
        const response = await fetch(
            "http://localhost:8000/programming_languages",
        );
        return response.json();
    };

    const fetchFrameworks = async () => {
        const response = await fetch("http://localhost:8000/frameworks");
        return response.json();
    };

    const fetchExperience = async () => {
        const response = await fetch("http://localhost:8000/personal/work");
        return response.json();
    };

    const fetchTools = async () => {
        const response = await fetch("http://localhost:8000/tools");
        return response.json();
    };

    const fetchEducation = async () => {
        const response = await fetch(
            "http://localhost:8000/personal/educations",
        );
        return response.json();
    };

    const fetchCertifications = async () => {
        const response = await fetch(
            "http://localhost:8000/personal/certifications",
        );
        return response.json();
    };

    // 3. Use useEffect to call all fetches once the component mounts
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Run all requests in parallel with Promise.all
                const [
                    contactData,
                    socialsData,
                    skillsData,
                    projectsData,
                    languagesData,
                    frameworksData,
                    toolsData,
                    experienceData,
                    educationData,
                    certificationsData,
                ] = await Promise.all([
                    fetchContact(),
                    fetchSocials(),
                    fetchSkills(),
                    fetchProjects(),
                    fetchLanguages(),
                    fetchFrameworks(),
                    fetchTools(),
                    fetchExperience(),
                    fetchEducation(),
                    fetchCertifications(),
                ]);

                // Update the state with the fetched data
                setContact(contactData);
                setSocials(socialsData);
                setSkills(skillsData);
                setProjects(projectsData);
                setLanguages(languagesData);
                setFrameworks(frameworksData);
                setTools(toolsData);
                setExperience(experienceData);
                setEducation(educationData);
                setCertifications(certificationsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // Done loading regardless of success or failure
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    function getLanguageById(id: number): Language | undefined {
        return languages.find((lang) => lang.id === id);
    }

    function getLanguageNameById(id: number): string {
        const language = getLanguageById(id);
        return language ? language.name : `Unknown Language (ID: ${id})`;
    }

    function getFrameworkById(id: number): Framework | undefined {
        return frameworks.find((framework) => framework.id === id);
    }

    function getFrameworkNameById(id: number): string {
        const framework = getFrameworkById(id);
        return framework ? framework.name : `Unknown Framework (ID: ${id})`;
    }

    function getToolById(id: number): Tool | undefined {
        return tools.find((tool) => tool.id === id);
    }

    function getToolNameById(id: number): string {
        const tool = getToolById(id);
        return tool ? tool.name : `Unknown Tool (ID: ${id})`;
    }

    function getSocialById(id: number): Socials | undefined {
        return socials.find((social) => social.social_id === id);
    }

    function getSocialNameById(id: number): string {
        const social = getSocialById(id);
        return social ? social.social_name : `Unknown Social (ID: ${id})`;
    }

    // 4. If still loading, render a loading indicator
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-blue-400">
                        Loading portfolio...
                    </h2>
                </div>
            </div>
        );
    }

    const navItems = [
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "experience", label: "Experience" },
        { id: "education", label: "Education" },
        { id: "certifications", label: "Certifications" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-800 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-blue-400">
                                Noam Favier
                            </span>
                            <span className="ml-2 px-2 py-1 rounded-md bg-blue-900 text-blue-300 text-xs">
                                Dev
                            </span>
                        </div>
                        <div className="hidden md:flex space-x-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        activeSection === item.id
                                            ? "bg-blue-900 text-white"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="md:hidden">
                            <button className="text-gray-300 hover:text-white">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                {/* Hero Section */}
                <header className="mt-8 mb-12 md:mt-16 md:mb-24 py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 rounded-full border-4 border-blue-500 mb-6 overflow-hidden bg-gray-800 flex items-center justify-center">
                        <img
                            src={Logo}
                            alt="Noam Favier"
                            className="w-32 h-32 object-cover"
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        Noam Favier
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-6">
                        Junior Software Engineer & AI Enthusiast
                    </p>
                    <div className="flex space-x-4">
                        {socials.map((item, index) => (
                            <a
                                key={index}
                                href={item.social_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-900 text-gray-300 hover:text-white flex items-center justify-center transition-colors duration-200"
                            >
                                <span className="">
                                    {item.social_name.charAt(0).toUpperCase()}
                                </span>
                            </a>
                        ))}
                    </div>
                </header>

                {/* About Section */}
                {activeSection === "about" && (
                    <section className="py-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                            <span className="mr-2">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>
                            About Me
                        </h2>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                            <p className="text-gray-300 mb-4">
                                I'm a passionate software engineer specializing
                                in AI and web development. With a strong
                                foundation in modern technologies, I create
                                efficient, scalable, and user-friendly
                                applications.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        Contact Info
                                    </h3>
                                    <ul className="space-y-2">
                                        {contact.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center"
                                            >
                                                <span className="w-24 text-gray-400">
                                                    {item.contact_name}:
                                                </span>
                                                <span className="text-blue-300">
                                                    {item.contact_value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        Hobbies & Interests
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Coding",
                                            "AI Research",
                                            "Open Source",
                                            "Reading",
                                        ].map((hobby, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                                            >
                                                {hobby}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {activeSection === "skills" && (
                    <section className="py-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                            <span className="mr-2">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </span>
                            Skills
                        </h2>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">
                                        Technical Skills
                                    </h3>
                                    <div className="space-y-4">
                                        {skills
                                            .slice() // Make a shallow copy to avoid mutating the original state
                                            .sort(
                                                (a, b) =>
                                                    b.skill_percentage -
                                                    a.skill_percentage,
                                            )
                                            .map((skill, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-gray-300">
                                                            {skill.skill_name}
                                                        </span>
                                                        <span className="text-blue-400">
                                                            {
                                                                skill.skill_percentage
                                                            }
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                                                            style={{
                                                                width: `${skill.skill_percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">
                                        Programming Languages
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {languages
                                            .slice() // Make a shallow copy to avoid mutating the original state
                                            .sort(
                                                (a, b) =>
                                                    b.percentage - a.percentage,
                                            ) // Sort by percentage (highest first)
                                            .map((lang, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-gray-700 rounded-lg p-4 flex flex-col items-center relative overflow-hidden"
                                                >
                                                    {lang.favorite && (
                                                        <span className="absolute top-0 right-0 bg-yellow-500 text-xs text-gray-900 px-1 rounded-bl">
                                                            ★
                                                        </span>
                                                    )}
                                                    {lang.learning && (
                                                        <span className="absolute top-0 left-0 bg-green-500 text-xs text-gray-900 px-1 rounded-br">
                                                            New
                                                        </span>
                                                    )}
                                                    <span className="text-lg font-medium text-white mb-2">
                                                        {lang.name}
                                                    </span>
                                                    <div className="w-full bg-gray-600 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-400 h-2 rounded-full"
                                                            style={{
                                                                width: `${lang.percentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="mt-1 text-xs text-gray-400">
                                                        {lang.percentage}%
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {activeSection === "projects" && (
                    <section className="py-8 max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                            <span className="mr-2">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </span>
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 flex flex-col h-full hover:border-blue-500 transition-colors duration-300"
                                >
                                    <div className="h-48 bg-gray-700 relative">
                                        {project.image_url &&
                                        project.image_url[0] ? (
                                            <img
                                                src={project.image_url[0]}
                                                alt={
                                                    project.alt
                                                        ? project.alt[0]
                                                        : project.title
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                                                <svg
                                                    className="w-16 h-16 text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex-grow">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.languages &&
                                                project.languages.map(
                                                    (lang, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded"
                                                        >
                                                            {getLanguageNameById(
                                                                lang.id,
                                                            )
                                                                ? getLanguageNameById(
                                                                      lang.id,
                                                                  )
                                                                : `Unknown Language (ID: ${lang.id})`}
                                                        </span>
                                                    ),
                                                )}
                                            {project.frameworks &&
                                                project.frameworks.map(
                                                    (framework, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-purple-900 text-purple-200 text-xs rounded"
                                                        >
                                                            {getFrameworkNameById(
                                                                framework.id,
                                                            )
                                                                ? getFrameworkNameById(
                                                                      framework.id,
                                                                  )
                                                                : `Unknown Framework (ID: ${framework.id})`}
                                                        </span>
                                                    ),
                                                )}
                                            {project.tools &&
                                                project.tools.map(
                                                    (tool, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-green-900 text-green-200 text-xs rounded"
                                                        >
                                                            {getToolNameById(
                                                                tool.id,
                                                            )
                                                                ? getToolNameById(
                                                                      tool.id,
                                                                  )
                                                                : `Unknown Tool (ID: ${tool.id})`}
                                                        </span>
                                                    ),
                                                )}
                                        </div>
                                    </div>
                                    <div className="px-5 pb-5 mt-auto">
                                        <a
                                            href={project.git_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            View on GitHub
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                {activeSection === "experience" && (
                    <section className="py-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                            <span className="mr-2">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                            Work Experience
                        </h2>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                            <div className="relative pl-8 border-l-2 border-blue-500 space-y-10">
                                {experience.map((job, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-800 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                {job.position}
                                            </h3>
                                            <div className="flex items-center mb-2">
                                                <span className="text-blue-400">
                                                    {job.company_name}
                                                </span>
                                                <span className="mx-2 text-gray-500">
                                                    •
                                                </span>
                                                <span className="text-gray-400 text-sm">
                                                    {job.start_date} -{" "}
                                                    {job.end_date
                                                        ? job.end_date
                                                        : "Present"}
                                                </span>
                                            </div>
                                            <p className="text-gray-300">
                                                {job.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {activeSection === "education" && (
                    <section className="py-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                            <span className="mr-2">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                    />
                                </svg>
                            </span>
                            Education
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {education.map((edu, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white">
                                            {edu.degree}
                                        </h3>
                                        <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">
                                            {edu.start_date} - {edu.end_date}
                                        </span>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <svg
                                            className="w-5 h-5 text-gray-400 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <span className="text-gray-300">
                                            {edu.school}
                                        </span>
                                    </div>
                                    <p className="text-gray-400">
                                        <span className="text-blue-400">
                                            Field of Study:
                                        </span>{" "}
                                        {edu.field_of_study}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {activeSection === "certifications" && (
                    <section className="py-8 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center">
                            <span className="mr-2">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </span>
                            Certifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {certifications.map((cert, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white">
                                            {cert.name}
                                        </h3>
                                        <span className="bg-green-900 text-green-200 text-xs px-2 py-1 rounded">
                                            {cert.date}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 mb-3">
                                        {cert.organization}
                                    </p>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-400 mr-1">
                                            Grade:
                                        </span>
                                        <span className="text-sm text-blue-400 font-medium">
                                            {cert.grade}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Git Activity */}
                <GitActivity />
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-gray-400">
                                © {new Date().getFullYear()} Noam Favier. All
                                rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            {socials.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 text-center text-gray-500 text-sm">
                        <p>Made with ❤️ by Noam Favier</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
