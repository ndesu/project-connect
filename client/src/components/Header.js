import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header({ email }) {
    const navigate = useNavigate();
    console.log(`here is the email: ${email}`)

    const handleNavButtonSubmit = (pathname) => {
        navigate(pathname, { state: {email: email}})
    }
    
    return (
    <   header>
            <nav>
                <ul class="leftSide">
                    <li>
                        <a class="navButton" onClick={() => handleNavButtonSubmit('/home')}>PROJECT CONNECT</a>
                    </li>
                </ul>
                
                <ul class="rightSide">
                    <li>
                        <a class="navButton" onClick={() => handleNavButtonSubmit('/map')}>MAP</a>
                    </li>
                    <li>
                        <a class="navButton" onClick={() => handleNavButtonSubmit('/events')}>EVENTS/SUPPLY REQUESTS</a>
                    </li>
                    <li>
                        <a class="navButton" onClick={() => handleNavButtonSubmit('/profile')}>PROFILE</a>
                    </li>
                    <li>
                        <a class="navButton" href="/">LOG OUT</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
    
}
