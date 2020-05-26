const router = require("express").Router();
const { Link } = require("./services/index");
const { wrapAsync } = require("./utils/wrapAync");

router.post(
  "/v0/links",
  wrapAsync(async (req, res) => {
    const { destination, password, expiry } = req.body;

    const link = await Link.createOne({ destination, password, expiry });

    res.status(200).json(link);
  })
);

router.get(
  "/v0/links",
  wrapAsync(async (req, res) => {
    const links = await Link.getAll();

    res.status(200).json(links);
  })
);

router.get(
  "/v0/links/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const link = await Link.getOne(id);

    if (link) {
      res.status(200).json(link);
    } else {
      res.status(404).end();
    }
  })
);

router.patch(
  "/v0/links/:id",
  wrapAsync((req, res) => {
    const { id } = req.params;

    res.status(200).end();
  })
);

router.delete(
  "/v0/links/:id",
  wrapAsync((req, res) => {
    const { id } = req.params;

    res.status(200).end();
  })
);

module.exports = router;
