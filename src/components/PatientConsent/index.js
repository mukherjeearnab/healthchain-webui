import React, { useState } from "react";

import "./index.css";
import "../PatientLogs/index.css"; // Make sure to import the appropriate CSS file

const ConsentManagement = () => {
    const [aadharID, setAadharID] = useState(""); // State to store Aadhar ID
    const [candidateID, setCandidateID] = useState(""); // State to store Candidate ID
    const [loading, setLoading] = useState(false); // Loading state for actions
    const [error, setError] = useState(null); // Error state for actions
    const [message, setMessage] = useState(""); // Success or error messages

    // Handle AadharID input change
    const handleAadharIDChange = (e) => {
        setAadharID(e.target.value);
    };

    // Handle CandidateID input change
    const handleCandidateIDChange = (e) => {
        setCandidateID(e.target.value);
    };

    // Function to grant consent
    const grantConsent = async () => {
        if (!aadharID || !candidateID) {
            setError("Please enter both Your ABHA ID and Recipient's ABDM ID");
            return;
        }

        setLoading(true);
        setError(null); // Reset error before starting action
        setMessage(""); // Clear previous messages

        try {
            const response = await fetch(`http://localhost:23121/consent/allow/${aadharID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    Candidate: candidateID,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to grant consent");
            }

            console.log(response);

            const data = await response.text();
            setMessage("Consent granted successfully");
            console.log(data);
        } catch (err) {
            setError(err.message); // Handle fetch errors
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Function to revoke consent
    const revokeConsent = async () => {
        if (!aadharID || !candidateID) {
            setError("Please enter both Your ABHA ID and Recipient's ABDM ID");
            return;
        }

        setLoading(true);
        setError(null); // Reset error before starting action
        setMessage(""); // Clear previous messages

        try {
            const response = await fetch(`http://localhost:23121/consent/revoke/${aadharID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    Candidate: candidateID,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to revoke consent");
            }

            const data = await response.text();
            setMessage("Consent revoked successfully");
            console.log(data);
        } catch (err) {
            setError(err.message); // Handle fetch errors
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="consent-management-container">
            <h2>Consent Management</h2>

            {/* Input fields for Aadhar ID and Candidate ID */}
            <div className="input-section">
                <label htmlFor="aadharID">Enter Your ABHA ID:</label>
                <input
                    type="text"
                    id="aadharID"
                    value={aadharID}
                    onChange={handleAadharIDChange}
                    placeholder="Enter ABHA ID"
                />

                <label htmlFor="candidateID">Enter Recipient's ABMD ID:</label>
                <input
                    type="text"
                    id="candidateID"
                    value={candidateID}
                    onChange={handleCandidateIDChange}
                    placeholder="Enter ABDM ID"
                />
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Success or Information Message */}
            {message && <div className="success-message">{message}</div>}

            {/* Buttons for granting and revoking consent */}
            <div className="action-buttons">
                <button onClick={grantConsent} disabled={loading}>
                    {loading ? "Processing..." : "Grant Consent"}
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="revoke-consent-button" onClick={revokeConsent} disabled={loading}>
                    {loading ? "Processing..." : "Revoke Consent"}
                </button>
            </div>
        </div>
    );
};

export default ConsentManagement;
