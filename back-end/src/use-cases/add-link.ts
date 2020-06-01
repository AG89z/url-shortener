import config from "../config";

import makeLink, { LinkCreator, Link } from "../link";
import { LinkResource } from "./types";

import toResource from "./to-resource";

function buildAddLink(db: { addOne: (obj: Link) => Promise<Link> }) {
  return async function addLink({
    destination,
    author,
    expiry = undefined,
    password = undefined,
  }: LinkCreator): Promise<LinkResource | null> {
    const checkDestination = new RegExp(config().ALLOWED_DESTINATIONS);

    if (checkDestination.test(destination)) {
      return toResource(
        await db.addOne(
          await makeLink({ destination, author, password, expiry })
        )
      );
    } else {
      return null;
    }
  };
}

export default buildAddLink;
