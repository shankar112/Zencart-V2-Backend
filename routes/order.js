// routes/order.js
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/verifyToken'); // Any logged-in user can buy
const router = require('express').Router();

// CREATE ORDER
router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS (My Order History)
router.get('/find/:userId', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;