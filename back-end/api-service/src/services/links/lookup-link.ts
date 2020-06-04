import { Link } from "../../entities/links";

import { SoftError, LinkResource } from "./interfaces";

import toResource from "./utils/to-resource";

type DataAccess = {
  findOneByLink: (link: string) => Promise<Link | undefined>;
};

function buildLookupLink(dataAccess: DataAccess) {
  return async function getLink(
    link: string,
    asResource = true
  ): Promise<Link | LinkResource | SoftError> {
    const linkDoc = await dataAccess.findOneByLink(link);

    if (linkDoc) {
      return asResource ? toResource(linkDoc) : linkDoc;
    } else {
      const error: SoftError = {
        type: "LINK_NOT_FOUND",
        message: `The link ${link} does not exist`,
      };
      return error;
    }
  };
}

export default buildLookupLink;
