const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    BlogPost.destroy({ where: { id } });

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};