// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // FIX: Use standard 'authorization' header
  
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    
    // FIX: Remove hardcoded fallback. Fail if env var is missing.
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json("Server configuration error: JWT_SECRET missing");
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// NEW: Check if the user is the owner of the data OR an admin
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };