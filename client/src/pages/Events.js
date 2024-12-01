import React from "react";
import { useLocation  } from "react-router-dom";
import Header from "../components/Header";

export default function Events() {
    const location = useLocation();
    const email = location.state?.email

    return (
        <div>
            <Header email={email} />
            <h1>This is the Events Page</h1>
            {email ? <p>Welcome {email}!</p> : 
            <p>You are not logged in</p>
            }
        </div>
        
    )
}