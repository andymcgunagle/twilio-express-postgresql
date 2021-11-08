import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  };

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add decoded token to the request object as it's being passed through this middleware
    req.user = decoded;

    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  };
};