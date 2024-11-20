import React, {useState} from "react";

export default function Login() {
    const [login, setLogin] = useState(true)
   
    const [createAcc, setCreateAcc] = useState(false);
    
    const loginClick = () => {
        setLogin(true)
        setCreateAcc(false)
    }
    const createAccClick = () => {
        setLogin(false)
        setCreateAcc(true)
    }

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
                <form class="formFields">
                    <label htmlFor="username">username</label>
                    <input type="username" name="username" />

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" />

                    <div class="button-wrapper"><button type="submit">Login</button></div>
                </form>
                )}
                { createAcc && (
                <form class="formFields">
                    <label htmlFor="username">username</label>
                    <input type="username" name="username" />

                    <label htmlFor="password">password</label>
                    <input type="password" name="password" />

                    <label htmlFor="email">email</label>
                    <input type="email" name="email" />

                    <label htmlFor="city">city</label>
                    <input type="city" name="city" />

                    <label htmlFor="state">state</label>
                    <input type="state" name="state" />

                    <div class="button-wrapper"><button type="submit">Create User</button></div>
                </form>
                )}
            </div>
        </div>
        
    )
}
