import { Link, LinkCreator } from "./interfaces";

function buildMakeLink(
  makeId: () => string,
  makeShortId: () => string,
  hash: (text: string) => Promise<string>
) {
  return async function makeLink({
    destination,
    author,
    password,
    expiry,
  }: LinkCreator): Promise<Readonly<Link>> {
    let hashedPassword;

    if (password) {
      hashedPassword = await hash(password);
    }

    //TODO has destination

    return Object.freeze({
      id: makeId(),
      author,
      link: makeShortId(),
      destination,
      password: hashedPassword,
      expiry,
      created: new Date().toISOString(),
    });
  };
}

export default buildMakeLink;
