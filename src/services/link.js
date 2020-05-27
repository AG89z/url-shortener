const LinkModel = require('../models/link')

function toResource(link) {
  return {
    ...link,
    password: undefined,
    link:
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.PORT}/${link.link}`
        : `https://sh.nm/${link.link}`,
    protected: Boolean(link.password),
  };
}

async function createOne({ destination, expiry = null, password = null }) {
  return toResource(await LinkModel.addOne({ destination, password, expiry }));
}

async function getOne(id) {
  const link = await LinkModel.findOneById(id);

  if (link) {
    return toResource(link);
  } else {
    return null;
  }
}

async function lookup(link) {
  const found = await LinkModel.findOneByLink(link);

  if(found) {
    return found;
  } else {
    return null;
  }
}

async function getAll() {
  return (await LinkModel.getAll()).map(toResource);
}

module.exports = { createOne, getOne, getAll, lookup };
