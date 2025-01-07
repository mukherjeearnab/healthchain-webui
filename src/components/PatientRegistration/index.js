// src/components/PatientRegistrationForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

const PatientRegistrationForm = () => {
    const [formData, setFormData] = useState({
        AadhaarID: "",
        Name: "",
        DoB: "",
        Gender: "",
        Father: "",
        Mother: "",
        Phone: "",
        Address: "",
        Pincode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Patient Registration Data:", formData);
        try {
            const res = await fetch("http://localhost:23121/phi/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Network response was NOT ok!");
            }

            console.log(await res.json());
            alert("Patient registered Successfully!"); // Save response data to state
        } catch (error) {
            alert(error.message); // Save error message to state
        }
    };

    return (
        <div className="form-container">
            <h2>Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ABHA ID</label>
                    <input
                        type="text"
                        name="AadhaarID"
                        value={formData.AadhaarID}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Name</label>
                    <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input type="number" name="DoB" value={formData.DoB} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Gender</label>
                    <select name="Gender" value={formData.Gender} onChange={handleInputChange} required>
                        <option value="">Select Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                </div>

                <div>
                    <label>Father's Name</label>
                    <input type="text" name="Father" value={formData.Father} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Mother's Name</label>
                    <input type="text" name="Mother" value={formData.Mother} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Phone Number</label>
                    <input type="tel" name="Phone" value={formData.Phone} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Address</label>
                    <input type="text" name="Address" value={formData.Address} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>Pincode</label>
                    <input
                        type="number"
                        name="Pincode"
                        value={formData.Pincode}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default PatientRegistrationForm;
