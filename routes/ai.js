// routes/ai.js
const router = require('express').Router();
const { generateDescription } = require('../controllers/aiController');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

// Only Admins can use the AI tool to save costs/abuse
router.post('/generate', verifyTokenAndAdmin, generateDescription);

module.exports = router;