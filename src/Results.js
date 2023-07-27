import { useNavigate } from "react-router-dom";
function Results(props) {
  const result = "Your Score: " + props.score;
  const navigate = useNavigate();
  const openLeaderboard = () => {
    // e.preventDefault();
    navigate("/my-app/leaderboard");
  }

  return (
    <div>
      <div>
        <h2 className="result">{result}</h2>
      </div>
      <div className="ldr">
        <button className = "leaderButton" onClick = {openLeaderboard}>View Leaderboard</button>
        
      </div>
      <div className="ldr">
      <h2 className="result">Refresh the page and log in to play again</h2>
      </div>
    </div>
  );
}

export default Results;