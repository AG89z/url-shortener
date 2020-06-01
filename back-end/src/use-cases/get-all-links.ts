import { Link } from "../link";
import { LinkResource } from "./types";

import toResource from "./to-resource";

function buildGetAllLinks(db: { findAll: () => Promise<Link[]> }) {
  return async function getAllLinks(): Promise<LinkResource[]> {
    return (await db.findAll()).map(toResource);
  };
}

export default buildGetAllLinks;
