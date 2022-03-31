const findAllPosts = require('../services/findAllPosts');

module.exports = async (req, res, next) => {
  try {
    const { q: searchTerm } = req.query;
    const { posts } = await findAllPosts(req);
    const postFinded = posts
      .filter((e) => e.title.includes(searchTerm) || e.content.includes(searchTerm));
    return res.send(postFinded);
  } catch (err) {
    next(err);
  }
};