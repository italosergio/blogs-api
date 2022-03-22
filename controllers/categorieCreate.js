const { Categorie, User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.decode;
    await User.findOne({ where: { email } });

    const { name } = req.body;
    if (name === '') return res.status(400).json({ message: '"name" is not allowed to be empty' });
    if (!name) return res.status(400).json({ message: '"name" is required' });

    const categorieWithThisName = await Categorie.findOne({ where: { name } });
    if (categorieWithThisName) return res.status(404).json({ message: 'Category exists' });

    await Categorie.create({ name });
    const categorie = await Categorie.findOne({ where: { name } });
    return res.status(201).json(categorie);
  } catch (err) {
    next(err);
  }
};