const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

module.exports = (token) => jwt.verify(token, SECRET);