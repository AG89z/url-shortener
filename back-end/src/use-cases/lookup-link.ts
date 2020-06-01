import { Link } from "../link";
import { LinkResource } from "./types";

import toResource from "./to-resource";

function buildLookupLink(db: {
  findOneByLink: (link: string) => Promise<Link | undefined>;
}) {
  return async function getLink(
    link: string
  ): Promise<LinkResource | undefined> {
    const linkDoc = await db.findOneByLink(link);

    if (linkDoc) {
      return toResource(linkDoc);
    } else {
      return undefined;
    }
  };
}

export default buildLookupLink;
