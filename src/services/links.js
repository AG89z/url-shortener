const config = require('../config')

const LinkModel = require('../models/link')

function toResource(link) {
  return {
    ...link,
    password: undefined,
    link:
      config.NODE_ENV === "development"
        ? `http://localhost:${config.PORT}/${link.link}`
        : `https://sh.nm/${link.link}`,
    protected: Boolean(link.password),
  };
}

async function createOne({ destination, author, expiry = null, password = null }) {
  const checkDestination = new RegExp(config.ALLOWED_DESTINATIONS);

  if(checkDestination.test(destination)) {
    return toResource(await LinkModel.addOne({ destination, author, password, expiry }));
  } else {
    return null
  }
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
