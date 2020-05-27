const uuid = require("uuid").v4;
const shortId = require("shortid");

const txtDB = require("../db/txtDB");

function makeLink({ destination, author, password, expiry }) {
  return {
    id: uuid(),
    author,
    link: shortId(),
    destination,
    password,
    expiry,
    created: new Date().toISOString(),
  };
}

function addOne({ destination, author, password = null, expiry = null }) {
  return txtDB.addOne(makeLink({ destination, author, password, expiry }));
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
