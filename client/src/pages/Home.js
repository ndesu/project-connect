import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
    const location = useLocation();
    const email = location.state?.email

    email ? console.log(email) : console.log("no email :(")

    const [allPosts, setAllPosts] = useState([])

    const get_post_data = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_data")
            // if (!response.ok) {
            //     throw new Error(`Response status: ${response.status}`);
            // }

            const all_posts_data = await response.json();
            setAllPosts(all_posts_data)
            // console.log("Type: ", typeof (all_posts_data))

        } catch (error) {
            console.log(error.message);
        }
    }

    get_post_data()

    return (
        <div class="page">
            <Header email={email} />
            <h1>This is the Home Page</h1>

            {email ? <p>Welcome {email}!</p> :
                <p>You are not logged in</p>
            }

            <div>{allPosts.map((post, i) => {
                return (
                    <div key={i}>
                        <div>{post}</div>
                    </div>
                )
            })}</div>
        </div>
    )
}