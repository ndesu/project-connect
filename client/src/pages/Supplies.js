import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Supplies() {
    const location = useLocation();
    const email = location.state?.email
    const clientinfo = location.state?.clientinfo

    const navigate = useNavigate();

    email ? console.log(email) : console.log("no email :(")

    const [allRequests, setAllRequests] = useState([])
    const [fulfillData, setFulfillData] = useState(0)

    const get_request_data = async () => {
        try {
            const response = await fetch("http://localhost:8080/get_all_requests")

            let all_requests_data = await response.json();
            console.log("frontend all req: ", all_requests_data);
            all_requests_data = all_requests_data.reverse()
            setAllRequests(all_requests_data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleFulfillChange = (e) => {
        const { value } = e.target;
        setFulfillData(value);
    }

    const handleFulfillSubmit = (e, linkedreqid) => {
        e.preventDefault();
        if (fulfillData == 0) {
            console.log("No fulfill data");
        } else {
            console.log("Handling FulFill Submit...");
            let fulfill = {
                numdonate: fulfillData,
                requestid: linkedreqid,
                userid: clientinfo.clientid
            }

            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "fulfillReq", ...fulfill }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Fulfill Req response:", data);
                    if (data.status === "success") {
                        alert("Success! Refresh to view change.")
                        navigate('/supplies', { state: { email: clientinfo.email, clientinfo: clientinfo } })
                    } else {
                        alert("Fulfill Request failed")
                    }
                    setFulfillData(0);
                })
                .catch((error) => {
                    console.error("Error during request fulfill:", error);
                });
        }
    }

    // Anything in the useEffect function will ONLY be called when the component is first loaded (otherwise it will continuously call get_request_data())
    useEffect(() => {
        get_request_data()
    }, [])

    const handleNavButtonSubmit = (pathname) => {
        console.log("NAVIGATING");
        navigate(pathname, { state: { email: email, clientinfo: clientinfo } });
    }

    return (
        <div class="page">
            <Header email={email} clientinfo={clientinfo} />
            {/* <h1>This is the Supplies Page</h1> */}

            <div class="home-bar">
                {clientinfo ? <div class="home-welcome">
                    Welcome, {clientinfo.name}!
                </div> :
                    <div>Login to fulfill supply requests.</div>
                }
            </div>

            <div class="all-requests">{allRequests.map((request, i) => {
                return (
                    <div key={i} class="request">
                        <div class="request-name"><b>{request.organizationname}</b></div>
                        <div>{request.orgaddress}</div>
                        <div class="request-text">{request.itemname}</div>
                        <div class="request-descrip">{request.supplydescription}</div>
                        <div class="request-quantity">{request.quantity}</div>

                        {clientinfo ?
                            <div>
                                <form class="fulfill-form" onSubmit={(e, requestid) => handleFulfillSubmit(e, request.requestid)}>
                                    <label class="fulfill-label" htmlFor="commenttext">How many will you donate?</label>
                                    <div></div>
                                    <input class="fulfill-input" type="number" name="commenttext" value={fulfillData} onChange={handleFulfillChange} />
                                    <button type="submit" class="fulfill-btn">Submit</button>
                                </form>
                            </div>
                            :
                            <div>
                                Login to fulfill supply requests.
                            </div>
                        }
                    </div>
                )
            })}
            </div>
        </div>
    )
}
