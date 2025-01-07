import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>ABDM Debug Console</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/debug/register-patient">Register a Dummy Patient</Link>
                    </li>
                    <li>
                        <Link to="/debug/view-patient">View a Dummy Patient</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
