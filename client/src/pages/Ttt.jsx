import React, { useState, useEffect } from 'react';

const Ttt = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;
    const newBoard = board.slice();
    newBoard[index] = 'X'; // Player's move
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    setWinner(checkWinner(board));
  }, [board]);

  useEffect(() => {
    if (isPlayerTurn || winner) return;

    // AI's move with a delay
    const delay = 500; // 1 second delay
    const timer = setTimeout(() => {
      const availableMoves = board
        .map((value, index) => (value === null ? index : null))
        .filter((index) => index !== null);
      if (availableMoves.length === 0) return;

      const randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoard = board.slice();
      newBoard[randomMove] = "O"; // AI's move
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlayerTurn, winner, board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="ttt-container" style={styles.container}>
      <h1 style={styles.header}>Tic Tac Toe</h1>
      {winner ? (
        <h2 style={styles.winner}>Winner: {winner}</h2>
      ) : (
        <h2 style={styles.turn}>Current Turn: {isPlayerTurn ? 'Player (X)' : 'AI (O)'}</h2>
      )}
      <div style={styles.board}>
        {board.map((value, index) => (
          <div
            key={index}
            className={`ttt-cell ${value ? 'occupied' : ''}`}
            onClick={() => handleClick(index)}
            style={styles.cell}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={resetGame} style={styles.button}>Restart</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '0 auto',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  winner: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#ff0000',
  },
  turn: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 70px)',
    gap: '5px',
    justifyContent: 'center',
  },
  cell: {
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
  button: {
    marginTop: '20px',
  
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#7537d7',
    color: '#fff',
    border: 'none',
    justifyContent: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Ttt;
