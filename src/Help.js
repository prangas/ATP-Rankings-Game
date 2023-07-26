import help1 from "./help1.PNG";
import help2 from "./help2.png";
import { useNavigate } from "react-router-dom";

function Help() {
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    nav("/home");
  }

  return (
    <div className="popup">
      <div className="ins">
        <div>        
          <h2 className="htp">How to Play</h2>
        </div>
        <hr/>
        <div>
          <h4>Use the slider (or arrows) to guess the player's current ATP ranking:</h4>
        </div>
        <div className="help1">
          <img src = {help1} className="help1"/>
        </div>
        <div>
          <h4>Press submit (or enter) to lock in your answer:</h4>
        </div>
        <div className="help1">
          <img src = {help2} className="help2"/>
        </div>
        <div>
          <h4>Your guess will be either Correct, or the player's actual ranking will be Higher or Lower than your guess.</h4>
        </div>
        <div>
          <h4>A correct first guess is awarded 10 Points, second guess 5 Points, and third guess 3 Points.</h4>
        </div>
        <div>
          <h4> After 3 incorrect guesses, a new player will appear.</h4>
        </div>
        <div className="hf">
          <button className="stbtn" onClick={handleSubmit}>Start!</button>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );

}

export default Help;