import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export function Details({username, password, name, desc, interests, linkdinLink, twitterLink, handleInterests, handleName, handleDescription, handleLinkdin, handleTwitter}){
   
    const [newInterest, setNewInterest] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("myToken")
    
    function handleChange(e){
        e.preventDefault();
        setNewInterest(e.target.value);
    }

    function handleDelete(interestToDel){
        let updatedInterests = interests.filter(interset => interset != interestToDel);
        handleInterests(updatedInterests);
    }

    function handleSubmit(){
        fetch("http://localhost:3000/makecard", {
            method: "PUT",
            body: JSON.stringify({
                cardDetails: {
                    name: name,
                    description: desc,
                    interests: interests,
                    linkdIn: linkdinLink,
                    twitter: twitterLink
                }
            }), 
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                username: username,
                password: password
            }
        })
        .then((res) => {
            if(!res.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            navigate("/card")
        })
        .catch(err => {
            console.error("fetch errors", err);
        })
    }

    return(
        <form className="details-container">
            <label className="details-label" htmlFor="name">Your Name:</label><br/>
            <input className="input-field" type="text" value={name} onChange={(e) => handleName(e.target.value)}/><br/>
            
            <label className="details-label" htmlFor="about">About You:</label><br/>
            <input className="input-field" type="text" value={desc} onChange={(e) => handleDescription(e.target.value)}/><br/>
            
            <label className="details-label" htmlFor="interests">Interests:</label><br/>
            <input className="input-field" type="text" value={newInterest} onChange={handleChange}></input>
            <button className="add-btn" type="button" onClick={() => {
                handleInterests(newInterest);
                setNewInterest("");
            }}>Add Interest</button>
            <ul>
                {interests.map(interest => <li key={interest} className="interestItem">{interest} <DeleteOutlinedIcon onClick={() => handleDelete(interest)}/></li>)}
            </ul>
            
            <label className="details-label" htmlFor="linkdin">Linkdin Link:</label><br/>
            <input className="input-field" type="text" value={linkdinLink} onChange={(e) => handleLinkdin(e.target.value)}/><br/>
            
            <label className="details-label" htmlFor="twitter">Twitter Link:</label><br/>
            <input className="input-field" type="text" value={twitterLink} onChange={(e) => handleTwitter(e.target.value)}/><br/>

            <button className="details-btn" type="button" onClick={handleSubmit}>Submit details</button>
        </form>
    )
}