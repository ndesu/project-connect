import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

// fullName, email, password, location, rsvps

export default function Profile() {
    const location = useLocation();
    console.log("Location state:", location.state); 

    const email = location.state?.email;
    const fullName = location.state?.fullName
    const clientinfo = location.state?.clientinfo || {}
    const locatedAt = clientinfo?.locatedAt
    const rsvps = clientinfo?.rsvps || []

    console.log("fullName:", fullName);
    console.log("email:", email);
    console.log("locatedAt:", locatedAt);
    console.log("rsvps:", rsvps);

    //comment out here
    
    // const get_profile_data = async () => {
    //     try{
    //         const respone = await fetch("http://localhost:8080/get_all_profile")

    //         let all_profile_data = await response.json();
    //         console.log("all_profile_data: ", all_profile_data, "\n\nType of: ", typeof (all_profile_data))
    //         all_profile_data = all_profile_data.reverse()
    //         setAllProfile(all_profile_data)

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // useEffect(() => {
    //     get_profile_data()
    // }, [])

    // to here


    return (
        <div>
            <Header email={email} clientinfo={clientinfo} fullName={fullName}/>

            <h1>This is the Profile Page</h1>

            {email ? <p>Welcome {email}!</p> :
                <p>You are not logged in</p>
            }

            {fullName ? (
                <p>Your name is: {fullName}</p>
            ) : (
                <p>Your name is not accessed.</p>
            )}

        </div>

    )
}