import React, { useState } from "react";

const PatientRegistration = () => {
    const [aadhaarID, setAadhaarID] = useState(""); // To store Aadhaar ID input
    const [patientData, setPatientData] = useState(null); // To store fetched patient data
    const [loading, setLoading] = useState(false); // To manage loading state
    const [error, setError] = useState(null); // To store errors during fetch

    // Function to fetch patient data by Aadhaar ID
    const fetchPatientData = async () => {
        if (!aadhaarID) {
            setError("Please enter an Aadhaar ID");
            return;
        }

        setLoading(true);
        setError(null); // Reset error before starting new fetch

        try {
            const response = await fetch(`http://localhost:23121/phi/get/${aadhaarID}`); // Update with actual API endpoint

            if (!response.ok) {
                throw new Error("No patient found with the provided ABHA ID");
            }

            const data = await response.json();
            setPatientData(data); // Save the fetched patient data
        } catch (error) {
            setError(error.message); // Set error if fetch fails
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="patient-registration">
            <h2>Patient health Information</h2>

            {/* Aadhaar ID input */}
            <div className="input-section">
                <label htmlFor="aadhaarID">Enter ABHA ID:</label>
                <input
                    type="text"
                    id="aadhaarID"
                    value={aadhaarID}
                    onChange={(e) => setAadhaarID(e.target.value)} // Update Aadhaar ID on input change
                    placeholder="Enter ABHA ID"
                />
                <button onClick={fetchPatientData} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Patient Data"}
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Patient Data Display */}
            {patientData && (
                <div className="patient-info">
                    <p>
                        <strong>Name:</strong> {patientData.Name}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong> {new Date(patientData.DoB).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Gender:</strong> {patientData.Gender === 1 ? "Male" : "Female"}
                    </p>
                    <p>
                        <strong>Father's Name:</strong> {patientData.Father}
                    </p>
                    <p>
                        <strong>Mother's Name:</strong> {patientData.Mother}
                    </p>
                    <p>
                        <strong>Phone:</strong> {patientData.Phone}
                    </p>
                    <p>
                        <strong>Address:</strong> {patientData.Address}
                    </p>
                    <p>
                        <strong>Pincode:</strong> {patientData.Pincode}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PatientRegistration;
