import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

async function protectedRoute(req, res, next) {
// console.log("Protected Route Middleware");    
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findOne({ _id: decoded.id }).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
    }catch (error) {
    return res.status(500).json({ message: 'Error in server: ' + error.message });
  }
}

export default protectedRoute;