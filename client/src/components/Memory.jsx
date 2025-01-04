import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/memory.css";
import Memcard from "./Memcard";
import helmet from "../assets/images/MemGame/helmet-1.png";
import potion from "../assets/images/MemGame/potion-1.png";
import ring from "../assets/images/MemGame/ring-1.png";
import scroll from "../assets/images/MemGame/scroll-1.png";
import shield from "../assets/images/MemGame/shield-1.png";
import sword from "../assets/images/MemGame/sword-1.png";
import cover from "../assets/images/MemGame/cover.png";
import { Link } from "react-router-dom";

const cardImages = [
  { src: helmet, matched: false },
  { src: potion, matched: false },
  { src: ring, matched: false },
  { src: scroll, matched: false },
  { src: shield, matched: false },
  { src: sword, matched: false },
];

const Memory = ({ username }) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showTurns, setShowTurns] = useState(false);
  const [gameOver, setGameOver] = useState(false); // Track if the game is over
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  const shuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards.slice(0, 12)); // Limit to 12 cards
    setTurns(0);
    setShowTurns(true);
    setGameOver(false); // Reset game over status
    setGameStarted(true); // Set game as started
  };

  const handleChoice = (card) => {
    if (disabled) return; // Prevent choices if the game is disabled
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceTwo(null);
    setChoiceOne(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const postNewScore = async (username, game, score) => {
    try {
      await axios.post('http://localhost:5000/api/leaderboard', { username, game, score });
      onGameOver();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      postNewScore(username, "Memory Game", turns);
      setGameOver(true); // Set game over status when the game is completed
    }
  }, [cards]);

  return (
    <div>
      {!gameOver && !gameStarted ? (
        <div className='game-start'>
          <button className='btn' onClick={shuffle}>Shuffle Cards</button>
        </div>
      ) : (
        <>
          <div className="card-grid-container">
            <div className="card-grid">
              {cards.map((card) => (
                <Memcard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  cover={cover}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
          {showTurns && (
            <div className="dispturn">
              <h3>Turns: {turns}</h3>
            </div>
          )}
          {gameOver && (
            <div className="game-over">
              <h2>Game Over</h2>
              <p>Your score: {turns} turns</p>
              <Leaderboard game="Memory Game" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Memory;
