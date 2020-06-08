import buildMakeLink from "./link";

import makeId from "../../libs/makeId";
import makeShortId from "../../libs/makeShortId";
import { hash } from "../../libs/hash";

const makeLink = buildMakeLink(makeId, makeShortId, hash);

export { Link, LinkCreator } from "./interfaces";

export default makeLink;
