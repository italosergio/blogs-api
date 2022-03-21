const { BlogPost, PostsCategorie, User } = require('../models');
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

async function dbPostsCategoriesDefine(postId, categoryId) {
  return PostsCategorie.create({ postId, categoryId });
}

async function createBlogPost(title, content, userId, published) {
  return BlogPost.create({ title, content, userId, published });
} 

async function createPostsCategory(postId, categoryIds) {
  return categoryIds.map((categoryId) => dbPostsCategoriesDefine(postId, categoryId));
} 

module.exports = async (req, res, next) => {
  try {
  const { id } = await getPostId();
  const { userId } = await getUser(req);
  const { title, content, categoryIds } = req.body;
  getDate();
  const { published } = getDate();

  await createBlogPost(title, content, userId, published);
  await createPostsCategory(id, categoryIds);
  
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