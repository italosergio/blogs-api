const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req, res, next);
    const { id } = req.params;
    
    return res.status(200).json(posts[id - 1]);
  } catch (err) {
    next(err);
  }
};