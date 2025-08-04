import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Language from "./components/Language";
import Skills from "./components/Skills";
import Frameworks from "./components/Frameworks";
import Tools from "./components/Tools";
import Blog from "./components/Blog";

function App() {
    return (
        <Router>
            <div>
                <div>
                    <main>
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/languages" element={<Language />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route
                                path="/frameworks"
                                element={<Frameworks />}
                            />
                            <Route path="/tools" element={<Tools />} />
                            <Route path="/blog" element={<Blog />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
