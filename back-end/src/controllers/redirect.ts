import { Router } from "express";
import { lookup } from "../services/links";
import { wrapAsync } from "../utils/wrapAync";
import { checkPassword } from "../utils/password";
import makeError from "../utils/makeError";

const router = Router();

//TODO Make view for all the errors

router.post(
  "/verify",
  wrapAsync(async (req, res) => {
    const { password, link } = req.body;

    if (!password || !link) {
      res.status(400).json(makeError("BAD REQUEST", "Link or password missing"));
    } else {
      const found = await lookup(link);
      if (!found) {
        res.status(404).json(makeError("LINK NOT FOUND", `${link} is not an existing link`));
      } else {
        const correctPassword = await checkPassword(password, found.password!);

        if (correctPassword) {
          res.redirect(found.destination);
        } else {
          res.status(403).json(makeError("UNAUTHORIZED", "Wrong password"));
        }
      }
    }
  })
);

router.use(
  "*",
  wrapAsync(async (req, res) => {
    const match = req.baseUrl.match(/\/(.+)\/?/);

    const link = match && match[1];

    const found = link && (await lookup(link));

    if (found) {
      const { expiry, password } = found;

      const expired = expiry && new Date() > new Date(expiry);
      const isProtected = Boolean(password);

      if (isProtected && !expired) {
        res.render("../src/views/enterPassword", { link });
      } else if (!isProtected && !expired) {
        res.redirect(found.destination);
      } else if (expired) {
        res.status(403).json(makeError("LINK EXPIRED", `The link ${link} is not longer valid`));
      }
    } else {
      res.status(404).json(makeError("LINK NOT FOUND", `${link} is not an existing link`));
    }
  })
);

export = router;
