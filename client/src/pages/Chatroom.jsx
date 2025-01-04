import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../styles/chat.css";

const Chatroom = () => {
  const { room } = useParams(); // Get the room parameter from URL
  const location = useLocation();
  const { username } = location.state || { username: "Guest" }; // Get the username from state
  const navigate = useNavigate(); // For navigation
const el=document.getElementById('cm');
if(el){
  el.scrollTop = el.scrollHeight;
}
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]); // State for user list
  const chatMessagesRef = useRef(null); // Ref for messages container
  const socketRef = useRef(null); // Ref for socket instance
 const containerRef = useRef(null);
  useEffect(() => {
    if(containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }
    socketRef.current = io("http://localhost:5000");
  
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    socket.emit("joinroom", { username, room });

    socket.on("roomusers", ({ room, users }) => {
     // console.log("Room users:", { room, users });
      outputRoomName(room);
      outputUsers(users);
    });

    socket.on("message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      const chatMessages = chatMessagesRef.current;
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [room, username,containerRef, navigate]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      socketRef.current.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  // Function to handle leaving the room
  const handleLeaveRoom = () => {
    const leave = window.confirm("Do you want to leave?");
    if (leave) {
      navigate("/"); // Redirect to home or any other route
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Function to update room name in the UI
  const outputRoomName = (room) => {
    const roomNameElement = document.getElementById("room-name");
    if (roomNameElement) {
      roomNameElement.innerText = room;
    }
  };

  // Function to update users list in the UI
  const outputUsers = (users) => {
    const usernamesElement = document.getElementById("users");
    if (usernamesElement) {
      usernamesElement.innerHTML = users
        .map((user) => `<li>${user.username}</li>`)
        .join("");
    }
  };
  return (
    <div className="chatroom container-fluid">
      <header className="chatroom-header row ">
        <div className="col-9">
          <h1 className="room-name">Room: <span id="room-name">{room}</span></h1>
        </div>
        <div className="col-3 text-end">
          <button id="leave-btn" onClick={handleLeaveRoom} className="btn leave-btn">Leave Room</button>
        </div>
      </header>
      <div className="chatroom-main row flex-grow-1">
        <div className="chatroom-sidebar col-md-3 d-none d-md-block">
          <h3>Users</h3>
          <ul id="users">
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div id='cm' ref={containerRef} className="chatroom-messages col-md-9" >
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.username === username ? 'my-message' : ''}`}>
              <p className="meta">{msg.username} {msg.time}</p>
              <p className="text">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      <form id="chat-form" onSubmit={handleFormSubmit} className="chat-form fixed-bottom bg-light p-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message..."
          required
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;

