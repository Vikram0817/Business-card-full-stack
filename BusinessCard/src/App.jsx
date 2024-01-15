import { useState } from 'react'
import { Businesscard } from './components/Businesscard'
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './components/Details';
import { Signup } from './components/Signup';
import { Home } from './components/Home';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [interests, setInterests] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [linkdinLink, setLinkdinLink] = useState("")
  const [twitterLink, settwitterLink] = useState("")

  const [token, setToken] = useState("");

  function handleUsernameChange(uName){
    setUsername(uName);
  }

  function handlePasswordChange(pass){
    setPassword(pass);
  }

  function handleInterests(interest){
    if(Array.isArray(interest)){ // for bsuiness card -> it gets fetched interests list from DB and set new state for interests
      setInterests(interest);
    }else{
      setInterests([...interests, interest]); // for details -> it adds new interest on each click
    }
  }

  function handleName(n){
    setName(n);
  }
  
  function handleDescription(d){
    setDescription(d);
  }
  
  function handleLinkdin(link){
    setLinkdinLink(link);
  }
  
  function handleTwitter(link){
    settwitterLink(link);
  }

  const commonProps = {
    username,
    password,
    name,
    desc: description,
    interests,
    linkdinLink,
    twitterLink,
    handleName,
    handleDescription,
    handleInterests,
    handleLinkdin,
    handleTwitter,
    handleUsernameChange,
    handlePasswordChange
  };  

  const commonAuthProps = {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' 
        element={
          <Home />
        }>
        </Route>
        <Route
          path="/signup"
          element={<Signup {...commonAuthProps} />}
        />
        <Route
          path="/login"
          element={<Login {...commonAuthProps} />}
        />
        <Route
          path="/card"
          element={<Businesscard {...commonProps} />}
        />
        <Route
          path="/details"
          element={<Details {...commonProps} />}
        />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App