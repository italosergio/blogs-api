module.exports = (req, res, next) => {
  try {
    const { password } = req.body;

    if (password === '') {
      return res
        .status(400)
        .json({ message: '"password" is not allowed to be empty' }); 
    }
    
    if (!password) return res.status(400).json({ message: '"password" is required' });

    if (password.length !== 6) { 
      return res
        .status(400)
        .json({ message: '"password" length must be 6 characters long' });
    }
    next();
  } catch (e) {
    next(e);
  }
};