import config from "../config";

import LinkModel, { Link, LinkCreator } from "../models/link";

interface LinkResource extends Link {
  protected: boolean;
}

function toResource(link: Link): LinkResource {
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

export async function createOne({
  destination,
  author,
  expiry = undefined,
  password = undefined,
}: LinkCreator) {
  const checkDestination = new RegExp(config.ALLOWED_DESTINATIONS);

  if (checkDestination.test(destination)) {
    return toResource(
      await LinkModel.addOne({ destination, author, password, expiry })
    );
  } else {
    return null;
  }
}

export async function getOne(id: string) {
  const link = await LinkModel.findOneById(id);

  if (link) {
    return toResource(link);
  } else {
    return null;
  }
}

export async function lookup(link: string) {
  const found = await LinkModel.findOneByLink(link);

  if (found) {
    return found;
  } else {
    return null;
  }
}

export async function getAll() {
  return (await LinkModel.getAll()).map(toResource);
}

export default { createOne, getOne, lookup, getAll };