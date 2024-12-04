import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
    const location = useLocation();
    const email = location.state?.email
    const clientinfo = location.state?.clientinfo

    const navigate = useNavigate();

    email ? console.log(email) : console.log("no email :(")

    const [allPosts, setAllPosts] = useState([])
    const [commentData, setCommentData] = useState({
        commenttext: "",
    })

    const get_post_data = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_all_posts")

            let all_posts_data = await response.json();
            all_posts_data = all_posts_data.reverse()
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

    const handleNavButtonSubmit = (pathname) => {
        console.log("NAVIGATING");
        navigate(pathname, { state: { email: email, clientinfo: clientinfo } });
    }

    const handleCommentChange = (e) => {
        console.log("Changing comment...")
        const { value } = e.target;
        setCommentData({ ...commentData, commenttext: value });
    }

    const handleCommentSubmit = (e, linkedpostid) => {
        e.preventDefault();
        if (commentData.commenttext == "") {
            console.log("No comment data");
        } else {
            console.log("Handling Comment Submit...");
            let comment = {
                commenttext: commentData.commenttext,
                postid: linkedpostid,
                userid: clientinfo.clientid
            }

            console.log("Comment data: ", comment);
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "createComment", ...comment }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Create comment response:", data);
                    if (data.status === "success") {
                        alert("Success! Refresh to view comment.")
                        navigate('/home', { state: { email: clientinfo.email, clientinfo: clientinfo } })
                    } else {
                        alert("Create Comment Failed")
                    }
                    setCommentData({
                        commenttext: ""
                    });
                })
                .catch((error) => {
                    console.error("Error during comment creation:", error);
                });
        }
    }

    return (
        <div class="page">
            <Header email={email} clientinfo={clientinfo} />
            {/* <h1>This is the Home Page</h1> */}

            <div class="home-bar">
                {clientinfo ? <div class="home-welcome">
                    Welcome, {clientinfo.name}!
                    <a class="create-post-btn" onClick={() => handleNavButtonSubmit('/newpost')}>Create New Post</a>
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
                        <div>
                            {clientinfo ?
                                <div>
                                    <form class="create-comment" onSubmit={(e, postid) => handleCommentSubmit(e, post.postid)}>
                                        <label class="create-comment-label" htmlFor="commenttext"><b>{clientinfo.name}</b></label>
                                        <div></div>
                                        <textarea class="create-comment-input" type="text" name="commenttext" value={commentData.commenttext} onChange={handleCommentChange} />
                                        <button type="submit" class="create-comment-btn">Post</button>
                                    </form>
                                </div>
                                :
                                <div>
                                    Login to comment.
                                </div>
                            }
                        </div>
                    </div>
                )
            })}</div>
        </div>
    )
}