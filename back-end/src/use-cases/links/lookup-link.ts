import { Link } from "../../entities/links";

type DataAccess = {
  findOneByLink: (link: string) => Promise<Link | undefined>;
};

function buildLookupLink(dataAccess: DataAccess) {
  return async function getLink(link: string): Promise<Link | undefined> {
    const linkDoc = await dataAccess.findOneByLink(link);

    if (linkDoc) {
      return linkDoc;
    } else {
      return undefined;
    }
  };
}

export default buildLookupLink;
