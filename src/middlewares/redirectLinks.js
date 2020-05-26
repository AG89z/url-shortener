const express = require("express");
const { lookup } = require("../services/link");
const { wrapAsync } = require("../utils/wrapAync");

const redirect = express();

redirect.use(
  "*",
  wrapAsync(async (req, res) => {
    const match = req.baseUrl.match(/\/(\w+)\/?/);

    const link = match && match[1];

    if (link) {
      const found = await lookup(link);
      if (found) {
        const { expiry, password } = found;

        if (expiry) {
          const expiryDate = new Date(expiry);
          if (new Date() > expiryDate) {
            res.status(403).end();
          } else {
            res.redirect(found.destination);
          }
        } else {
          res.redirect(found.destination);
        }
      } else {
        res.status(404).end();
      }
    } else {
      res.status(404).end();
    }
  })
);

module.exports = redirect;
