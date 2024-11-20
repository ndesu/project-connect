import React from "react";

export default function Login() {
    return (
        <div class="loginContainer">
            <h1 class="appTitle">project connect</h1>
            <div class="signInToggle">
                <button>Login</button>
                <p>or</p>
                <button>Create Account</button>
            </div>
            <div class="inputBox">
                {/* <p>form will be here</p> */}
                <form>
                    <label>username</label>
                    <label>password</label>
                </form>
            </div>
        </div>
        
    )
}
