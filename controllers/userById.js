const { User } = require('../models');
const tokenDecoder = require('../services/tokenDecoder');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('authorization');
    const { email } = tokenDecoder(token);
  
    const { id } = req.params;
    const user = await User.findOne({ where: { id, email } });
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};