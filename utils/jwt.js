// utils/jwt.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.jwt_secret;

function sign(payload) {
  return jwt.sign(payload, SECRET, {expiresIn: '24h'});
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify };