import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/leaderboard.css'; // Import the CSS file
import gold from '../assets/images/leaderboard/gold.jpg';
import { getLeaderboard } from '../api/index';
const Leaderboard = ({ game }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const token = localStorage.getItem('authToken');
  //console.log(token)
  if (!token) {
    setError('No token found');
    return;
  }
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard(token,game);
        setLeaderboard(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeaderboard();
  }, [game]);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard for {game}</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>
                {index + 1}
              </td>
              <td className="player-name">{entry.username}</td>
              <td className="score">{entry.score} {game === "Memory Game" ? "Turns" : "Points"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
