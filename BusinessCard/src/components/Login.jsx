import React from "react";
import { useNavigate } from "react-router-dom";

export function Login({username, password, handleUsernameChange, handlePasswordChange}){

    const navigate = useNavigate();

    function handleLogin(){
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.Token);
            localStorage.setItem("myToken", data.Token)
            navigate("/card");
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert("No such account. You need to sign up first.");
        });
    }

    return(
        <div className="login-container">
            <input className="input-field" type="text" placeholder="Username" onChange={(e) => handleUsernameChange(e.target.value)} value={username}></input>
            <input className="input-field" type="text" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)} value={password}></input>
            <button className="login" onClick={handleLogin}>Login</button>
        </div>
    )
}