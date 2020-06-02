import buildAddLink from "./add-link";
import buildGetLink from "./get-link";
import buildLookupLink from "./lookup-link";
import buildGetAllLinks from "./get-all-links";

import db from "../../data-access";

export const addLink = buildAddLink(db);
export const getLink = buildGetLink(db);
export const lookupLink = buildLookupLink(db);
export const getAllLinks = buildGetAllLinks(db);

export { LinkResource } from "./interfaces";

export default { addLink, getLink, lookupLink, getAllLinks };
