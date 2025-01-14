import React, { useState } from "react";
import sha256 from "sha256";

import "../ReportsView/index.css";

const PatientReports = () => {
    const [aadhaarID, setAadhaarID] = useState(""); // To store Aadhaar ID input
    const [readBy, setReadBy] = useState(""); // To store Aadhaar ID input
    const [PHR, setPHR] = useState(null); // To store fetched medical records
    // const [integrities, setIntegrities] = useState([]); // To store
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // To store errors during fetch

    // Function to fetch medical records by Aadhaar ID
    const fetchMedicalRecords = async () => {
        if (!aadhaarID) {
            setError("Please enter an ABHA ID");
            return;
        }

        console.log("Fetching");

        setLoading(true);
        setError(null); // Reset error before starting new fetch

        try {
            setPHR(null);
            const consent_res = await fetch(`http://localhost:23121/consent/check/${aadhaarID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    Candidate: readBy,
                }),
            });
            const { concentGranted } = await consent_res.json();

            if (!concentGranted)
                throw new Error(`ABDM ID ${readBy} does not have consent to access EMR of ${aadhaarID}!`);

            const response = await fetch(`http://localhost:23121/phi/assemble/${aadhaarID}/${readBy}`); // Update with actual API endpoint

            if (!response.ok) {
                throw new Error("No reports found for the provided ABHA ID");
            }

            const data = await response.json();
            console.log(data);
            const integ = {};
            for (let i = 0; i < data.StateLocations.length; i++) {
                const response = await fetch(
                    `http://localhost:11133/contract/emr/get/${aadhaarID}/${data.StateLocations[i]}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "x-access-username": "admin",
                        },
                    }
                );
                integ[data.StateLocations[i]] = await response.json();
                console.log(integ);
            }
            let state_index = 0;
            let last_state = null;
            for (let i = 0; i < data.EMR.length; i++) {
                if (data.EMR[i].local !== last_state) {
                    last_state = data.EMR[i].local;
                    state_index = 0;
                }
                console.log(integ);
                const resp = integ[data.EMR[i].local];
                data.EMR[i]["integrity_hash"] = resp.EMRs[state_index];
                state_index += 1;
                const color =
                    sha256(JSON.stringify(data.EMR[i].record)) === data.EMR[i].integrity_hash ? "#4caf50" : "#e57373";
                data.EMR[i]["integrity_style"] = { color };
            }
            // setIntegrities(integ);
            setPHR(data);
            console.log(PHR);
        } catch (error) {
            setError(error.message); // Set error if fetch fails
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="patient-reports">
            <h2>Patient Health Records</h2>
            {/* Aadhaar ID input */}
            <div className="input-section">
                <label htmlFor="aadhaarID">Enter Your ABDM (Doctors/ Admin) ID:</label>
                <input
                    type="text"
                    id="readBy"
                    value={readBy}
                    onChange={(e) => setReadBy(e.target.value)} // Update Aadhaar ID on input change
                    placeholder="Enter ABDM ID"
                />
                <label htmlFor="aadhaarID">Enter Patient ABHA ID:</label>
                <input
                    type="text"
                    id="aadhaarID"
                    value={aadhaarID}
                    onChange={(e) => setAadhaarID(e.target.value)} // Update Aadhaar ID on input change
                    placeholder="Enter ABHA ID"
                />
                <button onClick={fetchMedicalRecords} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Patient Health Records"}
                </button>
            </div>
            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}
            {/* Medical Records Display */}
            {PHR && PHR.EMR && PHR.EMR.length > 0 ? (
                <div>
                    <div className="patient-info">
                        <p>
                            <strong>Name:</strong> {PHR.Name}
                        </p>
                        <p>
                            <strong>Date of Birth:</strong> {new Date(PHR.DoB).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Gender:</strong> {PHR.Gender === 1 ? "Male" : "Female"}
                        </p>
                        <p>
                            <strong>Father's Name:</strong> {PHR.Father}
                        </p>
                        <p>
                            <strong>Mother's Name:</strong> {PHR.Mother}
                        </p>
                        <p>
                            <strong>Phone:</strong> {PHR.Phone}
                        </p>
                        <p>
                            <strong>Address:</strong> {PHR.Address}
                        </p>
                        <p>
                            <strong>Pincode:</strong> {PHR.Pincode}
                        </p>
                    </div>
                    <div className="medical-records">
                        {PHR.EMR.map((record, index) => (
                            <div key={index} className="medical-record">
                                <h4>
                                    Hospital ID: {record.local} @ State: {record.state}
                                </h4>
                                <h4 style={record.integrity_style}>
                                    Integrity:
                                    {sha256(JSON.stringify(record.record)) === record.integrity_hash ? "Pass" : "Fail"}
                                </h4>
                                <h3>
                                    Record {index + 1} - {new Date(record.record.Timestamp).toLocaleString()}
                                </h3>

                                {/* Conditions */}
                                <div>
                                    <strong>Conditions:</strong>
                                    <ul>
                                        {record.record.Conditions.map((condition, idx) => (
                                            <li key={idx}>{condition}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Prescription */}
                                <div>
                                    <strong>Prescription:</strong>
                                    <ul>
                                        {record.record.Prescription.map((medicine, idx) => (
                                            <li key={idx}>{medicine}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Physical Examination */}
                                <div>
                                    <strong>Physical Examination:</strong>
                                    <p>Pulse: {record.record.PhysicalExamination.Pulse}</p>
                                    <p>
                                        Blood Pressure: {record.record.PhysicalExamination.BloodPressure.Sys}/
                                        {record.record.PhysicalExamination.BloodPressure.Dia}
                                    </p>
                                    <p>Weight: {record.record.PhysicalExamination.Weight} kg</p>
                                    <p>Temperature: {record.record.PhysicalExamination.Temperature} °C</p>
                                    <p>SpO2: {record.record.PhysicalExamination.SpO2} %</p>
                                </div>

                                {/* Lab Tests */}
                                <div>
                                    <strong>Lab Tests:</strong>
                                    {record.record.LabTests.length > 0 ? (
                                        <ul>
                                            {record.record.LabTests.map((test, idx) => (
                                                <li key={idx}>
                                                    <p>
                                                        <strong>Test Type:</strong> {test.TestType}
                                                    </p>
                                                    {/* <p>
                                                        <strong>Health Worker ID:</strong> {test.HealthWorkerID}
                                                    </p> */}
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
                </div>
            ) : (
                <div>No medical records found.</div>
            )}
        </div>
    );
};

export default PatientReports;
