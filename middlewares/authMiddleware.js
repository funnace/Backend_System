const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Middleware to check for specific roles
function checkRole(requiredRole) {
  return (req, res, next) => {
    const userRole = req.user?.role;  // Get the role from the decoded token
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
}

module.exports = { authenticateJWT, checkRole };