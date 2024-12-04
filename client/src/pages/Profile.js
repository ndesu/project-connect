import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";
import CreateEvent from "../components/createEvent";

// fullName, email, password, location, rsvp

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const fullName = location.state?.fullName;
    const clientinfo = location.state?.clientinfo || {};
    const userID = clientinfo.clientid

    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [userEvents, setUserEvents] = useState([])
    const [organizationEvents, setOrganizationEvents] = useState([])

    const get_profile_data = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_all_profile");
            if (!response.ok) {
                throw new Error("Failed to fetch profile data");
            }
            const data = await response.json();
            const userProfile = data.find(profile => profile.email === email);
            setProfileData(userProfile || null); 
        } catch (err) {
            console.error("Error fetching profile data:", err);
            setError(err.message);
        }
    };

    const fetchUserEvents = async() => {
        console.log(userID)
        try {
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "getUserEventsInfo", userID })
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserEvents(data)
                })
        } catch (err) {
            console.error("Error fetching user events:", err)
            setError(err.message)
        }
         
    }

    const fetchOrgEvents = async() => {
        console.log(userID)
        try {
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "getOrgEventsInfo", userID })
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrganizationEvents(data)
                })
        } catch (err) {
            console.error("Error fetching org events:", err)
            setError(err.message)
        }
         
    }

    

    useEffect(() => {
        if (email) {
            get_profile_data();
        }
        if(clientinfo.clienttype === "user") fetchUserEvents();
        else fetchOrgEvents()
    }, [email]); 
    
    console.log(profileData)

    return (
        <div>
            <Header email={email} clientinfo={clientinfo} fullName={fullName} />

            <br></br>
            <h1 className="profile-title">Profile Page</h1>
            <br></br>

            {/* see if org email or user email */}
            {/* {email ? <p>Welcome {email}!</p> : <p>You are not logged in</p>} */}

            {/* first box with user information*/}
            {clientinfo.clienttype === "user" ? (
                // user profile
                <div>
                    <div className="profile-box">
                        {profileData ? (
                            <>
                                <p>
                                    <strong className="bold-text">User:</strong>{" "}
                                    <span className="normal-text">{profileData.fullName}</span>
                                </p>
                                <p>
                                    <strong className="bold-text">Located At:</strong>{" "}
                                    <span className="normal-text">{profileData.locatedAt}</span>
                                </p>
                            </>
                        ) : error ? (
                            <p>Error loading profile data: {error}</p>
                        ) : (
                            <p>Loading profile data...</p>
                        )}
                    </div>

                    {/* user events */}
                    <br />
                    <h2 className="centered-title">Events to Attend:</h2>
                    <div className="profile-box">
                        {userEvents.length > 0 ? (
                            userEvents.map((event, index) => (
                                <div className="event-listitem" key={index}>
                                    <p>{event.eventName}</p>
                                    <div className="datetime">
                                        <p>on {event.date} at {event.time}</p>
                                    </div>
                                    <p>{event.address}</p>
                                </div>
                            ))
                        ) : (
                            <p>
                                <span className="normal-text">You currently have not signed up for any events.</span>
                            </p>
                        )}
                    </div>
                </div>
            ) : (

                // org profile
                <div className="profile-box">
                    <p>
                        <strong className="bold-text">Organization Name:</strong>{" "}
                        <span className="normal-text">{profileData?.organizationName}</span>
                    </p>
                    <p>
                        <strong className="bold-text">Description:</strong>{" "}
                        <span className="normal-text">{profileData?.orgDescription}</span>
                    </p>
                    <p>
                        <strong className="bold-text">Email:</strong>{" "}
                        <span className="normal-text">{profileData?.email}</span>
                    </p>
                    <p>
                        <strong className="bold-text">Phone Number:</strong>{" "}
                        <span className="normal-text">{profileData?.phoneNumber}</span>
                    </p>
                    <p>
                        <strong className="bold-text">Located At:</strong>{" "}
                        <span className="normal-text">{profileData?.locatedAt}</span>
                    </p>
                    <p>
                        <strong className="bold-text">Total Events:</strong>{" "}
                        <span className="normal-text">{profileData?.totalEvents}</span>
                    </p>
                </div>
            )}
            <CreateEvent orgID={clientinfo.clientid}/>
            
        </div>
    );
}
