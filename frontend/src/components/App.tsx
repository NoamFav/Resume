import React from "react";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <header className="bg-blue-500 text-white text-center py-6">
                    <h1 className="text-3xl font-bold">Noam Favier</h1>
                    <p className="text-lg">
                        Junior Software Engineer & AI Enthusiast
                    </p>
                </header>
                <main className="p-6">
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            About Me
                        </h2>
                        <p className="text-gray-600">
                            Passionate about coding, AI, and creating innovative
                            solutions to global challenges.
                        </p>
                    </section>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Skills
                        </h2>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>Java, Python, Rust, C++, Swift, Kotlin</li>
                            <li>
                                Game Development, AI, Web Development, Mobile
                                Apps
                            </li>
                            <li>Neovim Configuration & Tool Optimization</li>
                        </ul>
                    </section>
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Projects
                        </h2>
                        <ul className="space-y-4 text-gray-600">
                            <li>
                                <strong>ShadowedHunter:</strong> Immersive Java
                                game with a rich storyline.
                            </li>
                            <li>
                                <strong>Nvim-config:</strong> Enhanced Neovim
                                setup using Lazy and Mason.
                            </li>
                            <li>
                                <strong>PyNexus:</strong> Python learning app in
                                game format (deprecated).
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Education
                        </h2>
                        <p className="text-gray-600">
                            University of Maastricht - Data Science and AI
                            Student
                        </p>
                    </section>
                </main>
                <footer className="bg-gray-800 text-white text-center py-4">
                    <p>
                        Connect with me on{" "}
                        <a href="#" className="underline text-blue-400">
                            LinkedIn
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;
