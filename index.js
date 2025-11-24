// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product'); // <-- Import product routes

// 1. Configure Environment Variables
dotenv.config();

// --- DEBUGGING: Check if MONGO_URI is loaded ---
console.log("Attempting to connect to DB..."); 
// -----------------------------------------------

// 2. Initialize Express App
const app = express();

// 3. Middleware
app.use(express.json());
app.use(cors());

// 4. Connect to MongoDB
if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined. Check your .env file!");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully! 🍃'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
}

// 5. Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute); // <-- Use Product Routes

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the ZenCart-V2 API! 🛒🔥');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});