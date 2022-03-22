const { User } = require('../models');

module.exports = async (req) => {
  const { email } = req.decode;
  const userData = await User.findOne({ where: { email } });
  const user = userData.dataValues;
  return { user };
};