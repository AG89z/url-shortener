import fs from "fs";
import path from "path";

const DB = path.join(__dirname, "../../__DB.txt");

function addOne<T>(document: T): Promise<T> {
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

function findAll<T>(): Promise<T[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(DB, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const entries = data
          .toString()
          .split(/(?:\n)/g)
          .reduce(
            (res, s) => (s ? [...res, JSON.parse(s) as T] : res),
            [] as T[]
          );
        resolve(entries);
      }
    });
  });
}

async function findOne<T>(
  key: keyof T,
  value: T[keyof T]
): Promise<T | undefined> {
  return (await findAll<T>()).find((entry) => entry[key] === value);
}

async function find<T>(
  key: keyof T | undefined = undefined,
  value: T[keyof T] | undefined = undefined
): Promise<T[]> {
  return (await findAll<T>()).filter((s) => !key || s[key] === value);
}

export = {
  addOne,
  findOne,
  find,
};
