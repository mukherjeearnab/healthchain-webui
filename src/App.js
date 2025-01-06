// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PatientRegistrationForm from "./components/PatientRegistrationForm";
import ReportGenerationForm from "./components/ReportGenerationForm";
import PatientView from "./components/PatientView";
import ReportsView from "./components/ReportsView";

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Health Management System</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Patient Registration</Link>
                        </li>
                        <li>
                            <Link to="/phi-view">Patient Details View</Link>
                        </li>
                        <li>
                            <Link to="/report">Report Generation</Link>
                        </li>
                        <li>
                            <Link to="/report-view">Patient Reports View</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<PatientRegistrationForm />} />
                    <Route path="/phi-view" element={<PatientView />} />
                    <Route path="/report" element={<ReportGenerationForm />} />
                    <Route path="/report-view" element={<ReportsView />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
