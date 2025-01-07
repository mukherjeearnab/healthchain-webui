import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>ABDM Master Console</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/master/view-phr">View Patient PHR</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
