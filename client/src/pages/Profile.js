import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";

// fullName, email, password, location, rsvps

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const fullName = location.state?.fullName;
    const clientinfo = location.state?.clientinfo || {};

    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        if (email) {
            get_profile_data();
        }
    }, [email]); 
    
    return (
        <div>
            <Header email={email} clientinfo={clientinfo} fullName={fullName} />

            <br></br>
            <h1 className="profile-title">Profile Page</h1>
            <br></br>

            {/* {email ? <p>Welcome {email}!</p> : <p>You are not logged in</p>} */}


            {/* first box with user information*/}
            {profileData ? (
                <div className="profile-box">
                <p>
                    <strong className="bold-text">User:</strong> <span className="normal-text">{profileData.fullName}</span>
                </p>
                <p>
                    <strong className="bold-text">Located At:</strong> <span className="normal-text">{profileData.locatedAt}</span>
                </p>
                </div>
            ) : error ? (
                <p>Error loading profile data: {error}</p>
            ) : (
                <p>Loading profile data...</p>
            )}

            {/* Events Section */}
            <br></br>
            <h2 className="centered-title">Events to Attend:</h2>
            <div className="profile-box">
                {profileData?.eventsToAttend?.length > 0 ? (
                    profileData.eventsToAttend.map((event, index) => (
                        <p key={index}>
                            <strong className="bold-text">Event:</strong>{" "}
                            <span className="normal-text">{event.name}</span>
                        </p>
                    ))
                ) : (
                    <p> 
                        <span className="normal-text">You currently have not signed up for any events.</span>
                    </p>
                )}
            </div>


        </div>


    );
}
