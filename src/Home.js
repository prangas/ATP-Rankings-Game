import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import arrow from "./arrow.png";



let used = [];
let randomNumber =  0;
let total = 0;
function Home (props) {
  const [playerName, setPlayerName] = useState([]);
  const [playerRanking, setPlayerRanking] = useState(0);
  const [guess, setGuess] = useState("1");
  //const [total, setTotal] = useState(0);
  const [guessNumber, setGuessNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const correctValue = playerRanking;
  const nav = useNavigate();
  const loc = useLocation();
  let ogScore = 0;

  if (props.user === "Login") {
    nav("/login")
    used = [];
  }
  if (props.reset === "yes") {
    used = [];
  }



  
  // const h =  tory();
  // if (loggedIn === false) {
  //   history.push("/login");
  // }
  



  function getNumber () {
    if (used.length === 20) {
      randomNumber = 0;
    }
    else {
      randomNumber = Math.floor(Math.random() * 20) + 1;
      //console.log(randomNumber);
  
      while (used.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 20) + 1;
      }
      used.push(randomNumber);

    }

  }
  const fetchData = async () => {

      getNumber();
      //console.log(used);
      if (randomNumber === 0) {
        setPlayerName("Done");
        ogScore = await getScore();
        //console.log(ogScore);
        if (total > ogScore) {
          updateScore();
          await props.sendScore(total);
        } 
        await props.thisGame(total);
        nav("/results");

      }
      else {
        fetch("http://localhost:5000/users")
        .then((res) => { 
          return res.json()
        })
        .then((data) => {
          setPlayerName(data[randomNumber-1].first + " " + data[randomNumber-1].last);
          setPlayerRanking(data[randomNumber-1].rank)
        })
      }

      
    };
  
  useEffect(() => {
    fetchData()
  }, [])
//const first = props.base[0];
  

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(guess) === correctValue) {
      document.getElementById("message").style.color = "green";
      setMessage("Correct");
      if (guessNumber === 1) {
        // setTotal(total + 10);
        total += 10;
      }
      else if (guessNumber === 2) {
        // setTotal(total + 5);
        total += 5;
      }
      else {
        // setTotal(total + 3);
        total += 3;
      }
      setGuessNumber(1);
      fetchData();
    }
    else if (guessNumber < 3){
      document.getElementById("message").style.color = "red";

      if (Number(guess) > correctValue) {
        setMessage("Higher")
      }
      else {
        setMessage("Lower")

      }
      setGuessNumber(guessNumber+1);    
    }
    else {
      setGuessNumber(1);
      document.getElementById("message").style.color = "red";
      setMessage("Incorrect");
      fetchData();
    }
  }
  const handleChange = (e) => {
    setGuess(e.target.value);
  }
  const updateScore = () => {
    fetch("http://localhost:5000/updateScore", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        account: props.user,
        score: total
      })
    })
  }

  const getScore = () => {
    
    return fetch("http://localhost:5000/check")
  
    .then((res) => { 
      return res.json()
    })
    .then((data) => {
      let i = 0;
      let val = 0;
      while (data[i]) {
        if (data[i].account === props.user) {
          //setCheckUser(1);
          val = data[i].score;
          //setScore(val);
        }
        i++;
      }
      //console.log(val);
      return val;
    })
    
  }

  //let names = props.data.map(x => x.first);
  //const name = props.data[randomNumber-1].first + " " + props.data[randomNumber-1].last;
  const text = `${playerName} `;
  //console.log(guessNumber)
  return (
    <div>
  
        <div className="form">
    
          <form onSubmit={handleSubmit}>
            
              <h2 className= "name">
                {text}
              </h2>
              <div>
                <label>Rank: {guess}</label>
                
              </div>
              <input className = "slider"type="range" min = "1" max = "20" value = {guess} onChange={handleChange}></input>
              <div>
              <button className = "submit" onSubmit={handleSubmit}>
                Submit
              </button>
              </div>
    
              <h2 className = "score">{total}</h2>
              <h3 id="message" className="message">{message}</h3>
          </form>
        </div>
    </div>

  );
}

export default Home;