import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SnakeGame from './SnakeGame';
import Leaderboard from '../components/Leaderboard';
import '../styles/gamepage.css';
import { fetchUsername } from '../utils/User';

const Snakepage = () => {
  const [username, setUsername] = useState("");
  const [gameStage, setGameStage] = useState("start"); // 'start', 'playing', 'gameover'

  useEffect(() => {
    const getUsername = async () => {
      const username = await fetchUsername();
      if (username) {
        setUsername(username);
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
        
         <Leaderboard game="Snake Game"/>
        
        </>
      )}
      {gameStage === "playing" && <SnakeGame username={username} onGameOver={handleGameOver} />}
      {gameStage === "gameover" && <Leaderboard game="Snake Game" />}
    </div>
  );
};

export default Snakepage;
