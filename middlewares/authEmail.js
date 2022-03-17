const isValidEmail = require('../services/emailValidation');

module.exports = (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (email === '') {
      return res
        .status(400)
        .json({ message: '"email" is not allowed to be empty' }); 
    }

    if (!email) return res.status(400).json({ message: '"email" is required' });

    if (!isValidEmail(email)) { 
      return res
        .status(400)
        .json({ message: '"email" must be a valid email' });
    }
    next();
  } catch (e) {
    next(e);
  }
};