/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const { email } = await jwt.verify(token, SECRET);
    try {
      const user = await User.findOne({ where: { email } });
      const allUsers = await User.findAll();
      return res.status(200).json(allUsers);
    } catch (e) {
      next(e);
    }
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};