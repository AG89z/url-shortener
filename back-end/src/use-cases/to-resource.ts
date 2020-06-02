import config from "../config";

import { Link } from "../link";
import { LinkResource } from "./types";

function toResource(link: Link): LinkResource {
  return {
    ...link,
    password: undefined,
    link:
      config().NODE_ENV === "development"
        ? `http://localhost:${config().PORT}/${link.link}`
        : `https://${config().DOMAIN}/${link.link}`,
    protected: Boolean(link.password),
  };
}

export default toResource;
