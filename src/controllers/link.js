const Link = require("../services/link");
const { wrapAsync } = require("../utils/wrapAync");

module.exports.postLink = wrapAsync(async (req, res) => {
  const { destination, password, expiry } = req.body;

  const link = await Link.createOne({ destination, password, expiry });

  res.status(200).json(link);
});

module.exports.getLinks = wrapAsync(async (req, res) => {
  const links = await Link.getAll();

  res.status(200).json(links);
});

module.exports.getLink = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const link = await Link.getOne(id);

  if (link) {
    res.status(200).json(link);
  } else {
    res.status(404).end();
  }
});

module.exports.patchLink = wrapAsync(async (req, res) => {
  const { id } = req.params;

  res.status(200).end();
});

module.exports.deleteLink = wrapAsync(async (req, res) => {
  const { id } = req.params;

  res.status(200).end();
});