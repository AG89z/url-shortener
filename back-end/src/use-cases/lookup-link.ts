import { Link } from "../link";
import { LinkResource } from "./types";

import toResource from "./to-resource";

type DataAccess = {
  findOneByLink: (link: string) => Promise<Link | undefined>;
};

function buildLookupLink(dataAccess: DataAccess) {
  return async function getLink(
    link: string
  ): Promise<LinkResource | undefined> {
    const linkDoc = await dataAccess.findOneByLink(link);

    if (linkDoc) {
      return toResource(linkDoc);
    } else {
      return undefined;
    }
  };
}

export default buildLookupLink;
