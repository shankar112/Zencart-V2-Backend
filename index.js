// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order'); // <-- Import Order Route

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully! 🍃'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
}

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute); // <-- Use Order Route

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => { res.send('Welcome to the ZenCart-V2 API! 🛒🔥'); });
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });