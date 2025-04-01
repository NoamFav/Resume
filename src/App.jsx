
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
   return (
        <Router>
            <div>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
