import textDB from "../libs/txtDB";

import { Link } from "../entities/links";

async function addOne(link: Link): Promise<Link> {
  return textDB.addOne(link);
}

async function findOneByLink(link: string): Promise<Link | undefined> {
  return textDB.findOne("link", link);
}

async function findOneById(id: string): Promise<Link | undefined> {
  return textDB.findOne("id", id);
}

async function findAllByAuthor(authorId: string): Promise<Link[]> {
  return textDB.find<Link>("author", authorId);
}

export default { addOne, findOneByLink, findOneById, findAllByAuthor };
