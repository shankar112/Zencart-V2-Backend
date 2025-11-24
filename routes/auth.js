// routes/auth.js
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("User already exists");
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Save to DB
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // 1. Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    // 2. Compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json("Wrong credentials!");
    }

    // 3. Create Access Token
    // We need a secret key in .env for this to work securely
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || "fallback_secret_key", // Use .env or fallback
      { expiresIn: "3d" }
    );

    // 4. Send response (exclude password)
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;