// src/components/ReportGenerationForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css"; // Importing external CSS file for styling

const ReportGenerationForm = () => {
    const [aadhaarID, setAadhaarID] = useState(""); // To store Aadhaar ID input
    const [formData, setFormData] = useState({
        Timestamp: "",
        DoctorID: "",
        Conditions: [""],
        Prescription: [""],
        PhysicalExamination: {
            Pulse: "",
            BloodPressure: { Sys: "", Dia: "" },
            Weight: "",
            Temperature: "",
            SpO2: "",
        },
        LabTests: [{ TestType: "", HealthWorkerID: "", Results: "" }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePhysicalExaminationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            PhysicalExamination: {
                ...prevData.PhysicalExamination,
                [name]: value,
            },
        }));
    };

    const handleBloodPressureChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            PhysicalExamination: {
                ...prevData.PhysicalExamination,
                BloodPressure: {
                    ...prevData.PhysicalExamination.BloodPressure,
                    [name]: value,
                },
            },
        }));
    };

    const handleArrayChange = (e, arrayName, index) => {
        const { name, value } = e.target;
        const updatedArray = [...formData[arrayName]];
        updatedArray[index][name] = value;
        setFormData((prevData) => ({
            ...prevData,
            [arrayName]: updatedArray,
        }));
    };

    const addCondition = () => {
        setFormData((prevData) => ({
            ...prevData,
            Conditions: [...prevData.Conditions, ""],
        }));
    };

    const removeCondition = (index) => {
        const updatedConditions = formData.Conditions.filter((_, idx) => idx !== index);
        setFormData((prevData) => ({
            ...prevData,
            Conditions: updatedConditions,
        }));
    };

    const addPrescription = () => {
        setFormData((prevData) => ({
            ...prevData,
            Prescription: [...prevData.Prescription, ""],
        }));
    };

    const removePrescription = (index) => {
        const updatedPrescription = formData.Prescription.filter((_, idx) => idx !== index);
        setFormData((prevData) => ({
            ...prevData,
            Prescription: updatedPrescription,
        }));
    };

    const addLabTest = () => {
        setFormData((prevData) => ({
            ...prevData,
            LabTests: [...prevData.LabTests, { TestType: "", HealthWorkerID: "", Results: "" }],
        }));
    };

    const removeLabTest = (index) => {
        const updatedLabTests = formData.LabTests.filter((_, idx) => idx !== index);
        setFormData((prevData) => ({
            ...prevData,
            LabTests: updatedLabTests,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.Timestamp = new Date().valueOf();

        console.log("Medical Report Data:", formData);
        try {
            const res = await fetch(`http://localhost:11121/emr/add-record/${aadhaarID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ Record: formData }),
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            console.log(await res.json());
            alert("Report Generated Successfully!"); // Save response data to state
        } catch (error) {
            alert(error.message); // Save error message to state
        }
    };

    return (
        <div className="form-container">
            <h2>Medical Report Generation</h2>
            <div className="input-section">
                <label htmlFor="aadhaarID">Enter Patient ABHA ID:</label>
                <input
                    type="text"
                    id="aadhaarID"
                    value={aadhaarID}
                    onChange={(e) => setAadhaarID(e.target.value)} // Update Aadhaar ID on input change
                    placeholder="Enter ABHA ID"
                />
            </div>
            <form onSubmit={handleSubmit} className="report-form">
                {/* <div className="input-group">
                    <label htmlFor="Timestamp">Timestamp</label>
                    <input
                        type="number"
                        id="Timestamp"
                        name="Timestamp"
                        value={formData.Timestamp}
                        onChange={handleInputChange}
                        required
                    />
                </div> */}

                <div className="input-group">
                    <label htmlFor="DoctorID">Doctor (ABDM) ID</label>
                    <input
                        type="text"
                        id="DoctorID"
                        name="DoctorID"
                        placeholder="Doctor's ABDM ID"
                        value={formData.DoctorID}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Conditions</label>
                    {formData.Conditions.map((condition, index) => (
                        <div key={index} className="array-item">
                            <input
                                type="text"
                                name={`Conditions[${index}]`}
                                value={condition}
                                placeholder={`Condition ${index + 1}`}
                                onChange={(e) => {
                                    const updatedConditions = [...formData.Conditions];
                                    updatedConditions[index] = e.target.value;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        Conditions: updatedConditions,
                                    }));
                                }}
                                required
                            />
                            <button type="button" onClick={() => removeCondition(index)} className="remove-btn">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addCondition} className="add-btn">
                        Add Condition
                    </button>
                </div>

                <div className="input-group">
                    <label>Prescription</label>
                    {formData.Prescription.map((prescription, index) => (
                        <div key={index} className="array-item">
                            <input
                                type="text"
                                name={`Prescription[${index}]`}
                                value={prescription}
                                placeholder={`Prescription ${index + 1}`}
                                onChange={(e) => {
                                    const updatedPrescription = [...formData.Prescription];
                                    updatedPrescription[index] = e.target.value;
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        Prescription: updatedPrescription,
                                    }));
                                }}
                                required
                            />
                            <button type="button" onClick={() => removePrescription(index)} className="remove-btn">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addPrescription} className="add-btn">
                        Add Prescription
                    </button>
                </div>

                <div className="physical-examination">
                    <h3>Physical Examination</h3>

                    <div className="input-group">
                        <label htmlFor="Pulse">Pulse</label>
                        <input
                            type="number"
                            id="Pulse"
                            name="Pulse"
                            value={formData.PhysicalExamination.Pulse}
                            onChange={handlePhysicalExaminationChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Sys">Systolic BP</label>
                        <input
                            type="number"
                            id="Sys"
                            name="Sys"
                            value={formData.PhysicalExamination.BloodPressure.Sys}
                            onChange={handleBloodPressureChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Dia">Diastolic BP</label>
                        <input
                            type="number"
                            id="Dia"
                            name="Dia"
                            value={formData.PhysicalExamination.BloodPressure.Dia}
                            onChange={handleBloodPressureChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Weight">Weight</label>
                        <input
                            type="number"
                            id="Weight"
                            name="Weight"
                            value={formData.PhysicalExamination.Weight}
                            onChange={handlePhysicalExaminationChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Temperature">Temperature</label>
                        <input
                            type="number"
                            id="Temperature"
                            name="Temperature"
                            value={formData.PhysicalExamination.Temperature}
                            onChange={handlePhysicalExaminationChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="SpO2">SpO2</label>
                        <input
                            type="number"
                            id="SpO2"
                            name="SpO2"
                            value={formData.PhysicalExamination.SpO2}
                            onChange={handlePhysicalExaminationChange}
                            required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Lab Tests</label>
                    {formData.LabTests.map((test, index) => (
                        <div key={index} className="lab-test-item">
                            <input
                                type="text"
                                name="TestType"
                                value={test.TestType}
                                onChange={(e) => handleArrayChange(e, "LabTests", index)}
                                placeholder="Test Type"
                                required
                            />
                            {/* <input
                                type="text"
                                name="HealthWorkerID"
                                value={test.HealthWorkerID}
                                onChange={(e) => handleArrayChange(e, "LabTests", index)}
                                placeholder="Health Worker ID"
                                required
                            /> */}
                            <input
                                type="text"
                                name="Results"
                                value={test.Results}
                                onChange={(e) => handleArrayChange(e, "LabTests", index)}
                                placeholder="Test Results"
                                required
                            />
                            <button type="button" onClick={() => removeLabTest(index)} className="remove-btn">
                                Remove Test
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addLabTest} className="add-btn">
                        Add Lab Test
                    </button>
                </div>

                <button type="submit" className="submit-btn">
                    Generate Report
                </button>
            </form>

            <Link to="/" className="back-link">
                Back to Patient Registration
            </Link>
        </div>
    );
};

export default ReportGenerationForm;
