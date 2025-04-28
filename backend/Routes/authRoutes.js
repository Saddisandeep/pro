// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Route: Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

// Route: Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

// 🆕 New Route: Get list of all professors
router.get('/professors', async (req, res) => {
  try {
    const professors = await User.find({ role: 'professor' }).select('_id username');
    res.json(professors);
  } catch (error) {
    console.error('Error fetching professors', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
