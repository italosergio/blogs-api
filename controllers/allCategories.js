const { Categorie, User } = require('../models');
const tokenDecoder = require('../services/tokenDecoder');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('authorization');
    const { email } = tokenDecoder(token);

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'User not authorized!' });
  
      const allCategories = await Categorie.findAll();
      return res.status(200).json(allCategories);
    } catch (err) {
      next(err);
    }
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};