import { useEffect } from "react";
import {
    HashRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Languages from "./pages/Languages";
import Frameworks from "./pages/Frameworks";
import Tools from "./pages/Tools";
import { useData } from "./lib/useData";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    const { data } = useData(["contact"]);

    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/languages" element={<Languages />} />
                        <Route path="/frameworks" element={<Frameworks />} />
                        <Route path="/tools" element={<Tools />} />
                    </Routes>
                </main>
                <Footer contact={data?.contact} />
            </div>
        </Router>
    );
}

export default App;
