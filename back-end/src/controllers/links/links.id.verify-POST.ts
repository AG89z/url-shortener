import { Request, Response } from "express";

import { getLink } from "../../use-cases/links";

import { compareHash } from "../../libs/hash";

type RequestBody = {
  password: string;
};

async function linksIdVerifyPOST(req: Request, res: Response) {
  const { id } = req.params;

  const link = await getLink(id, false);

  if (!link) {
    return res
      .status(404)
      .render("../src/views/error", { message: "Link not found" });
  }

  const { password } = req.body as RequestBody;

  if (!password) {
    return res
      .status(400)
      .render("../src/views/error", { message: "Password required" });
  } else {
    if (
      !link.password ||
      (link.password && (await compareHash(password, link.password)))
    ) {
      return res.redirect(link.destination);
    } else {
      return res
        .status(403)
        .render("../src/views/error", { message: "Wrong password" });
    }
  }
}

export default linksIdVerifyPOST;
