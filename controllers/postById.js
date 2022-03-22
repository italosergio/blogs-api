const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req, res, next);
    const { id } = req.params;
    
    if (!posts[id - 1]) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(posts[id - 1]);
  } catch (err) {
    next(err);
  }
};