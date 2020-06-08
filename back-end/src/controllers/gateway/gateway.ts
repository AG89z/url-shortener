import { Request, Response } from "express";
import { lookupLink, isError } from "../../services/links";

async function gateway(req: Request, res: Response) {
  const match = /\/(.+)\/?/.exec(req.baseUrl);

  const link = match && match[1];

  if (!link) {
    return res.status(400).render("../src/views/error", {
      message: "No link in the request",
      status: 400,
    });
  }

  const found = await lookupLink(link, false);

  if (isError(found)) {
    return res.status(404).render("../src/views/error", {
      message: found.message,
      status: 404,
    });
  }

  const { expiry, password } = found;

  const expired = expiry && new Date() > new Date(expiry);
  const isProtected = Boolean(password);

  if (expired) {
    return res.status(403).render("../src/views/error", {
      message: `The link ${link} is expired`,
      status: 403,
    });
  }

  if (isProtected && !expired) {
    return res.render("../src/views/gateway", { link });
  }

  if (!isProtected && !expired) {
    return res.redirect(found.destination);
  }
}

export default gateway;
