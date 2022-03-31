const findAllPosts = require('../services/findAllPosts');
const findUser = require('../services/findUser');

module.exports = async (req, res, next) => {
 try {
  const { id: postId } = req.params;
  const { posts } = await findAllPosts(req);
  const { userId: postUserId } = posts[postId - 1];

  const { user: { id: userId } } = await findUser(req);

  if (postUserId !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  next();
 } catch (err) {
   next(err);
 }
};