const PostsCategorie = (sequelize, DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', {
    categoryId: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });

  return postsCategorie;
};

module.exports = PostsCategorie;