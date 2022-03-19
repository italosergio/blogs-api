const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (token) => jwt.verify(token, JWT_SECRET);