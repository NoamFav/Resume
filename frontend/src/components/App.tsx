import React, { useState, useEffect } from "react";

interface Contact {
    contact_name: string;
    contact_value: string;
}

interface Socials {
    name: string;
    url: string;
}

interface Skill {
    name: string;
    percentage: number;
}

interface Project {
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
    name: string;
    percentage: number;
    favorite: boolean;
    learning: boolean;
    image_url: string;
    caption: string;
    alt: string;
}

interface Experience {
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
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
    const [experience, setExperience] = useState<Experience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);

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

    const fetchExperience = async () => {
        const response = await fetch("http://localhost:8000/personal/work");
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
                    experienceData,
                    educationData,
                    certificationsData,
                ] = await Promise.all([
                    fetchContact(),
                    fetchSocials(),
                    fetchSkills(),
                    fetchProjects(),
                    fetchLanguages(),
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

    // 4. If still loading, render a "Loading..." indicator
    if (loading) {
        return <div className="">Loading...</div>;
    }

    // 5. Render your data once it has loaded
    return (
        <div className="">
            <header className="">
                <h1 className="">Noam Favier</h1>
                <p className="">Junior Software Engineer & AI Enthusiast</p>

                <section className="">
                    <h2 className="">Contact</h2>
                    <ul>
                        {contact.map((item, index) => (
                            <li key={index}>
                                <strong>{item.contact_name}:</strong>{" "}
                                {item.contact_value}
                            </li>
                        ))}
                    </ul>
                </section>
            </header>

            <section className="">
                <h2 className="">Socials</h2>
                <ul>
                    {socials.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="">
                <h2 className="">Skills</h2>
                <ul className="">
                    {skills.map((skill, i) => (
                        <li key={i}>
                            {skill.name} - {skill.percentage}%
                        </li>
                    ))}
                </ul>
            </section>

            <main className="">
                <section className="">
                    <h2 className="">Projects</h2>
                    <ul className="">
                        {projects.map((project, i) => (
                            <li key={i}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <p>
                                    <strong>Repo:</strong>{" "}
                                    <a href={project.git_url}>
                                        {project.git_url}
                                    </a>
                                </p>
                                {/* You can decide how to render the arrays: languages, tools, etc. */}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Languages</h2>
                    <ul className="">
                        {languages.map((lang, i) => (
                            <li key={i}>
                                <strong>{lang.name}</strong> - {lang.percentage}
                                %{lang.favorite && <span> (Favorite!)</span>}
                                {lang.learning && (
                                    <span> (Currently Learning!)</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Experience</h2>
                    <ul className="">
                        {experience.map((job, i) => (
                            <li key={i}>
                                <strong>
                                    {job.company} - {job.position}
                                </strong>
                                <p>
                                    {job.start_date} to {job.end_date}
                                </p>
                                <p>{job.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Education</h2>
                    <ul className="">
                        {education.map((edu, i) => (
                            <li key={i}>
                                <strong>{edu.school}</strong> - {edu.degree} in{" "}
                                {edu.field_of_study}
                                <p>
                                    {edu.start_date} to {edu.end_date}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="">Certifications</h2>
                    <ul className="">
                        {certifications.map((cert, i) => (
                            <li key={i}>
                                <strong>{cert.name}</strong>
                                <p>
                                    {cert.date} - {cert.organization} (Grade:{" "}
                                    {cert.grade})
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Recent Git Activity</h2>
                    <ul className="">
                        <li className="">
                            Placeholder for future Git activity
                        </li>
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Hobbies</h2>
                    <ul className="">
                        <li className="">Placeholder for hobbies</li>
                    </ul>
                </section>
            </main>

            <footer className="">
                <p className="">Made with ❤️ by Noam Favier</p>
            </footer>
        </div>
    );
};

export default App;
