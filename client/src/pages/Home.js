import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
    const location = useLocation();
    const email = location.state?.email

    email ? console.log(email) : console.log("no email :(")

    const [allPosts, setAllPosts] = useState([])

    const get_post_data = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_all_posts")

            const all_posts_data = await response.json();
            console.log("all_posts_data: ", all_posts_data, "\n\nType of: ", typeof (all_posts_data))
            setAllPosts(all_posts_data)

        } catch (error) {
            console.log(error.message);
        }
    }

    // Anything in the useEffect function will ONLY be called when the component is first loaded (otherwise it will continuously call get_post_data())
    useEffect(() => {
        get_post_data()
    }, [])

    let src_path = ``;

    const get_src_path = (userid, postimage) => {
        return `../../../public/assets/user_images/${userid}/${postimage}`
    }

    return (
        <div class="page">
            <Header email={email} />
            <h1>This is the Home Page</h1>

            {email ? <p>Welcome {email}!</p> :
                <p>You are not logged in</p>
            }

            <div class="all-posts">{allPosts.map((post, i) => {
                return (
                    <div key={i} class="post">
                        <div><b>{post.postername}</b> says...</div>
                        <div><img src={get_src_path(post.userid, post.postimage)} width="500" height="500" /></div>
                        <div>{post.posttext}</div>
                        <div class="all-comments">{post.comments.map((comment, j) => {
                            return (
                                <div key={j} class="comment">
                                    <div><b>{comment.fullname}</b> says...</div>
                                    <div>{comment.postedcomment}</div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )
            })}</div>
        </div>
    )
}