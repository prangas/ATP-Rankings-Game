import React, {useState} from "react";
import {Route, Link, useNavigate, useLocation, Routes} from 'react-router-dom';

function Login ({sendBack, sendUp, coming}) {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [checkUser, setCheckUser] = useState(0);
  const [checkPass, setCheckPass] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [score, setScore] = useState(0);
 // const [loginText, setLoginText] = useState("Login");
  let x = 0;
  let y = 0;
  let z = 0;
  const nav = useNavigate();
  const loc = useLocation();


  const loginSubmit = async (e) => {
    e.preventDefault();
    x = await fetchUsers();
    if (x === 0) {
      setError("username does not exist");
      setError2("");
    }
    else {
      y = await fetchPasses();
      if (y === 0) {
        setError2("incorrect password");
        setError("");

      }
      else {
        z = await fetchScores();
        setScore(z);
        setError("");
        setError2("");
        console.log("Logged in");
        setLoggedIn(true);
        sendBack(userName);
        sendUp(score);
        nav("/home", {state: {reset: "no"}});
      }
    }
  }

  const handleUser = (e) => {
    setUserName(e.target.value);
  }

  const handlePass = (e) => {
    setPass(e.target.value);
  }

  // useEffect(() => {
  //   fetchUsers()
  // }, [])
  // let val = 0;
  const fetchUsers = () => {
    
    return fetch("http://localhost:5000/check")
  
    .then((res) => { 
      return res.json()
    })
    .then((data) => {
      let i = 0;
      let val = 0;
      while (data[i]) {
        if (data[i].account === userName) {
          setCheckUser(1);
          
          val = 1;
        }
        i++;
      }
      //console.log(val);
      return val;
    })
    
  }
  const fetchScores = () => {
    
    return fetch("http://localhost:5000/check")
  
    .then((res) => { 
      return res.json()
    })
    .then((data) => {
      let i = 0;
      let val = 0;
      while (data[i]) {
        if (data[i].account === userName) {
          setCheckUser(1);
          val = data[i].score;
          setScore(val);
        }
        i++;
      }
      //console.log(val);
      return val;
    })
    
  }
  // useEffect(() => {
  //   fetchPasses()
  // }, [])
  const fetchPasses = () => {
    
    return fetch("http://localhost:5000/checkPass")
  
    .then((res) => { 
      return res.json()
    })
    .then((data) => {
      let i = 0;
      let val = 0;
      while (data[i]) {
        if (data[i].password === pass) {
          setCheckPass(1);
          console.log("here");
          val =  1;
        }
        i++;
      }
      return val;
    })
    
  }
  // const postUser = () => {
  //   fetch("http://localhost:5000/createAcc", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       account: userName,
  //       password: pass
  //     })
  //   })
  // }
  return (
<div className="login">
      <form onSubmit={loginSubmit}>
        <fieldset className="loginField">
          <div>
            <h2 className="caLabel">Login</h2>
          </div>
          <div>
            <label className="userLabel">Username: </label><input type="field" className="inp" onChange={handleUser}></input>
          </div>
          <div>
            <p className="errorLogin">{error}</p>
          </div>
          <div>
            <label className="userLabel">Password: </label><input type="password" className="inp" onChange={handlePass}></input>
          </div>
          <div>
            <p className="errorLogin">{error2}</p>
          </div>
          <div>
            <button className="loginButton" >Login</button>
          </div>
          <div className="goToCreate">
            <Link to =  "/create-account" >Don't have an account? Sign up</Link>
          </div>
          <Routes>
            <Route path = "../create-account" element = {<Login />}></Route>
          </Routes>
        </fieldset>
      </form>

    </div>
  )
}

export default Login;