const { BlogPost } = require('../models');
const { User } = require('../models');
const tokenDecoder = require('../services/tokenDecoder');

module.exports = async (req, res, next) => {
 try {
  const { title, content } = req.body;
  await BlogPost.create({ title, content });

  const posts = await BlogPost.findAll() || 0;
  const postId = Object.keys(posts).length || 1;

  const token = req.headers.authorization;
  const { email } = tokenDecoder(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { email } });

  const obj = {
    id: postId,
    usereId: user.id,
    title,
    content,
  };
  
  return res.status(201).json(obj);
 } catch (err) {
   next(err);
 }
};