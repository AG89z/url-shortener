const express = require("express");
const { lookup } = require("../services/link");
const { wrapAsync } = require("../utils/wrapAync");

const redirect = express();

redirect.post(
  "/verify",
  wrapAsync(async (req, res) => {
    const { password, link } = req.body;

    if (!password || !link) {
      res.status(400).end();
    } else {
      const found = await lookup(link);
      if (!found) {
        res.status(404).end();
      } else if (found.password === password) {
        res.redirect(found.destination);
      } else {
        res.status(403).end();
      }
    }
  })
);

redirect.use(
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
      res.status(404).end();
    }
  })
);

module.exports = redirect;
