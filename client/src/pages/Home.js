import React, { useState } from "react";



export default function Home() {
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
        <div>
            <h1>This is the Home Page</h1>

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