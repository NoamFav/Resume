import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";

function App() {
    return (
        <Router>
            <div>
                <div>
                    <main>
                        <Routes>
                            <Route path="/" element={<Hero />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
