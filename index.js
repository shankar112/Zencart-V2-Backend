// // index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoute = require('./routes/auth');
// const productRoute = require('./routes/product');
// const orderRoute = require('./routes/order'); // <-- Import Order Route
// const stripeRoute = require('./routes/stripe');

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// if (!process.env.MONGO_URI) {
//   console.error("FATAL ERROR: MONGO_URI is not defined.");
// } else {
//   mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB Connected Successfully! 🍃'))
//     .catch((err) => console.error('MongoDB Connection Error:', err));
// }

// app.use('/api/auth', authRoute);
// app.use('/api/products', productRoute);
// app.use('/api/orders', orderRoute); // <-- Use Order Route
// app.use('/api/checkout', stripeRoute);

// const PORT = process.env.PORT || 5000;
// app.get('/', (req, res) => { res.send('Welcome to the ZenCart-V2 API! 🛒🔥'); });
// app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });

// index.js
const dotenv = require('dotenv');
// 1. LOAD SECRETS FIRST (Critical Fix)
dotenv.config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes (Now safe because dotenv is loaded)
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe'); // <-- Import Stripe Route

// --- DEBUGGING: Check if Keys are loaded ---
console.log("Stripe Key Loaded:", process.env.STRIPE_KEY ? "YES" : "NO");
// -----------------------------------------------

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully! 🍃'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
}

// Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute); // <-- Use Stripe Route

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => { res.send('Welcome to the ZenCart-V2 API! 🛒🔥'); });

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});