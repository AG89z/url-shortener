const uuid = require("uuid").v4;
const shortId = require("shortid");

const txtDB = require("../db/txtDB");
const { hashPassword } = require("../utils/password");

function makeLink({ destination, author, password, expiry }) {
  return hashPassword(password).then((hash) => ({
    id: uuid(),
    author,
    link: shortId(),
    destination,
    password: hash,
    expiry,
    created: new Date().toISOString(),
  }));
}

async function addOne({ destination, author, password = null, expiry = null }) {
  return txtDB.addOne(await makeLink({ destination, author, password, expiry }));
}

function findOneByLink(link) {
  return txtDB.findOne("link", link);
}

function findOneById(id) {
  return txtDB.findOne("id", id);
}

function getAll() {
  return txtDB.find();
}

module.exports = {
  addOne,
  findOneByLink,
  findOneById,
  getAll,
};
