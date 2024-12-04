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
            let file_name = uploadedFile.name;

            uploadedFile.arrayBuffer()
                .then((data) => {
                    let u8data = new Uint8Array(data);
                    let sdata = "";
                    for (let i = 0; i < u8data.length; i++) {
                        sdata += String.fromCharCode(u8data[i]);
                    }

                    let newPostData = {
                        'imgdata': btoa(sdata),
                        'imgname': file_name,
                        'posttext': postData['posttext'],
                        'clientid': clientinfo['clientid'],
                        'clienttype': clientinfo['clienttype'],
                        'type': 'createNewPost'
                    }
                    return newPostData;
                })
                .then((newPostData) => {
                    fetch("http://localhost:8080", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newPostData),
                    })
                })
                // .then((response) => response.json())
                .then(() => {
                    navigate('/home', {
                        state: {
                            email: clientinfo.email,
                            clientinfo: clientinfo
                        }
                    })
                })
                // .then((data) => {
                //     console.log("Post response:", data);
                //     if (data.status === "success") {
                //         navigate('/home', {
                //             state: {
                //                 email: clientinfo.email,
                //                 clientinfo: clientinfo
                //             }
                //         })
                //     } else {
                //         alert("Failed to Create Post!")
                //     }
                //     setPostData({
                //         posttext: ""
                //     });
                // })
                .catch((error) => {
                    console.error("Error during post creation:", error);
                });
        }
    };

    return (
        <div >
            <Header email={email} clientinfo={clientinfo} />

            <div>
                Create a New Post
                <form class="post-form" onSubmit={handlePostSubmit}>
                    <img class="new-img" src={imgURL} alt="default image" />
                    <div class="choose-img">
                        <label htmlFor="postimage"><b>Select Image: </b></label>
                        <input type="file" id="imgURL" accept="image/png, image/jpeg, image/jpg" ref={imgRef} onChange={handleImageChange} />
                    </div>
                    <div class="new-post-text">
                        <label htmlFor="posttext"><b>Post Description: </b></label>
                        <textarea
                            class="post-descrip"
                            type="text" name="posttext" value={postData.posttext} onChange={handlePostChange} />
                    </div>

                    <div class="postbtn"><button type="submit">Create Post</button></div>
                </form>
            </div>
        </div>
    )
}