import { Request, Response } from "express";
import { lookupLink } from "../../use-cases/links";

async function gateway(req: Request, res: Response) {
  const match = /\/(.+)\/?/.exec(req.baseUrl);

  const link = match && match[1];

  if (!link) {
    res.status(400).render("../src/views/error", {
      message: "No link in the request",
      status: 400,
    });
  } else {
    const found = await lookupLink(link);

    if (found) {
      const { expiry, password } = found;

      const expired = expiry && new Date() > new Date(expiry);
      const isProtected = Boolean(password);

      if (isProtected && !expired) {
        res.render("../src/views/gateway", { link, linkId: found.id });
      } else if (!isProtected && !expired) {
        res.redirect(found.destination);
      } else if (expired) {
        res.status(403).render("../src/views/error", {
          message: `The link ${link} is expired`,
          status: 403,
        });
      }
    } else {
      res.status(404).render("../src/views/error", {
        message: `${link} is not an existing link`,
        status: 404,
      });
    }
  }
}

export default gateway;
