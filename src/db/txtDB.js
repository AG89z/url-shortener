const fs = require("fs");
const path = require('path');

const DB = path.join(__dirname, "__DB.txt");

function addOne(document) {
  return new Promise((resolve, reject) => {
    fs.appendFile(DB, `${JSON.stringify(document)}\n`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(document);
      }
    });
  });
}

function findOne(key, value) {
  return new Promise((resolve, reject) => {
    fs.readFile(DB, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const entries = data
          .toString()
          .split(/(?:\n)/g)
          .map((s) => s && JSON.parse(s));
        const found = entries.find((entry) => entry[key] === value);
        resolve(found);
      }
    });
  });
}

function getAll() {
  return new Promise((resolve, reject) => {
    fs.readFile(DB, (err, data) => {
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
  findOne,
  getAll,
};
