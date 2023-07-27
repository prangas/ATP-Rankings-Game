import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoggedIn(props) {
  const nav = useNavigate();

  const handleLog = (e) => {
    e.preventDefault();
    nav("/my-app/create-account");
  }
  const text = "User: " + props.user;
  const [score, setScore] = useState("");
  let max = 0;
  generateText();
  async function generateText () {
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
    max = await getScore();
    setScore("High Score: " + max);
  }

  return (
    <div>
      <p className="kl">{text}</p>
      <p className="kl">{score}</p>
      <p className="kl">Refresh page to log out</p>

    </div>
  )
}
export default LoggedIn;