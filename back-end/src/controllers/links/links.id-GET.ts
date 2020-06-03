import { Response } from "express";
import { AuthenticatedRequest } from "../../libs/checkJwt";

import LinksService, { isError } from "../../services/links";

import makeError from "./utils/make-error";

async function linksIdGET(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const { id } = req.params;

  const link = await LinksService.getLink(id);

  if (isError(link)) {
    return res.status(404).json(makeError(link.type, link.message));
  } else {
    const authorized = link.author === user!.id;

    if (authorized) {
      return res.status(200).json(link);
    } else if (link && !authorized) {
      return res
        .status(401)
        .json(
          makeError("UNAUTHORIZED", "You are not authorized to view this link")
        );
    } else {
      return res
        .status(404)
        .json(makeError("NOT FOUND", `No link found with id ${id}`));
    }
  }
}

export default linksIdGET;
