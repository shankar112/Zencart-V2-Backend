const router = require('express').Router();
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

router.post('/', verifyTokenAndAdmin, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;