import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [isUser, setIsUser] = useState(true);
    const [isOrg, setIsOrg] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    
    const [createUserAccData, setCreateUserAccData] = useState({
        email: "",
        password: "",
        fullName: "",
        city: "",
        state: "",
    })
    const [createOrgAccData, setCreateOrgAccData] = useState({
        email: "",
        password: "",
        orgName: "",
        description: "",
        phoneNumber: "",
        city: "",
        state: ""
    })
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function checkFields(dataObj) {
        console.log(dataObj)
        for (let key in dataObj) {
            if(!dataObj.hasOwnProperty(key)) continue;
            if(!dataObj[key]) {
                return false
            };
        }
        return true;
    }
    
    const navigate = useNavigate();
    
    const userClick = () => {
        setIsUser(true)
        setIsOrg(false)
    }
    const organizationClick = () => {
        setIsUser(false)
        setIsOrg(true)
    }

    const loginToggle = () => {
        setLoggingIn(!loggingIn)
    }

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleCreateUserAccChange = (e) => {
        const { name, value } = e.target;
        setCreateUserAccData({ ...createUserAccData, [name]: value })
    }

    const handleCreateOrgAccChange = (e) => {
        const { name, value } = e.target;
        setCreateOrgAccData({ ...createOrgAccData, [name]: value })
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!checkFields(loginData)) {
            alert("Enter All Information Before Submitting")
        } else {
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "login", ...loginData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Login response:", data);
                    if (data.status === "success") {
                        navigate('/home', { state: {email: loginData.email}})
                    } else {
                        alert("Login Failed!")
                    }
                    setLoginData({
                        email: "",
                        password: "",
                    });
                })
                .catch((error) => {
                    console.error("Error during login:", error);
                });
        }
    };

    const handleCreateUserAccSubmit = (e) => {
        e.preventDefault();
        if (!checkFields(createUserAccData)) {
            alert("Enter All Information Before Submitting")
        } else {
            // Send create account data to the server
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "createUserAccount", ...createUserAccData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Create account response:", data);
                    if (data.status === "success") {
                        navigate('/home', { state: {email: createUserAccData.email}})
                    } else {
                        alert("Create Account Failed")
                    }
                    setCreateUserAccData({
                        email: "",
                        password: "",
                        fullName: "",
                        city: "",
                        state: "",
                    });
                    
                })
                .catch((error) => {
                    console.error("Error during account creation:", error);
                });
        }
        
    };

    const handleCreateOrgAccSubmit = (e) => {
        e.preventDefault();
        if (!checkFields(createOrgAccData)) {
            alert("Enter All Information Before Submitting")
            // navigate('/')
        } else {
            // Send create account data to the server
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "createOrgAccount", ...createOrgAccData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Create account response:", data);
                    if (data.status === "success") {
                        navigate('/home', { state: {email: createOrgAccData.email}})
                    } else {
                        alert("Create Account Failed")
                    }
                    setCreateOrgAccData({
                        email: "",
                        password: "",
                        orgName: "",
                        description: "",
                        phoneNumber: "",
                        city: "",
                        state: "",
                    });
                })
                .catch((error) => {
                    console.error("Error during account creation:", error);
                });
        }
    };

    return (
        <div class="loginContainer">
            <h1 class="appTitle">project connect</h1>
            { !loggingIn && 
            <div class="accTypeToggle">
                <button 
                    onClick={userClick}
                    style={{
                        backgroundColor: isUser ? "green" : "gray",
                        color: "white",
                      }}
                >
                    User
                </button>
                <p>or</p>
                <button 
                    onClick={organizationClick}
                    style={{
                        backgroundColor: isOrg ? "green" : "gray",
                        color: "white",
                      }}
                >
                    Organization
                </button>
            </div>}
            <div class="inputBox">
                { loggingIn && (
                <form class="formFields" onSubmit={handleLoginSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" value={loginData.email} onChange={handleLoginChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={loginData.password} onChange={handleLoginChange}/>

                    <div class="button-wrapper"><button type="submit">Login</button></div>
                    <p class="login-toggle" onClick={loginToggle}>Don't have an account? Create One Here</p>
                </form>
                )}
                { !loggingIn && isUser && (
                <form class="formFields" onSubmit={handleCreateUserAccSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" value={createUserAccData.email} onChange={handleCreateUserAccChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={createUserAccData.password} onChange={handleCreateUserAccChange}/>

                    <label htmlFor="fullName">full name</label>
                    <input type="fullName" name="fullName" value={createUserAccData.fullName} onChange={handleCreateUserAccChange}/>

                    <label htmlFor="city">city</label>
                    <input type="city" name="city" value={createUserAccData.city} onChange={handleCreateUserAccChange}/>

                    <label htmlFor="state">state</label>
                    <input type="state" name="state" value={createUserAccData.state} onChange={handleCreateUserAccChange}/>

                    <div class="button-wrapper"><button type="submit">Create User</button></div>
                    <p class="login-toggle" onClick={loginToggle}>Already have an account? Log in Here</p>
                </form>
                )}
                { !loggingIn && isOrg && (
                    <form class="formFields" onSubmit={handleCreateOrgAccSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" value={createOrgAccData.email} onChange={handleCreateOrgAccChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={createOrgAccData.password} onChange={handleCreateOrgAccChange}/>

                    <label htmlFor="orgName">organization name</label>
                    <input type="orgName" name="orgName" value={createOrgAccData.orgName} onChange={handleCreateOrgAccChange}/>

                    <label htmlFor="description">organization description</label>
                    <input type="description" name="description" value={createOrgAccData.description} onChange={handleCreateOrgAccChange}/>

                    <label htmlFor="phoneNumber">phone number</label>
                    <input type="phoneNumber" name="phoneNumber" value={createOrgAccData.phoneNumber} onChange={handleCreateOrgAccChange}/>

                    <label htmlFor="city">city</label>
                    <input type="city" name="city" value={createOrgAccData.city} onChange={handleCreateOrgAccChange}/>

                    <label htmlFor="state">state</label>
                    <input type="state" name="state" value={createOrgAccData.state} onChange={handleCreateOrgAccChange}/>

                    <div class="button-wrapper"><button type="submit">Create Organization</button></div>
                    <p class="login-toggle" onClick={loginToggle}>Already have an account? Log in Here</p>
                </form>
                )}
            </div>
        </div>        
    )
}
