import React, { useState, useEffect } from "react";
import "../styles/room.css"; // Import your CSS file for styles
import { useNavigate } from "react-router-dom";
import { fetchUsername } from "../utils/User";
const RoomEntry = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsername = async () => {
      const username = await fetchUsername();
      if (username) {
        setUsername(username);
      }
    };

    getUsername();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., redirect to chatroom
    navigate(`/chat/${room}`, { state: { username } });
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <input
              type="text"
              name="room"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            >
            </input>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default RoomEntry;
