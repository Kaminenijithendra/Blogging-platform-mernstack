import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('JWT Secret:', process.env.JWT_SECRET);
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    try {
      req.user = await User.findById(user.id);
      if (!req.user) return res.sendStatus(404); // User not found
      next();
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' }); // Error finding user
    }
  });
};

export default authenticateToken;
