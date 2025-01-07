// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/SectionPages/Home";
import ABDMHome from "./components/SectionPages/ABDM";
import PatientHome from "./components/SectionPages/Patient";
import HospitalHome from "./components/SectionPages/Hospital";
import DebugHome from "./components/SectionPages/Debug";

import ExternalPHR from "./components/ExternalPHR";

import PatientPHR from "./components/PatientPHR";
import PatientConsent from "./components/PatientConsent";
import PatientLogs from "./components/PatientLogs";

import ReportsView from "./components/ReportsView";
import ReportsGeneration from "./components/ReportGeneration";

import PatientDemographics from "./components/PatientDemographics";
import PatientRegistration from "./components/PatientRegistration";

function App() {
    return (
        <Router>
            <div className="App">
                <Home />
                <Routes>
                    <Route path="/" component={<Home />} />
                    <Route path="/master" element={<ABDMHome />} />
                    <Route path="/patient" element={<PatientHome />} />
                    <Route path="/hospital" element={<HospitalHome />} />
                    <Route path="/debug" element={<DebugHome />} />

                    <Route path="/master/view-phr" element={<ExternalPHR />} />

                    <Route path="/patient/view-phr" element={<PatientPHR />} />
                    {/* <Route path="/patient/grant-consent" element={<PatientConsent />} /> */}
                    <Route path="/patient/view-logs" element={<PatientLogs />} />

                    <Route path="/hospital/view-emr" element={<ReportsView />} />
                    <Route path="/hospital/gen-emr" element={<ReportsGeneration />} />

                    <Route path="/debug/register-patient" element={<PatientRegistration />} />
                    <Route path="/debug/view-patient" element={<PatientDemographics />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
