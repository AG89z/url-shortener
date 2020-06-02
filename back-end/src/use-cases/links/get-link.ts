import { Link } from "../../entities/links";
import { LinkResource } from "./interfaces";

import toResource from "./to-resource";

type DataAccess = {
  findOneById: (id: string) => Promise<Link | undefined>;
};

function buildGetLink(dataAccess: DataAccess) {
  return async function getLink(id: string): Promise<LinkResource | undefined> {
    const link = await dataAccess.findOneById(id);

    if (link) {
      return toResource(link);
    } else {
      return undefined;
    }
  };
}

export default buildGetLink;
