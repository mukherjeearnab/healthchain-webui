import React, { useState } from "react";

import "./index.css";

const PatientReports = () => {
    const [aadhaarID, setAadhaarID] = useState(""); // To store Aadhaar ID input
    const [readBy, setReadBy] = useState(""); // To store Aadhaar ID input
    const [medicalRecords, setMedicalRecords] = useState(null); // To store fetched medical records
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // To store errors during fetch

    // Function to fetch medical records by Aadhaar ID
    const fetchMedicalRecords = async () => {
        if (!aadhaarID) {
            setError("Please enter an Aadhaar ID");
            return;
        }

        setLoading(true);
        setError(null); // Reset error before starting new fetch

        try {
            const response = await fetch(`http://localhost:11121/emr/get/${aadhaarID}/${readBy}`); // Update with actual API endpoint

            if (!response.ok) {
                throw new Error("No reports found for the provided Aadhaar ID");
            }

            const data = await response.json();
            setMedicalRecords(data.MedicalRecords); // Save the fetched medical records
        } catch (error) {
            setError(error.message); // Set error if fetch fails
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="patient-reports">
            <h2>Patient Medical Reports</h2>

            {/* Aadhaar ID input */}
            <div className="input-section">
                <label htmlFor="aadhaarID">Enter ABHA ID:</label>
                <input
                    type="text"
                    id="readBy"
                    value={readBy}
                    onChange={(e) => setReadBy(e.target.value)} // Update Aadhaar ID on input change
                    placeholder="Enter ABDM ID"
                />
                <input
                    type="text"
                    id="aadhaarID"
                    value={aadhaarID}
                    onChange={(e) => setAadhaarID(e.target.value)} // Update Aadhaar ID on input change
                    placeholder="Enter ABHA ID"
                />
                <button onClick={fetchMedicalRecords} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Medical Records"}
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Medical Records Display */}
            {medicalRecords && medicalRecords.length > 0 ? (
                <div className="medical-records">
                    {medicalRecords.map((record, index) => (
                        <div key={index} className="medical-record">
                            <h3>
                                Record {index + 1} - {new Date(record.Timestamp).toLocaleString()}
                            </h3>

                            {/* Conditions */}
                            <div>
                                <strong>Conditions:</strong>
                                <ul>
                                    {record.Conditions.map((condition, idx) => (
                                        <li key={idx}>{condition}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Prescription */}
                            <div>
                                <strong>Prescription:</strong>
                                <ul>
                                    {record.Prescription.map((medicine, idx) => (
                                        <li key={idx}>{medicine}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Physical Examination */}
                            <div>
                                <strong>Physical Examination:</strong>
                                <p>Pulse: {record.PhysicalExamination.Pulse}</p>
                                <p>
                                    Blood Pressure: {record.PhysicalExamination.BloodPressure.Sys}/
                                    {record.PhysicalExamination.BloodPressure.Dia}
                                </p>
                                <p>Weight: {record.PhysicalExamination.Weight} kg</p>
                                <p>Temperature: {record.PhysicalExamination.Temperature} °C</p>
                                <p>SpO2: {record.PhysicalExamination.SpO2} %</p>
                            </div>

                            {/* Lab Tests */}
                            <div>
                                <strong>Lab Tests:</strong>
                                {record.LabTests.length > 0 ? (
                                    <ul>
                                        {record.LabTests.map((test, idx) => (
                                            <li key={idx}>
                                                <p>
                                                    <strong>Test Type:</strong> {test.TestType}
                                                </p>
                                                <p>
                                                    <strong>Health Worker ID:</strong> {test.HealthWorkerID}
                                                </p>
                                                <p>
                                                    <strong>Results:</strong> {test.Results}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No lab tests available for this record.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No medical records found.</div>
            )}
        </div>
    );
};

export default PatientReports;
