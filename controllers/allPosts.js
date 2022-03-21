const { BlogPost, PostsCategorie, Categorie } = require('../models');
const findUser = require('../services/findUser');

module.exports = async (req, res, next) => {
  const allPosts = await BlogPost.findAll();
  const postsCategories = await PostsCategorie.findAll();
  const allCategories = await Categorie.findAll();

  const getPostCategories = (id) => postsCategories
    .reduce((acc, crr) => (crr.postId === id ? [...acc, crr.categoryId] : [...acc]), []);
  
  const { user } = await findUser(req);

  const posts = allPosts.map((post) => {
    const postCategories = getPostCategories(post.dataValues.id);
    const categories = allCategories.filter((cat) => postCategories.some((id) => id === cat.id));

    return {
    ...post.dataValues,
    user,
    categories,
    };
  });
  return res.status(200).json(posts);
};