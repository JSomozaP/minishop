const jwt = require('jsonwebtoken');

// Middleware pour vérifier le JWT
const checkJwt = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : null;

  if (!token) {
    return res.status(401).json({ 
      error: 'Accès refusé. Token JWT requis.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token JWT invalide.' 
    });
  }
};

module.exports = { checkJwt };
