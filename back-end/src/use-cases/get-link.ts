import { Link } from "../link";
import { LinkResource } from "./types";

import toResource from "./to-resource";

function buildGetLink(db: {
  findOneById: (id: string) => Promise<Link | undefined>;
}) {
  return async function getLink(id: string): Promise<LinkResource | undefined> {
    const link = await db.findOneById(id);

    if (link) {
      return toResource(link);
    } else {
      return undefined;
    }
  };
}

export default buildGetLink;
