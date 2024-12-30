import React, { useEffect, useState } from "react";

interface Language {
    id: number;
    name: string;
    percentage: number;
    image_url: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
}

const App: React.FC = () => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const languagesResponse = await fetch(
                    "http://localhost:8000/programming_languages",
                );
                const languagesData = await languagesResponse.json();

                const projectsResponse = await fetch(
                    "http://localhost:8000/projects",
                );
                const projectsData = await projectsResponse.json();

                setLanguages(languagesData);
                setProjects(projectsData.slice(0, 3));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
            <header className="bg-blue-600 text-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-6"></div>
                <h1 className="text-4xl font-bold mb-2">Noam Favier</h1>
                <p className="text-lg">
                    Junior Software Engineer & AI Enthusiast
                </p>
            </header>

            <main className="mt-10 space-y-10">
                {/* Programming Languages */}
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        My Tech Stack
                    </h2>
                    <div className="overflow-hidden">
                        <div className="flex items-center gap-8 animate-marquee">
                            {languages
                                .concat(languages)
                                .map((language, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 flex flex-col items-center justify-center"
                                    >
                                        <img
                                            src={language.image_url}
                                            alt={language.name}
                                            className="w-16 h-16 object-contain"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>

                {/* Featured Projects */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">
                        Featured Projects
                    </h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
