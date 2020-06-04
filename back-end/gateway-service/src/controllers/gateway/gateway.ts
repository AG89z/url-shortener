import { Request, Response } from "express";
import service, { isError } from "../../service";
import path from "path";

async function gateway(req: Request, res: Response) {
  const match = /\/(.+)\/?/.exec(req.baseUrl);

  const link = match && match[1];

  const errorView = path.join(__dirname, "../../../src/views/error");

  if (!link) {
    return res.status(400).render(errorView, {
      message: "No link in the request",
      status: 400,
    });
  }

  const found = await service.lookupLink(link);

  if (isError(found)) {
    return res.status(404).render(errorView, {
      message: found.message,
      status: 404,
    });
  }

  const { expiry, destination } = found;

  const expired = expiry && new Date() > new Date(expiry);

  if (expired) {
    return res.status(403).render(errorView, {
      message: `The link ${link} is expired`,
      status: 403,
    });
  }

  if (found.protected && !expired) {
    return res.render("../src/views/gateway", { link });
  }

  if (!found.protected && !expired) {
    if (destination) {
      return res.redirect(destination);
    } else {
      return res.status(404).render(errorView, {
        message: `The link ${link} has not destination URL`,
        status: 404,
      });
    }
  }
}

export default gateway;
