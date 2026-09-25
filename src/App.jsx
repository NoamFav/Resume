import { HashRouter, Route, Routes } from "react-router-dom";
import { SchemeProvider } from "./shell/scheme";
import Shell from "./shell/Shell";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";

// Hash routing: GitHub Pages serves this from /Resume/ with no rewrites.
export default function App() {
    return (
        <HashRouter>
            <SchemeProvider>
                <Shell>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/languages" element={<Inventory key="languages" kind="languages" />} />
                        <Route path="/frameworks" element={<Inventory key="frameworks" kind="frameworks" />} />
                        <Route path="/tools" element={<Inventory key="tools" kind="tools" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Shell>
            </SchemeProvider>
        </HashRouter>
    );
}
