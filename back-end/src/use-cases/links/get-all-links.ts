import { Link } from "../../entities/links";
import { LinkResource } from "./interfaces";

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
