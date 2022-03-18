module.exports = (req, res, next) => {
  try {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    next();
  } catch (err) {
    next(err);
  }
};