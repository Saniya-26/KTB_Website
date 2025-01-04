const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');

// Get User Profile Route
router.get('/user/getuser', verifyToken, (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });

    User.findById(decoded.id)
      .then(user => {
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ username: user.username, email: user.email });
      })
      .catch(error => res.status(500).json({ error: 'Server error' }));
  });
});

module.exports = router;
