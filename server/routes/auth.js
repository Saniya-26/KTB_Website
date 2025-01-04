// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const {verifyToken}=require('../middleware/verifyToken');
// const {UserLogin,  UserRegister, resetPassword}=require('../controller/routes');
// const Leaderboard=require('../models/Leaderboard');
// // Register
// router.post('/user/register',UserRegister);
// // Login
// router.post('/user/login',UserLogin);
// router.post('/user/reset-password',verifyToken, resetPassword);
// router.get('/user/getuser', (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, process.env.JWT, (err, decoded) => {
//       if (err) return res.status(401).json({ error: 'Unauthorized' });
  
//       // Fetch the user details from your database using decoded.id
//       User.findById(decoded.id)
//         .then(user => {
//           // console.log(user);
//           if (!user) return res.status(404).json({ error: 'User not found' });
  
//           // Return user details including username
//           res.json({
//             username: user.username,
//             email: user.email,
//             // Include other user details as needed
//           });
//         })
//         .catch(error => res.status(500).json({ error: 'Server error' }));
//     });
//   });

//   router.get('/leaderboard/:game', async (req, res) => {
//     try {
//       const game = req.params.game;
//       if(game==="Memory Game"){
//       const scores = await Leaderboard.aggregate([
//         { $match: { game } },
//         { $sort: { date: -1 } },
//         { $group: { _id: "$username", mostRecentScore: { $first: "$$ROOT" } } },
//         { $replaceRoot: { newRoot: "$mostRecentScore" } },
//         { $sort: { score: 1 } }, // Sort by score in ascending order
//         { $limit: 10 }
//       ]);
//       res.json(scores);
//     }
//     else{
//       const scores = await Leaderboard.aggregate([
//         { $match: { game } },
//         { $sort: { date: -1 } },
//         { $group: { _id: "$username", mostRecentScore: { $first: "$$ROOT" } } },
//         { $replaceRoot: { newRoot: "$mostRecentScore" } },
//         { $sort: { score: -1 } }, // Sort by score in descending order
//         { $limit: 10 }
//       ]);
//       res.json(scores);
//     }
  
     
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch leaderboard' });
//     }
//   });
  
  
//   // Post a new score
//   router.post('/leaderboard', async (req, res) => {
//     const { username, game, score } = req.body;
//     const leaderboardEntry = new Leaderboard({ username, game, score });
//     try {
//       const newEntry = await leaderboardEntry.save();
//       res.status(201).json(newEntry);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  

  
// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createError } = require('../error');
const router = express.Router();
const dotenv=require('dotenv');
dotenv.config({ path: './config.env' });
const { verifyToken } = require('../middleware/verifyToken');

// Register Route
router.post('/user/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, 'Email is already in use.'));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    const createdUser = await user.save();

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: '9999 years',
    });

    res.status(200).json({ token, user: createdUser });
  } catch (error) {
    return next(error);
  }
});

// Login Route
router.post('/user/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, 'Incorrect password'));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: '9999 years',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
});

// Reset Password Route
router.post('/user/reset-password', verifyToken, async (req, res, next) => {
  const { newPassword } = req.body;
  const { id } = req.user;

  try {
    if (!newPassword) {
      return res.status(400).json({ error: 'Enter New Password' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({ error: 'New password cannot be the same as the old password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 6);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
