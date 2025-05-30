const express = require('express');
const bcrypt = require('bcryptjs');  // For password hashing comparison
const User = require('../models/user'); // Adjust path if needed
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password - assuming you hashed password during registration
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Remove password field before sending user data
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
