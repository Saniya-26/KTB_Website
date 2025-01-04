const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

// Get Leaderboard Route
router.get('/leaderboard/:game', async (req, res) => {
  try {
    const game = req.params.game;
    let sortOrder = game === 'Memory Game' ? 1 : -1;
    const scores = await Leaderboard.aggregate([
      { $match: { game } },
      { $sort: { date: -1 } },
      { $group: { _id: "$username", mostRecentScore: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$mostRecentScore" } },
      { $sort: { score: sortOrder } },
      { $limit: 10 }
    ]);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Post New Score
router.post('/leaderboard', async (req, res) => {
  const { username, game, score } = req.body;
  const leaderboardEntry = new Leaderboard({ username, game, score });
  try {
    const newEntry = await leaderboardEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
