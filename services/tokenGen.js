const jwt = require('jsonwebtoken');

module.exports = (req) => {
  const { password, ...dataWithoutPass } = req.body;

  const { SECRET } = process.env;

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign(dataWithoutPass, SECRET, jwtConfig);

  return token;
};