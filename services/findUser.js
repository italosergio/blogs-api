const tokenDecoder = require('./tokenDecoder');
const { User } = require('../models');

module.exports = async (req) => {
  const token = req.header('authorization');
    const { email } = tokenDecoder(token);
    const userData = await User.findOne({ where: { email } });
    const user = userData.dataValues;
    return { user };
};