// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Configure Environment Variables
dotenv.config();

// 2. Initialize Express App
const app = express();

// 3. Middleware (The Bouncers)
app.use(express.json()); // Allows us to accept JSON data in requests
app.use(cors()); // Allows our future React frontend to talk to us

// 4. Basic Route (Test)
app.get('/', (req, res) => {
  res.send('Welcome to the ZenCart-V2 API! 🛒🔥');
});

// 5. Start Server
const PORT = process.env.PORT || 5000; // 5000 is standard for E-commerce backends
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});