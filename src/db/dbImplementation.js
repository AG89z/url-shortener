const fs = require("fs");
const uuid = require("uuid").v4;
const shortId = require("shortid");

const db = "db.txt";

function addOne({ destination, password = null, expiry = null }) {
  return new Promise((resolve, reject) => {
    const newLink = {
      id: uuid(),
      link: shortId(),
      destination,
      password,
      expiry,
      created: new Date().toISOString(),
    };
    fs.appendFile(db, `${JSON.stringify(newLink)}\n`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newLink);
      }
    });
  });
}

function findOneBy(by, value) {
  return new Promise((resolve, reject) => {
    fs.readFile(db, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const entries = data
          .toString()
          .split(/(?:\n)/g)
          .map((s) => s && JSON.parse(s));
        const found = entries.find((entry) => entry[by] === value);
        resolve(found);
      }
    });
  });
}

function findOneByLink(link) {
  return findOneBy("link", link);
}

function findOneById(id) {
  return findOneBy("id", id);
}

function getAll() {
  return new Promise((resolve, reject) => {
    fs.readFile(db, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const entries = data
          .toString()
          .split(/(?:\n)/g)
          .map((s) => s && JSON.parse(s))
          .filter((s) => Boolean(s));

        resolve(entries);
      }
    });
  });
}

module.exports = {
  addOne,
  findOneByLink,
  findOneById,
  getAll,
};
