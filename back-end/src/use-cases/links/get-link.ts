import { Link } from "../../entities/links";
import { LinkResource } from "./interfaces";

import toResource from "./to-resource";

type DataAccess = {
  findOneById: (id: string) => Promise<Link | undefined>;
};

function buildGetLink(dataAccess: DataAccess) {
  return async function getLink(
    id: string,
    asResource = true
  ): Promise<LinkResource | Link | undefined> {
    const link = await dataAccess.findOneById(id);

    if (link) {
      return asResource ? toResource(link) : link;
    } else {
      return undefined;
    }
  };
}

export default buildGetLink;
