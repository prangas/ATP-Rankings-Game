import './App.css';
import React, {useState, useEffect} from "react";
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import logo from "./768px-Tennis_ball_3.svg.png";
import question from "./question.png"
import Home from "./Home";
import CreateAccount from './CreateAccount';
import Login from './Login';
import LoggedIn from './LoggedIn';
import Results from './Results';
import Leaderboard from './Leaderboard';
import Help from './Help';


function App() {

  const [login, setLogin] = useState("Login");
  const [score, setScore] = useState(0);
  const [thisScore, setThisScore] = useState(0);

  const loggedIn = (user) => {
    setLogin(user);
  }

  const getScore = (score) => {
    setScore(score)
  }
  
  const updateScore = (val) => {
    setScore(val);
  }

  const tS = (val) => {
    setThisScore(val);
  }

  if (login != "Login") {
    return (
      <div className = "nav">
          
          <nav className='nav'>
          <Link to = "/my-app/help"><img src = {question} style = {{height:"auto", width: "30px"}}/></Link>
            <Link to = "/my-app/home">ATP Rankings Game</Link>
            <Link to = "/my-app/user" className='loginNav'>{login}</Link>
          </nav>
          <hr className='hr'/>
          <Routes>
            <Route path = "/my-app/home" element = {<Home score = {score} user = {login} sendScore = {updateScore} thisGame = {tS}/>}></Route>
            <Route path = "/my-app/create-account" element = {<CreateAccount />}></Route>
            <Route path = "/my-app/user" element = {<LoggedIn user = {login} score = {score} />}></Route>
            <Route path = "/my-app/results" element = {<Results score = {thisScore}/>}></Route>
            <Route path = "/my-app/leaderboard" element = {<Leaderboard/>}></Route>
            <Route path = "/my-app/help" element = {<Help />}></Route>
          </Routes>
          
          </div>
   
    );
  }
  else {
    return (
      <div className = "nav">
          
          <nav className='nav'>
            <Link to = "/my-app/help"><img src = {question} style = {{height:"auto", width: "30px"}}/></Link>
            <Link to = "/my-app/home">ATP Rankings Game</Link>
            <Link to = "/my-app/login" className='loginNav'>{login}</Link>
          </nav>
          <hr className='hr'/>
          <Routes>
            <Route path = "/my-app/home" element = {<Home user = {login}/>}></Route>
            <Route path = "/my-app/create-account/" element = {<CreateAccount />}></Route>
            <Route path = "/my-app/login" element = {<Login sendBack = {loggedIn} sendUp = {getScore} />}></Route>
            <Route path = "/my-app/results" element = {<Results score = {thisScore}/>}></Route>
            <Route path = "/my-app/leaderboard" element = {<Leaderboard/>}></Route>
            <Route path = "/my-app/help" element = {<Help />}></Route>
          </Routes>
          
          </div>
   
    );
  }


}

export default App;
