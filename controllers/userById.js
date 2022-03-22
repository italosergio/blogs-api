const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};