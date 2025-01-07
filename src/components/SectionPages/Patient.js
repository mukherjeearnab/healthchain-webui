import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>Patient Console</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/patient/view-phr">View Your PHR</Link>
                    </li>
                    <li>
                        <Link to="/patient/grant-consent">Grant Consent to your PHR</Link>
                    </li>
                    <li>
                        <Link to="/patient/view-logs">View your ABDM Event Logs</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
