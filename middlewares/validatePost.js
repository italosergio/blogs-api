module.exports = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  console.log(categoryIds);
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!categoryIds) return res.status(400).json({ message: '"categoryId" is required' });
  next();
};