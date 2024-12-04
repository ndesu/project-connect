import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";

export default function Events() {
    const location = useLocation();
    const email = location.state?.email;
    const clientinfo = location.state?.clientinfo;

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_all_events");
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError(err.message);
        }
    };

    const handleRegisterClick = (eventId) => {
        console.log(`Registering for event with ID: ${eventId}`);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <Header email={email} clientinfo={clientinfo} />

            <h1 className="events-title">Events</h1>
            <div className="events-container">
                {error ? (
                    <p className="error-text">Error: {error}</p>
                ) : events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events.map((event, index) => (
                        <div key={index} className="event-box">
                            <h3>{event.eventName}</h3>
                            <p><strong>Description:</strong> {event.eventDescription}</p>
                            <p><strong>Type:</strong> {event.eventType}</p>
                            <p><strong>Date:</strong> {event.eventDate}</p>
                            <p><strong>Time:</strong> {event.eventTime}</p>
                            <p><strong>Volunteers Needed:</strong> {event.numMaxVolunteers}</p>
                            <p><strong>RSVPs:</strong> {event.rsvps}</p>
                            <p><strong>Organization:</strong> {event.organizationName}</p>
                            <p><strong>Location:</strong> {event.location}</p>

                            <button
                                className="register-button"
                                onClick={() => handleRegisterClick(event.id)}
                            >
                                Register
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
