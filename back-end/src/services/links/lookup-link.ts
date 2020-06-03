import { Link } from "../../entities/links";

import { SoftError } from "./interfaces";

type DataAccess = {
  findOneByLink: (link: string) => Promise<Link | undefined>;
};

function buildLookupLink(dataAccess: DataAccess) {
  return async function getLink(link: string) {
    const linkDoc = await dataAccess.findOneByLink(link);

    if (linkDoc) {
      return linkDoc;
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
