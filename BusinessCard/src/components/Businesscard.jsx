import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Businesscard({
    username, 
    password, 
    name, desc, 
    interests, 
    linkdinLink, 
    twitterLink, 
    handleEdit, 
    handleInterests, 
    handleName, 
    handleDescription, 
    handleLinkdin, 
    handleTwitter,     
    handleUsernameChange,
    handlePasswordChange}){
    
    const navigate = useNavigate();

    const token = localStorage.getItem("myToken");

    function handleDeleteAccount(){
        fetch("http://localhost:3000/deleteaccount", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                username: username,
                password: password
            }
        }).then((res) => res.json())
        .then(data => {
            handleUsernameChange("");
            handlePasswordChange("");
            navigate("/signup");
            alert(data.msg);
        })
    }

    useEffect(() => {
        fetch("http://localhost:3000/getcard", {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                username: username,
                password: password
            }
        })
        .then(res => res.json())
        .then(data => data.cardDetails)
        .then(details => {
          handleName(details.name)
          handleDescription(details.description)
          handleInterests(details.interests)
          handleLinkdin(details.linkdIn)
          handleTwitter(details.twitter)
          console.log(details.interests)
        })
    }, [username, password])

    function handleEdit() {
        navigate("/details")
    }

    return (
        <>
            <div className="card">
                <h3 className="name">{name}</h3>
                <p className="description">{desc}</p>
                <h4 className="interestsHeader">Intersts</h4>
                <ul className="interestsList">
                    {interests.map(interest => <li key={interest} className="interestItem">{interest}</li>)}
                </ul>
                <a className="link" href={linkdinLink}>LinkedIn</a>
                <a className="link" href={twitterLink}>Twitter</a>
            </div>
            <button onClick={handleEdit} className="link">Edit details</button>
            <button onClick={handleDeleteAccount} className="link">Delete Account</button>
        </>
    )
}