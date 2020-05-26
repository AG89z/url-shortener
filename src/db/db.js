const DB = require("./dbImplementation");

function addOne({ destination, password = null, expiry = null }) {
  return DB.addOne({ destination, password, expiry });
}

function findOneByLink(link) {
  return DB.findOneByLink(link);
}

function findOneById(id) {
  return DB.findOneById(id);
}

function getAll() {
  return DB.getAll();
}

module.exports = {
  addOne,
  findOneByLink,
  findOneById,
  getAll,
};
