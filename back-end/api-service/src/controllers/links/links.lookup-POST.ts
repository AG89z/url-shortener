import { Response } from "express";
import { AuthenticatedRequest } from "../../libs/checkJwt";

import LinksService, { isError } from "../../services/links";

import makeError from "./utils/make-error";
import { SoftError, LinkResource } from "../../services/links/interfaces";

type RequestBody = {
  link: string;
};

async function linksLookupPOST(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const { link } = req.body as RequestBody;

  const found = (await LinksService.lookupLink(link)) as
    | SoftError
    | LinkResource;

  if (isError(found)) {
    return res.status(404).json(makeError(found.type, found.message));
  } else {
    if (user) {
      return res.status(200).json(found);
    }

    if (!found.protected) {
      return res
        .status(200)
        .json({ ...found, author: undefined, id: undefined });
    }

    if (found.protected) {
      return res.status(200).json({
        ...found,
        author: undefined,
        id: undefined,
        destination: undefined,
      });
    }
  }
}

export default linksLookupPOST;
