import { v4 } from "uuid";
import shortId from "shortid";

import txtDB from "../db/txtDB";
import { hashPassword } from "../utils/password";

export interface Link {
  id: string;
  author: string;
  link: string;
  destination: string;
  password?: string;
  expiry?: string;
  created: string;
}

export interface LinkCreator {
  destination: string;
  author: string;
  password?: string;
  expiry?: string;
}

async function makeLink({ destination, author, password, expiry }: LinkCreator): Promise<Link> {
  let hash;

  if (password) {
    hash = await hashPassword(password);
  }

  return {
    id: v4(),
    author,
    link: shortId(),
    destination,
    password: hash,
    expiry,
    created: new Date().toISOString(),
  };
}

async function addOne({
  destination,
  author,
  password = undefined,
  expiry = undefined,
}: LinkCreator) {
  return txtDB.addOne(await makeLink({ destination, author, password, expiry }));
}

function findOneByLink(link: string) {
  return txtDB.findOne<Link>("link", link);
}

function findOneById(id: string) {
  return txtDB.findOne<Link>("id", id);
}

function getAll() {
  return txtDB.find<Link>();
}

export default {
  addOne,
  findOneByLink,
  findOneById,
  getAll,
};
