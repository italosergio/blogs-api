const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req);

    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};