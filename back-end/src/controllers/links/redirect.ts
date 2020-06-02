import { Request, Response } from "express";
import { lookupLink } from "../../use-cases/links";
import makeError from "../../utils/makeError";

async function checkRedirect(req: Request, res: Response) {
  const match = /\/(.+)\/?/.exec(req.baseUrl);

  const link = match && match[1];

  if (!link) {
    res.status(400).json(makeError("NO LINK", "No link in the request"));
  } else {
    const found = await lookupLink(link);

    if (found) {
      const { expiry, password } = found;

      const expired = expiry && new Date() > new Date(expiry);
      const isProtected = Boolean(password);

      if (isProtected && !expired) {
        res.render("../src/views/verifyRedirect", { link, linkId: found.id });
      } else if (!isProtected && !expired) {
        res.redirect(found.destination);
      } else if (expired) {
        res
          .status(403)
          .json(
            makeError("LINK EXPIRED", `The link ${link} is not longer valid`)
          );
      }
    } else {
      res
        .status(404)
        .json(makeError("LINK NOT FOUND", `${link} is not an existing link`));
    }
  }
}

export default checkRedirect;
