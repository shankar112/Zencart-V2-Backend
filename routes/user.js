// routes/user.js
const router = require('express').Router();
const { deleteUser } = require('../controllers/userController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');

// DELETE USER
// verifyTokenAndAuthorization ensures you can only delete YOUR OWN account (or if you are admin)
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);

module.exports = router;