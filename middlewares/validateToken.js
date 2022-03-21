const tokenDecoder = require('../services/tokenDecoder');

module.exports = (req, res, next) => {
  try {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
      tokenDecoder(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (err) {
    next(err);
  }
};