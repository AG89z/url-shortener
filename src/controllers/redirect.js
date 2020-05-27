const { Router } = require("express");
const { lookup } = require("../services/links");
const { wrapAsync } = require("../utils/wrapAync");
const { checkPassword } = require("../utils/password");
const makeError = require("../utils/makeError");

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
        const correctPassword = await checkPassword(password, found.password);

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
      const protected = Boolean(password);

      if (protected && !expired) {
        res.render("../src/views/redirect", { link });
      } else if (!protected && !expired) {
        res.redirect(found.destination);
      } else if (expired) {
        res.status(403).end();
      }
    } else {
      res.status(404).json(makeError("LINK NOT FOUND", `${link} is not an existing link`));
    }
  })
);

module.exports = router;
