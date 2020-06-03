import { Response } from "express";
import { AuthenticatedRequest } from "../../libs/checkJwt";

import LinksService from "../../services/links";

async function linksGET(req: AuthenticatedRequest, res: Response) {
  const { user } = req;

  const links = await LinksService.getAllLinks(user!.id);

  return res.status(200).json(links);
}

export default linksGET;
