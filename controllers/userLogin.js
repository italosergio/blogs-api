const tokenGen = require('../services/loginTokenGen');

module.exports = async (req, res, next) => {
  try {
    const token = await tokenGen(req);
    res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};