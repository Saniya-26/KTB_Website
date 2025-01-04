# KTB Web Application

## Overview

**KTB** is a web application that combines games, chatrooms, and a meme generator into a single platform. It offers an interactive and fun experience for users while providing essential features like real-time chat and leaderboard tracking.

---

## Features

### 1. **Games Module**

- Includes a **Snake Game** with leaderboard tracking.
- **Memory game** with scoreboard.
- A single player simple **Tic-Tac-Toe** game.

### 2. **Chatroom Module**

- Real-time chat functionality using **Socket.IO**.
- Room creation, joining, and leaving options.
- Supports multiple simultaneous chatrooms.

### 3. **Meme Generator Module**

- Allows users to create custom memes with editable text and images.
- Supports downloading generated memes.

### 4. **Authentication System**

- User login and registration functionality.
- Secure session management with token-based authentication.

---

## Project Structure

```
KTB/
├── frontend/           # React frontend code
│   ├── public/         # Static assets
│   ├── src/            # React components and pages
│   ├── package.json    # Frontend dependencies
|   ├── .gitignore      # Ignored files for Git 
│   └── vite.config.js  # Vite configuration file
│
├── server/             # Node.js backend code
│   ├── middleware/     # Authentication and validation
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── app.js          # Main server file
|   ├── .gitignore      # Ignored files for Git 
│   └── config.env      # Environment variables
|
├── README.md           # Project documentation
```

---

## Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/Saniya-26/KTB_Website.git
cd KTB_Website
```

### 2. **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

### 3. **Backend Setup**

```bash
cd ../server
npm install
node app.js
```

---

## Usage

1. Start the frontend and backend servers.
2. Access the application at: `http://localhost:5173`

---

## Technologies Used

- **Frontend**: React, Redux, Vite, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)

---

## Implementation

- **Drive link**: https://drive.google.com/file/d/1lYe7BqlRA1iT_ZqOPCVd92Q9xqTArBzq/view?usp=drive_link 
---

## Credits

- **Frontend Inspiration**: Based on templates and ideas shared by [Mikhiel Benji](https://github.com/Mikhiel39).

---



