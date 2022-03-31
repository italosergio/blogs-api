const { User } = require('../models');

module.exports = (req, res, next) => {
  try {
    const { email } = req.decode;
    User.destroy({ where: { email } });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};