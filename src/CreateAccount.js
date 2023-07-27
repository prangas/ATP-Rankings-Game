import React, {useState } from "react";
import {HashRouter, Route, Link, useNavigate, Routes} from 'react-router-dom';
import Login from "./Login";
 
function CreateAccount () {

  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [checkUser, setCheckUser] = useState(0);
  const [checkPass, setCheckPass] = useState(0);
  let x = 0;
  let y = 0;
  const nav = useNavigate();
  const [goToLoginText, setGoToLoginText] = useState("Already have an account? Log in")
  const loginSubmit = async (e) => {
    setCheckUser(0);
    setCheckPass(0);

    e.preventDefault();

    x = await fetchUsers();
    
    //setCheckUser(x);
    // console.log(x + "X")
    //console.log(checkUser + "CU");
    y = await fetchPasses();
    
    
    //setCheckPass(y);
    // console.log(y + "Y")
    //console.log(checkPass + "CP");
    const u = verifyUser();
    //console.log(userName.length);
    const p = verifyPass();
    //setTimeout(100);
    //console.log(useC);
    //console.log(userName);

    if (u === 0 && p === 0) {
      //   fetchUsers();
      //   fetchPasses();
      // console.log(checkUser);
      // if (up === 1) {
      //   setError("username already exists");
      //   setError2("");
      // }
      // else if (cp === 1) {
      //   setError2("password already exists");
      //   setError("");
      // }
      // else {
        setError("");
        setError2("");
        postUser();
        nav("/login", {state: {coming: 1}});
        setGoToLoginText("Account Created! Log in here");
      // }
    }
    if (verifyUser() === 1) {
      setError("username too short")
      setError2("");
    }
    else if (verifyUser() === 2) {
      setError("username too long")
      setError2("");
    }
    else if (verifyUser() === 3) {
      setError("username already exists")
      setError2("");
    }
    else if (verifyPass() === 3) {
      setError2("password must contain a number")
      setError("");
    }
    else if (verifyPass() === 4) {
      setError2("password must contain a symbol")
      setError("");
    }
    else if (verifyPass() === 1) {
      setError2("password too short")
      setError("");
    }
    else if (verifyPass() === 2) {
      setError2("password too long")
      setError("");
    }
    else if (verifyPass() === 5) {
      setError2("password already exists")
      setError("");
    }
  }

  const handleUser = (e) => {
    setUserName(e.target.value);
  }

  const handlePass = (e) => {
    setPass(e.target.value);
  }

  function verifyUser () {
    if (userName.length < 1) {
      return 1;
    }
    if (userName.length > 15) {
      return 2;
    }
    if (x === 1) {
      return 3;
    }
    return 0;
  }

  function verifyPass () {
    if (pass.length < 1) {
      return 1;
    }
    if (pass.length > 15) {
      return 2;
    }
    if (!(/\d/.test(pass))) {
      return 3;
    }
    if (!(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>.\?]/g.test(pass))) {
      return 4;
    }
    if (y === 1) {
      return 5;
    }

    return 0;
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
          // console.log("here");
          val =  1;
        }
        i++;
      }
      return val;
    })
    
  }
  const postUser = () => {
    fetch("http://localhost:5000/createAcc", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        account: userName,
        password: pass
      })
    })
  }

  return (
    <div className="login">
      <form onSubmit={loginSubmit}>
        <fieldset className="loginField">
          <div>
            <h2 className="caLabel">Create Account</h2>
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
            <button className="loginButton" >Create Account</button>
          </div>
          <div className="goToCreate">
            <Link to =  "/login" >{goToLoginText}</Link>
          </div>
          <Routes>
            <Route path = "../login" element = {<Login />}></Route>
          </Routes>
        </fieldset>
      </form>

    </div>

  );
}

export default CreateAccount;