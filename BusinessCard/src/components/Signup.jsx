import React from "react";
import { useNavigate } from "react-router-dom";

export function Signup({username, password, handleUsernameChange, handlePasswordChange}){
    
    const navigate = useNavigate();

    function createAccount(){
        fetch("http://localhost:3000/signup", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                throw new Error("HTTP error! Status: " + res.status);
            }
            return res.json();
        })
        .then(data => {
            console.log(data)
            navigate("/login")
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className="signup-container">
            <input className="input-field" type="text" placeholder="username" value={username} onChange={(e) => handleUsernameChange(e.target.value)}></input>
            <input className="input-field" type="text"placeholder="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)}></input>
            <button className="signup" onClick={createAccount}>Signup</button>
        </div>
    )
}