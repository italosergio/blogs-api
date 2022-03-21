const { BlogPost } = require('../models');
const { User } = require('../models');
const tokenDecoder = require('../services/tokenDecoder');

async function getPostId() {
  const posts = await BlogPost.findAll() || 0;
  const id = Object.keys(posts).length + 1 || 1;
  return { id };
}

async function getUser(req) {
  const token = req.headers.authorization;
  const { email } = tokenDecoder(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;
  return { userId };
}

function getDate() {
  const now = new Date(Date.now()).toISOString();
  const published = now;
  return { published };
}

module.exports = async (req, res, next) => {
  try {
  const { id } = await getPostId();
  const { userId } = await getUser(req);
  const { title, content } = req.body;
  getDate();
  const { published } = getDate();

  await BlogPost.create({ title, content, userId, published });

  const obj = {
    id,
    userId,
    title,
    content,
  };
  
  return res.status(201).json(obj);
 } catch (err) {
   next(err);
 }
};