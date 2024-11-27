import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState(true)
    const [createAcc, setCreateAcc] = useState(false);
    const [createAccData, setCreateAccData] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        city: "",
        state: "",
    })
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    
    const navigate = useNavigate();
    
    const loginClick = () => {
        setLogin(true)
        setCreateAcc(false)
    }
    const createAccClick = () => {
        setLogin(false)
        setCreateAcc(true)
    }

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleCreateAccChange = (e) => {
        const { name, value } = e.target;
        setCreateAccData({ ...createAccData, [name]: value })
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
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
                setLoginData({
                    username: "",
                    password: "",
                });
                if (data.status === "success") {
                    navigate('/home')
                    console.log("working here")
                } else {
                    alert("Login Failed!")
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
    };

    const handleCreateAccSubmit = (e) => {
        e.preventDefault();
        // Send create account data to the server
        fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "createAccount", ...createAccData }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Create account response:", data);
                setCreateAccData({
                    username: "",
                    password: "",
                    fullName: "",
                    email: "",
                    city: "",
                    state: "",
                });
                if (data.status === "success") {
                    navigate('/home')
                } else {
                    alert("Create Account Failed")
                }
            })
            .catch((error) => {
                console.error("Error during account creation:", error);
            });
        
    };

    return (
        <div class="loginContainer">
            <h1 class="appTitle">project connect</h1>
            <div class="signInToggle">
                <button 
                    onClick={loginClick}
                    style={{
                        backgroundColor: login ? "green" : "gray",
                        color: "white",
                      }}
                >
                    Login
                </button>
                <p>or</p>
                <button 
                    onClick={createAccClick}
                    style={{
                        backgroundColor: createAcc ? "green" : "gray",
                        color: "white",
                      }}
                >
                    Create Account
                </button>
            </div>
            <div class="inputBox">
                { login && (
                <form class="formFields" onSubmit={handleLoginSubmit} >
                    <label htmlFor="username">username</label>
                    <input type="username" name="username" value={loginData.username} onChange={handleLoginChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={loginData.password} onChange={handleLoginChange}/>

                    <div class="button-wrapper"><button type="submit">Login</button></div>
                </form>
                )}
                { createAcc && (
                <form class="formFields" onSubmit={handleCreateAccSubmit}>
                    <label htmlFor="username">username</label>
                    <input type="username" name="username" value={createAccData.username} onChange={handleCreateAccChange}/>

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={createAccData.password} onChange={handleCreateAccChange}/>

                    <label htmlFor="fullName">full name</label>
                    <input type="fullName" name="fullName" value={createAccData.fullName} onChange={handleCreateAccChange}/>

                    <label htmlFor="email">email</label>
                    <input type="email" name="email" value={createAccData.email} onChange={handleCreateAccChange}/>

                    <label htmlFor="city">city</label>
                    <input type="city" name="city" value={createAccData.city} onChange={handleCreateAccChange}/>

                    <label htmlFor="state">state</label>
                    <input type="state" name="state" value={createAccData.state} onChange={handleCreateAccChange}/>

                    <div class="button-wrapper"><button type="submit">Create User</button></div>
                </form>
                )}
            </div>
        </div>        
    )
}
