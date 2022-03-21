const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(400).json({ message: 'Invalid fields' });
    next();
  } catch (e) {
    next(e);
  }
};