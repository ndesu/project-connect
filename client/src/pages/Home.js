import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
    const location = useLocation();
    const email = location.state?.email

    email ? console.log(email) : console.log("no email :(")

    return (
        <div class="page">
            <Header email={email} />
            <h1>This is the Home Page</h1>
            {email ? <p>Welcome {email}!</p> : 
            <p>You are not logged in</p>
            }
        </div>
    )
}