import { Link } from "../../entities/links";
import { SoftError, LinkResource } from "./interfaces";

import toResource from "./to-resource";

type DataAccess = {
  findOneById: (id: string) => Promise<Link | undefined>;
};

function buildGetLink(dataAccess: DataAccess) {
  return async function getLink(
    id: string,
    asResource = true
  ): Promise<Link | LinkResource | SoftError> {
    const link = await dataAccess.findOneById(id);

    if (link) {
      return asResource ? toResource(link) : link;
    } else {
      const error: SoftError = {
        type: "LINK_NOT_FOUND",
        message: `The Id ${id} does not match any existing link`,
      };
      return error;
    }
  };
}

export default buildGetLink;
