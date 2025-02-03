import React, { useState } from "react";

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
    const [loading, setLoading] = useState<boolean>(true);
    const [contact, setContact] = useState<Contact[]>([]);
    const [socials, setSocials] = useState<Socials[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);

    const fetchContact = async () => {
        const response = await fetch("http://localhost:8000/contact");
        const data = await response.json();
        setContact(data);
    };

    const fetchSocials = async () => {
        const response = await fetch("http://localhost:8000/socials");
        const data = await response.json();
        setSocials(data);
    };

    const fetchSkills = async () => {
        const response = await fetch("http://localhost:8000/skills");
        const data = await response.json();
        setSkills(data);
    };

    const fetchProjects = async () => {
        const response = await fetch("http://localhost:8000/projects");
        const data = await response.json();
        setProjects(data);
    };

    const fetchLanguages = async () => {
        const response = await fetch("http://localhost:8000/languages");
        const data = await response.json();
        setLanguages(data);
    };

    const fetchExperience = async () => {
        const response = await fetch("http://localhost:8000/experience");
        const data = await response.json();
        setExperience(data);
    };

    const fetchEducation = async () => {
        const response = await fetch("http://localhost:8000/education");
        const data = await response.json();
        setEducation(data);
    };

    const fetchCertifications = async () => {
        const response = await fetch("http://localhost:8000/certifications");
        const data = await response.json();
        setCertifications(data);
    };

    if (loading) {
        return <div className="">Loading...</div>;
    }

    return (
        <div className="">
            <header className="">
                <h1 className="">Noam Favier</h1>
                <p className="">Junior Software Engineer & AI Enthusiast</p>

                <section className="">
                    <h2 className="">Contact</h2>
                    <a href="" className="">
                        <img src="" alt="Email" />
                    </a>
                    <a href="" className="">
                        <img src="" alt="LinkedIn" />
                    </a>
                    <a href="" className="">
                        <img src="" alt="GitHub" />
                    </a>
                </section>
            </header>

            <section className="">
                <h2 className="">My stack</h2>
            </section>

            <main className="">
                <section className="">
                    <h2 className="">About</h2>
                    <p className="">Placeholder</p>
                </section>

                <section className="">
                    <h2 className="">Skills</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Main Projects</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Main Programming Languages</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Experience</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>
                <section className="">
                    <h2 className="">Education</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>

                <section>
                    <h2 className="">Certifications</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Recent Git Activity</h2>
                    <ul className="">
                        <li className=""></li>
                    </ul>
                </section>

                <section className="">
                    <h2 className="">Hobbies</h2>
                    <ul className="">
                        <li className=""></li>
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
