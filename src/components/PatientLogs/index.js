import React, { useState } from "react";
import "./index.css"; // Make sure to import the appropriate CSS file

const EventStore = () => {
    const [healthID, setHealthID] = useState(""); // State to store the Health ID
    const [eventData, setEventData] = useState(null); // State to store the fetched event data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Handle input change
    const handleInputChange = (e) => {
        setHealthID(e.target.value);
    };

    // Fetch event data when Health ID is entered
    const fetchEventData = async () => {
        if (!healthID) {
            setError("Please enter a valid ABHA ID");
            return;
        }

        setLoading(true);
        setError(null); // Reset error before starting new fetch

        try {
            const response = await fetch(`http://localhost:11133/contract/log/get/${healthID}`, {
                headers: {
                    "x-access-username": "admin",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data for this ABHA ID");
            }
            const data = await response.json();
            console.log(data);
            setEventData(data); // Set the fetched data into state
        } catch (err) {
            setError(err.message); // Handle fetch errors
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="event-store-container">
            <h2>Fetch ABDM Event Data</h2>

            {/* Input field for Health ID */}
            <div className="input-section">
                <label htmlFor="healthID">Enter ABHA ID:</label>
                <input
                    type="text"
                    id="healthID"
                    value={healthID}
                    onChange={handleInputChange}
                    placeholder="Enter ABHA ID"
                />
                <button onClick={fetchEventData} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Events"}
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Display fetched event data */}
            {eventData && (
                <div className="event-list">
                    <h3>Event Log for ABHA ID: {eventData.HealthID}</h3>
                    {eventData.LogEvents.length === 0 ? (
                        <p>No events found for this ABHA ID.</p>
                    ) : (
                        eventData.LogEvents.slice(0)
                            .reverse()
                            .map((event, index) => (
                                <div key={index} className="event-card">
                                    <h4>{event.eventType}</h4>
                                    <p>
                                        <strong>Timestamp:</strong> {new Date(event.timestamp * 1).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>From:</strong> {event.from}
                                    </p>
                                    <p>
                                        <strong>To:</strong> {event.to}
                                    </p>
                                </div>
                            ))
                    )}
                </div>
            )}
        </div>
    );
};

export default EventStore;
