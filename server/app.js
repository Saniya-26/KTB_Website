// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const socketIo = require('socket.io');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const formatMsg = require("./utils/messages");
// const {
//   userJoin,
//   getCurrUser,
//   userLeave,
//   getRoomUsers,
// } = require("./utils/users");
// dotenv.config({ path: './config.env' });

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:5173', // Your React app's origin
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URL);

// app.use('/api', require('./routes/auth'));

// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });

// app.get("/", async (req, res) => {
//   res.status(200).json({
//     message: "Hello ",
//   });
// });


//  io.on("connection", (socket) => {
//   console.log("New WebSocket connection", socket.id);

//   // When a user joins a room
//   socket.on("joinroom", ({ username, room }) => {
//      // console.log('Join request:', { username, room });
//       const user = userJoin(socket.id, username, room);
//       //console.log('User added:', user);
//       socket.join(user.room);
//       socket.emit("message", formatMsg('Chat Bot', 'Welcome to the chat room!'));
//       socket.broadcast.to(user.room).emit("message", formatMsg('Chat Bot', `${user.username} has joined the chat`));
//       io.to(user.room).emit("roomusers", {
//           room: user.room,
//           users: getRoomUsers(user.room),
//       });
//   });

//   // When a message is sent
//   socket.on("sendMessage", (msg) => {
//       const user = getCurrUser(socket.id);
//       if (user) {
//          // console.log('Message received:', { user, msg });
//           io.to(user.room).emit("message", formatMsg(user.username, msg));
//       } else {
//           console.error('User not found for socket ID:', socket.id);
//       }
//   });

//   // When a user disconnects
//   socket.on("disconnect", () => {
//       const user = userLeave(socket.id);
//       if (user) {
//           io.to(user.room).emit("message", formatMsg('Chat Bot', `${user.username} has left the chat`));
//           io.to(user.room).emit("roomusers", {
//               room: user.room,
//               users: getRoomUsers(user.room),
//           });
//       }
//       console.log('User disconnected:', socket.id);
//   });
// });




// const connectDB = () => {
//   mongoose.set("strictQuery", true);
//   mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => console.log("Connected to Mongo DB"))
//     .catch((err) => {
//       console.error("Failed to connect with MongoDB");
//       console.error(err);
//     });
// };

// const startServer = async () => {
//   try {
//     connectDB();
//     server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const { userJoin, getCurrUser, userLeave, getRoomUsers } = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'], credentials: true } });
dotenv.config({ path: './config.env' });
const formatMsg = require("./utils/messages");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/leaderboardRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({ success: false, status, message });
});

// WebSocket handling (chat)
io.on('connection', (socket) => {
  console.log('New WebSocket connection', socket.id);

  socket.on('joinroom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", formatMsg('Chat Bot', 'Welcome to the chat room!'));
    socket.broadcast.to(user.room).emit("message", formatMsg('Chat Bot', `${user.username} has joined the chat`));
    io.to(user.room).emit('roomusers', { room: user.room, users: getRoomUsers(user.room) });
  });

  socket.on('sendMessage', (msg) => {
    const user = getCurrUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", formatMsg(user.username, msg));
    }
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit("message", formatMsg('Chat Bot', `${user.username} has left the chat`));
      io.to(user.room).emit('roomusers', { room: user.room, users: getRoomUsers(user.room) });
    }
  });
});

// Start the server
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => console.error("Failed to connect with MongoDB", err));
};

const startServer = async () => {
  try {
    connectDB();
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
