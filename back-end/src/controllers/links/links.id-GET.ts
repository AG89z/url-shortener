import { Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/checkJwt";

import LinksService from "../../use-cases/links";

import makeError from "../../errors/makeError";

async function linksIdGET(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const { id } = req.params;

  const link = await LinksService.getLink(id);

  const authorized = link && link.author === user!.id;

  if (link && authorized) {
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

export default linksIdGET;
