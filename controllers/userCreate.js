const { User } = require('../models');
const tokenGen = require('../services/userTokenGen');

module.exports = async (req, res, next) => {
  try {
    const user = req.body;
    await User.create(user);
    
    const token = tokenGen(req);
    return res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
};