import React, { useState } from "react";
import "../PatientLogs/index.css"; // Ensure the correct CSS file is imported

const RequestConsent = () => {
    const [aadharID, setAadharID] = useState(""); // State for Aadhar ID
    const [candidateID, setCandidateID] = useState(""); // State for Candidate ID
    const [comment, setComment] = useState(""); // State for Candidate ID
    const [loading, setLoading] = useState(false); // Loading state for the request
    const [error, setError] = useState(null); // Error state for handling errors
    const [message, setMessage] = useState(""); // Success or informational message

    // Handle input changes
    const handleAadharIDChange = (e) => {
        setAadharID(e.target.value);
    };

    const handleCandidateIDChange = (e) => {
        setCandidateID(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Function to make the request for consent
    const requestConsent = async () => {
        if (!aadharID || !candidateID) {
            setError("Please enter both Aadhar ID and Candidate ID");
            return;
        }

        setLoading(true);
        setError(null); // Reset errors before starting
        setMessage(""); // Reset any previous messages

        try {
            const response = await fetch(`http://localhost:23121/consent/request/${aadharID}`, {
                method: "POST",
                body: {
                    Candidate: candidateID,
                    Message: comment,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to request consent");
            }

            const data = await response.json();
            setMessage("Consent request sent successfully!");
            console.log(data);
        } catch (err) {
            setError(err.message); // Handle any error
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
        <div className="request-consent-container">
            <h2>Request Consent from Patient ABHA ID</h2>

            {/* Input Fields */}
            <div className="input-section">
                <label htmlFor="candidateID">Enter Your ABDM ID:</label>
                <input
                    type="text"
                    id="candidateID"
                    value={candidateID}
                    onChange={handleCandidateIDChange}
                    placeholder="Enter ABDM ID"
                />

                <label htmlFor="aadharID">Enter Patient's ABHA ID:</label>
                <input
                    type="text"
                    id="aadharID"
                    value={aadharID}
                    onChange={handleAadharIDChange}
                    placeholder="Enter ABHA ID"
                />

                <label htmlFor="candidateID">Request Message / Comment:</label>
                <input
                    type="text"
                    id="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Enter Comment"
                />
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Success or Information Message */}
            {message && <div className="success-message">{message}</div>}

            {/* Button to request consent */}
            <div className="action-buttons">
                <button onClick={requestConsent} disabled={loading}>
                    {loading ? "Processing..." : "Request Consent"}
                </button>
            </div>
        </div>
    );
};

export default RequestConsent;
