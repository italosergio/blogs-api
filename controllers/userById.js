const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};