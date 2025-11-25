// index.js
const dotenv = require('dotenv');
// 1. LOAD SECRETS FIRST
dotenv.config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const userRoute = require('./routes/user'); // <-- NEW IMPORT

// Check Keys
console.log("Stripe Key Loaded:", process.env.STRIPE_KEY ? "YES" : "NO");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database
if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully! 🍃'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
}

// Register Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);
app.use('/api/users', userRoute); // <-- NEW ROUTE

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => { res.send('Welcome to the ZenCart-V2 API! 🛒🔥'); });

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});