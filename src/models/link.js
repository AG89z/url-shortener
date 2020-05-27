const uuid = require("uuid").v4;
const shortId = require("shortid");

const txtDB = require("../db/txtDB");

function makeLink({ destination, password, expiry }) {
  return {
    id: uuid(),
    link: shortId(),
    destination,
    password,
    expiry,
    created: new Date().toISOString(),
  };
}

function addOne({ destination, password = null, expiry = null }) {
  return txtDB.addOne(makeLink({ destination, password, expiry }));
}

function findOneByLink(link) {
  return txtDB.findOne("link", link);
}

function findOneById(id) {
  return txtDB.findOne("id", id);
}

function getAll() {
  return txtDB.getAll();
}

module.exports = {
  addOne,
  findOneByLink,
  findOneById,
  getAll,
};
