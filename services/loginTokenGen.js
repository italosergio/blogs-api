const jwt = require('jsonwebtoken');

module.exports = (req) => {
  const { password, ...dataWithoutPass } = req.body;

  const { JWT_SECRET } = process.env;

  const jwtConfig = {
    expiresIn: '5m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(dataWithoutPass, JWT_SECRET, jwtConfig);

  return token;
};