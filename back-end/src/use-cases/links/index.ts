import buildAddLink from "./add-link";
import buildGetLink from "./get-link";
import buildLookupLink from "./lookup-link";
import buildGetAllLinks from "./get-all-links";

import linksDataAccess from "../../data-access/links";

export const addLink = buildAddLink(linksDataAccess);
export const getLink = buildGetLink(linksDataAccess);
export const lookupLink = buildLookupLink(linksDataAccess);
export const getAllLinks = buildGetAllLinks(linksDataAccess);

export { LinkResource } from "./interfaces";

export default { addLink, getLink, lookupLink, getAllLinks };
