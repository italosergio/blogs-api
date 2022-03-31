const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req);
    const { id } = req.params;
  
    if (!posts[id - 1]) return res.status(404).json({ message: 'Post does not exist' });
    next();
  } catch (error) {
    next(error);
  }
};
