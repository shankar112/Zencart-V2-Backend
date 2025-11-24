const router = require('express').Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');

router.post('/', verifyToken, createOrder);
// FIX: Now uses verifyTokenAndAuthorization so users can ONLY see their own orders
router.get('/find/:userId', verifyTokenAndAuthorization, getUserOrders);

module.exports = router;