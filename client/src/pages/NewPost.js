import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function NewPost() {
    const location = useLocation();
    const email = location.state?.email
    const clientinfo = location.state?.clientinfo

    const [postData, setPostData] = useState({
        postimage: "",
        posttext: "",
        // userid: 
    })

    // function checkFields(dataObj) {
    //     console.log(dataObj)
    //     for (let key in dataObj) {
    //         if(!dataObj.hasOwnProperty(key)) continue;
    //         if(!dataObj[key]) {
    //             return false
    //         };
    //     }
    //     return true;
    // }

    // const navigate = useNavigate();

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!checkFields(postData)) {
            alert("Enter All Information Before Submitting")
        } else {
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "createPost", ...postData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Post response:", data);
                    if (data.status === "success") {
                        navigate('/home')
                    } else {
                        alert("Failed to Create Post!")
                    }
                    setPostData({
                        email: "",
                        password: "",
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

            <div>
                <form class="post-form" onSubmit={handlePostSubmit}>
                    <label htmlFor="postimage">Post Image:</label>
                    <input type="postimage" name="postimage" value={postData.postimage} onChange={handlePostChange} />

                    <label htmlFor="posttext">Post Description:</label>
                    <input type="posttext" name="posttext" value={postData.posttext} onChange={handlePostChange} />

                    <div class="postbtn"><button type="submit">Create Post</button></div>
                </form>
            </div>
        </div>
    )
}