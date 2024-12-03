import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
    const location = useLocation();
    const email = location.state?.email
    const clientinfo = location.state?.clientinfo

    console.log("\nClient Info in Home: ", clientinfo)

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
            <Header email={email} clientinfo={clientinfo} />
            {/* <h1>This is the Home Page</h1> */}

            <div class="home-bar">
                {clientinfo ? <div class="home-welcome">Welcome {clientinfo.name}!
                    <div class="create-post">Create New Post</div>

                </div> :
                    <div class="home-no-login">Login to create posts and comments!</div>
                }
            </div>

            <div class="all-posts">{allPosts.map((post, i) => {
                return (
                    <div key={i} class="post">
                        <div class="post-name"><b>{post.postername}</b></div>
                        <div><img class="post-img" src={get_src_path(post.userid, post.postimage)} /></div>
                        <div class="post-text"><b>{post.postername}</b> {post.posttext}</div>
                        <div class="all-comments">{post.comments.map((comment, j) => {
                            return (
                                <div key={j} class="comment">
                                    <div class="comment-name"><b>{comment.fullname}</b></div>
                                    <div class="comment-text">{comment.postedcomment}</div>
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