import config from "../../config";

import makeLink, { LinkCreator, Link } from "../../entities/links";
import { SoftError } from "./interfaces";

import toResource from "./utils/to-resource";

type DataAccess = {
  addOne: (obj: Link) => Promise<Link>;
};

function buildAddLink(dataAccess: DataAccess) {
  return async function addLink({
    destination,
    author,
    expiry = undefined,
    password = undefined,
  }: LinkCreator) {
    const checkDestination = new RegExp(config().ALLOWED_DESTINATIONS);

    if (checkDestination.test(destination)) {
      return toResource(
        await dataAccess.addOne(
          await makeLink({ destination, author, password, expiry })
        )
      );
    } else {
      const error: SoftError = {
        type: "INVALID_DESTINATION",
        message: `${destination} is not a valid destination`,
      };
      return error;
    }
  };
}

export default buildAddLink;
