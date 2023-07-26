import { useEffect, useState, useMemo, useCallback } from "react";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  //const [g, setG] = useState([]);
  const [fin, setFin] = useState([]);



    const getPlayers = () => {
      
      fetch("http://localhost:5000/check")
    
      .then((res) => { 
        return res.json()
      })
      .then((data) => {
        let pl = [];
        let i = 0;
        let val = 0;
        while (data[i]) {
          pl.push({ user: data[i].account, score: data[i].score });

          //let player = {username: players[i], score: scores[i]};
          
          i++;
        }
        setPlayers(pl.map((p) => p.user));
        setScores(pl.map((p) => p.score));
        setFin(pl);
        //console.log(pl);
        return pl;
      })
      
    }
    useEffect(() => {
      getPlayers();
    }, []);

    //console.log(players);
    //return newPlay;
    //console.log(players[0])
  //console.log(players);
  //const g = useMemo(() => [], []);

  useEffect(() => {
    let temp = [];
    for (let u = 0; u < players.length; u++) {
      let pl = {user: players[u], score: scores[u]};
      temp.push(pl);
    }
    //setG(temp);
    setFin(temp);
    //console.log(fin);
  }, [players, scores])

  fin.sort(function(a,b) {return b.score - a.score});

  return (
    <div>
      <div>
        <h2 className="result2">Leaderboard</h2>
      </div>
      <div className="ldb">
        <table className="tb1">
          <thead>
          </thead>
          <tbody>
              {fin.map((p,index) => {
                return (
                  <tr key = {p.user}>
                    <td className="gth">{index + 1}</td>
                    <td className="tbl">{p.user}</td>
                    <td className="scr">{p.score}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default Leaderboard;