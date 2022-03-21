const { Categorie } = require('../models');

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(400).json({ message: '"categoryId" is required' });

  const findCategory = (id) => Categorie.findOne({ where: { id } });

  const getCategory = async () => {
    const category = categoryIds.map((id) => findCategory(id));
    const resolve = await Promise.all(category);
    return resolve.some((e) => !e);
  };

  const categoryExist = await getCategory();
  if (categoryExist) return res.status(400).json({ message: '"categoryId" not found' });

  next();
};