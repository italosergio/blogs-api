const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req, res, next);

    res.send(posts[1]);
  } catch (err) {
    next(err);
  }
};