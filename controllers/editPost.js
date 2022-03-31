const findAllPosts = require('../services/findAllPosts');
const { BlogPost } = require('../models');
const getUpdatedDate = require('../services/getDate');

module.exports = async (req, res, next) => {
  try {
    const { posts } = await findAllPosts(req);
    const { id: postId } = req.params;
    const { title, content } = req.body;
    const { updated } = getUpdatedDate();
    const editingPost = { ...posts[postId - 1], title, content, updated };
    const { id, user, ...editedPost } = editingPost;
    
    BlogPost.update(
      { title, content, updated },
      { where: { id: postId } },
    );

    return res.send(editedPost);
  } catch (err) {
    next(err);
  }
};