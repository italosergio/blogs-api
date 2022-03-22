const { BlogPost, PostsCategorie, Categorie } = require('../models');
const findUser = require('../services/findUser');

const getPostCategories = (id, array) => array
  .reduce((acc, crr) => (crr.postId === id ? [...acc, crr.categoryId] : [...acc]), []);
  
module.exports = async (req, res, next) => {
  try {
    const allPosts = await BlogPost.findAll();
    const postsCategories = await PostsCategorie.findAll();
    const allCategories = await Categorie.findAll();
    
    const { user } = await findUser(req);

    const posts = allPosts.map((post) => {
      const postCategories = getPostCategories(post.dataValues.id, postsCategories);
      const categories = allCategories.filter((cat) => postCategories.some((id) => id === cat.id));

      return { ...post.dataValues, user, categories };
    });
    
    const { id } = req.params;
    if (!posts[id - 1]) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(posts[id - 1]);
  } catch (err) {
    next(err);
  }
};