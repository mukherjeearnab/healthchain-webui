import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>HealthChain-ABDM</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/master">ABDM Master Console</Link>
                    </li>
                    <li>
                        <Link to="/patient">Patient Section</Link>
                    </li>
                    <li>
                        <Link to="/hospital">Hospital</Link>
                    </li>
                    <li>
                        <Link to="/debug">Debug Console</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
