import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>Hospital Console</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/hospital/view-emr">View Patient EMRs</Link>
                    </li>
                    <li>
                        <Link to="/hospital/gen-emr">Generate Patient EMR</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
