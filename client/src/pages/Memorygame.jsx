import React, { useState, useEffect } from 'react';
import Memory from '../components/Memory';
import Leaderboard from '../components/Leaderboard';
import '../styles/gamepage.css';
import { fetchUsername } from '../utils/User';

const Memorypage = () => {
  const [username, setUsername] = useState("");
  const [gameStage, setGameStage] = useState("start"); // 'start', 'playing', 'gameover'

  useEffect(() => {
    const getUsername = async () => {
      try {
        const username = await fetchUsername();
        if (username) {
          setUsername(username);
        }
      } catch (err) {
        console.error("Failed to fetch username:", err);
      }
    };

    getUsername();
  }, []);

  const handleNewGame = () => {
    setGameStage("playing");
  };

  const handleGameOver = () => {
    setGameStage("gameover");
  };

  return (
    <div className='game'>
      {gameStage === "start" && (
        <>
          <div className='gamecont'>
            <button className="btn" onClick={handleNewGame}>New Game</button>
          </div>
          <Leaderboard game="Memory Game"/>
        </>
      )}
      {gameStage === "playing" && <Memory username={username} />}
      {gameStage === "gameover" && <Leaderboard game="Memory Game" />}
    </div>
  );
};

export default Memorypage;
