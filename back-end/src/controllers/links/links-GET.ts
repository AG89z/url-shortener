import { Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/checkJwt";

import LinksService from "../../use-cases/links";

async function linksGET(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const links = await LinksService.getAllLinks(user!.id);

  return res.status(200).json(links);
}

export default linksGET;
