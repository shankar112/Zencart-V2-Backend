// routes/product.js
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const router = require('express').Router();

// CREATE PRODUCT (Admin Only)
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT BY ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;