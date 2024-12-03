import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

import default_img from "../../../public/assets/default_img.png";

export default function NewPost() {
    const location = useLocation();
    const email = location.state?.email
    const clientinfo = location.state?.clientinfo

    const navigate = useNavigate();

    const imgRef = useRef();

    const [postData, setPostData] = useState({
        posttext: "",
    })

    const [imgURL, setimgURL] = useState(default_img);

    function checkFields(dataObj) {
        console.log(dataObj)
        for (let key in dataObj) {
            if (!dataObj.hasOwnProperty(key)) continue;
            if (!dataObj[key]) {
                return false
            };
        }
        return true;
    }

    // const navigate = useNavigate();

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleImageChange = (e) => {
        let uploadedFile = imgRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setimgURL(cachedURL);
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!checkFields(postData)) {
            alert("Enter All Information Before Submitting")
        } else {
            let uploadedFile = imgRef.current.files[0];
            let newPostData = new FormData();
            newPostData.append('imgdata', uploadedFile);
            newPostData.append('posttext', postData['posttext']);
            newPostData.append('clientid', clientinfo['clientid']);
            newPostData.append('clienttype', clientinfo['clienttype']);

            // formData.append("file", uploadedFile);
            // console.log("uploaded file: ", uploadedFile, "type: ", typeof (uploadedFile));
            // let allPostData = postData;
            // allPostData["clientid"] = clientinfo["clientid"];
            // allPostData["clienttype"] = clientinfo["clienttype"];
            // allPostData["imgdata"] = formData;
            fetch("http://localhost:8080", {
                method: "POST",
                body: JSON.stringify({ type: "createPost", ...newPostData })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Post response:", data);
                    if (data.status === "success") {
                        navigate('/home', {
                            state: {
                                email: clientinfo.email,
                                clientinfo: clientinfo
                            }
                        })
                    } else {
                        alert("Failed to Create Post!")
                    }
                    setPostData({
                        posttext: ""
                    });
                })
                .catch((error) => {
                    console.error("Error during post creation:", error);
                });
        }
    };

    return (
        <div >
            <Header email={email} clientinfo={clientinfo} />

            <img class="new-img" src={imgURL} alt="default image" />

            <div>
                <form class="post-form" onSubmit={handlePostSubmit}>
                    <div class="new-post-img">
                        <label htmlFor="postimage">Post Image:</label>
                        <input type="file" id="imgURL" accept="image/png, image/jpeg, image/jpg" ref={imgRef} onChange={handleImageChange} />
                    </div>
                    <div class="new-post-text">
                        <label htmlFor="posttext">Post Description:</label>
                        <input type="text" name="posttext" value={postData.posttext} onChange={handlePostChange} />
                    </div>

                    <div class="postbtn"><button type="submit">Create Post</button></div>
                </form>
            </div>
        </div>
    )
}