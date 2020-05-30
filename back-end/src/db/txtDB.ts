import fs from "fs";
import path from "path";

const DB = path.join(__dirname, "../../__DB.txt");

function addOne<T>(document: T) {
  return new Promise<T>((resolve, reject) => {
    fs.appendFile(DB, `${JSON.stringify(document)}\n`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(document);
      }
    });
  });
}

function findOne<T>(key: string, value: string) {
  return new Promise<T>((resolve, reject) => {
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

function find<T>(key: string | null = null, value: string | null = null) {
  return new Promise<T[]>((resolve, reject) => {
    fs.readFile(DB, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const entries = data
          .toString()
          .split(/(?:\n)/g)
          .map((s) => s && JSON.parse(s))
          .filter((s) => Boolean(s) && (!key || s[key] === value));

        resolve(entries);
      }
    });
  });
}

export = {
  addOne,
  findOne,
  find,
};
