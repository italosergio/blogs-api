const PostsCategorie = (sequelize, DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', {
    categoryId: DataTypes.INTEGER,
  });

  return postsCategorie;
};

module.exports = PostsCategorie;