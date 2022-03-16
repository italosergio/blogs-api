module.exports = (req, res, next) => {
  try {
    const { displayName } = req.body;
    if (displayName.length < 8) { 
      return res
        .status(201)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
  } catch (e) {
    next(e);
  }
};