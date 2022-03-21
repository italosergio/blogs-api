const { User } = require('../models');
const findUser = require('../services/findUser');

module.exports = async (req, res, next) => {
  try {
    const { user } = await findUser(req);
    if (!user) return res.status(401).json({ message: 'User not authorized!' });

    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};