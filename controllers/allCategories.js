const { Categorie, User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.decode;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'User not authorized!' });

    const allCategories = await Categorie.findAll();
    return res.status(200).json(allCategories);
  } catch (err) {
    next(err);
  }
};