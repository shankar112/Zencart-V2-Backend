// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
    
    jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key", (err, user) => {
      if (err) {
        // FIX: Added 'return' to stop execution if token is invalid
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // Check if user exists and is admin
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };