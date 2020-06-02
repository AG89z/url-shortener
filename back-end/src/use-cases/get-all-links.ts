import { Link } from "../link";
import { LinkResource } from "./types";

import toResource from "./to-resource";

type DataAccess = {
  findAllByAuthor: (authorId: string) => Promise<Link[]>;
};

function buildGetAllLinks(dataAccess: DataAccess) {
  return async function getAllLinks(authorId: string): Promise<LinkResource[]> {
    return (await dataAccess.findAllByAuthor(authorId)).map(toResource);
  };
}

export default buildGetAllLinks;
