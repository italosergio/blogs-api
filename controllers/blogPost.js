const { BlogPost } = require('../models');
const { User } = require('../models');
const tokenDecoder = require('../services/tokenDecoder');

module.exports = async (req, res, _next) => {
  const { title, content } = req.body;
  await BlogPost.create({ title, content });

  const posts = await BlogPost.findAll() || 0;
  const postId = Object.keys(posts).length;

  const token = req.headers.authorization;
  const SECRET = process.env.JWT_SECRET;
  const { email } = tokenDecoder(token, SECRET);
  const user = await User.findOne({ where: { email } });

  const obj = {
    id: postId,
    usereId: user.id,
    title,
    content,
  };
  
  return res.status(201).json(obj);
};