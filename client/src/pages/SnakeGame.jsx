import { useEffect, useRef, useState } from "react";
import axios from "axios";
const GRID_SIZE = 12;
const CELL_SIZE = 30; // Adjust size for better visibility
const INITIAL_SNAKE = [[5, 5]];

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_SIZE);
  const y = Math.floor(Math.random() * GRID_SIZE);
  return [x, y];
};

export default function SnakeGame({ username, onGameOver }) {
  const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood());
  const directionRef = useRef([1, 0]); // Start moving right
  const intervalRef = useRef();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!gameOver) {
      intervalRef.current = setInterval(() => {
        setSnakeBody((prevSnakeBody) => {
          const newHead = [
            prevSnakeBody[0][0] + directionRef.current[0],
            prevSnakeBody[0][1] + directionRef.current[1],
          ];

          // Check for collisions with walls or self
          if (
            newHead[0] < 0 ||
            newHead[0] >= GRID_SIZE ||
            newHead[1] < 0 ||
            newHead[1] >= GRID_SIZE ||
            prevSnakeBody.some(([x, y]) => x === newHead[0] && y === newHead[1])
          ) {
            // Game over: reset the snake
            setGameOver(true);
            clearInterval(intervalRef.current);
            return prevSnakeBody;
          }

          const newSnakeBody = [newHead, ...prevSnakeBody];
          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            // Snake ate the food: generate new food
            setScore((prevScore) => prevScore + 10);
            setFood(generateFood());
          } else {
            // Move the snake: remove the last segment
            newSnakeBody.pop();
          }

          return newSnakeBody;
        });
      }, 200);

      const handleDirection = (e) => {
        const key = e.key;
        if (key === "ArrowUp" && directionRef.current[1] !== 1) {
          directionRef.current = [0, -1];
        } else if (key === "ArrowLeft" && directionRef.current[0] !== 1) {
          directionRef.current = [-1, 0];
        } else if (key === "ArrowRight" && directionRef.current[0] !== -1) {
          directionRef.current = [1, 0];
        } else if (key === "ArrowDown" && directionRef.current[1] !== -1) {
          directionRef.current = [0, 1];
        }
      };

      window.addEventListener("keydown", handleDirection);

      return () => {
        clearInterval(intervalRef.current);
        window.removeEventListener("keydown", handleDirection);
      };
    }
  }, [food, gameOver]);

  useEffect(() => {
    if (gameOver && typeof onGameOver === 'function') {
      onGameOver(); // Call the callback to update the game stage
    }
  }, [gameOver, onGameOver]);

  const postNewScore = async (username, game, score) => {
    try {
      await axios.post('http://localhost:5000/api/leaderboard', { username, game, score });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (gameOver) {
      if (username) {
        postNewScore(username, "Snake Game", score); // Post score when game is over
      }
    }
  }, [gameOver, score, username]);

  const renderGrid = () => {
    return Array.from({ length: GRID_SIZE }).map((_, yc) => (
      Array.from({ length: GRID_SIZE }).map((_, xc) => (
        <div
          key={`${xc}-${yc}`}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: isSnakeBodyDiv(xc, yc) ? 'green' : 
              food[0] === xc && food[1] === yc ? 'red' : 'white',
            borderRadius: food[0] === xc && food[1] === yc ? '50%' : '0',
            display: 'inline-block',
            boxSizing: 'border-box',
            border: getBorderStyle(xc, yc), // Adjust border style
          }}
        />
      ))
    ));
  };

  const getBorderStyle = (xc, yc) => {
    if (
      xc === 0 || xc === GRID_SIZE - 1 || // Left or right border
      yc === 0 || yc === GRID_SIZE - 1 // Top or bottom border
    ) {
      return '2px solid black'; // Only show outer border
    }
    return 'none'; // No border for inner cells
  };

  const isSnakeBodyDiv = (xc, yc) => {
    return snakeBody.some(([x, y]) => x === xc && y === yc);
  };


  return (
    <div>
      {gameOver ? (
        <div>
          <h1>Game Over</h1>
          <div className="score">Final Score: {score}</div>
          <button onClick={() => window.location.reload()}>New Game</button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gap: '0px',
            margin: 'auto',
            width: `${CELL_SIZE * GRID_SIZE}px`,
            height: `${CELL_SIZE * GRID_SIZE}px`,
          }}
        >
          {renderGrid()}
          <div className="score">Score: {score}</div>
        </div>
      )}
    </div>
  );
}
