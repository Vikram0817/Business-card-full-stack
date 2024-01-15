import React from "react";
import { useNavigate } from "react-router-dom";

export function Home(){
    
    const navigate = useNavigate();

    return(
    <div className="button-container">
        <button className="signup" onClick={() => navigate("/signup")}>Signup</button>
        <button className="login" onClick={() =>navigate("/login")}>Login</button>
    </div>
    )
}