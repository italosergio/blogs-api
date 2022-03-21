const PostsCategorie = (sequelize, DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });

  return postsCategorie;
};

module.exports = PostsCategorie;