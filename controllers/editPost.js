const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req, res, next);
    return res.send(posts[1]);
  } catch (err) {
    next(err);
  }
};