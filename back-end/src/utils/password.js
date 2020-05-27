const bcrypt = require("bcrypt");

const saltRounds = 10;

function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

function checkPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, checkPassword };
