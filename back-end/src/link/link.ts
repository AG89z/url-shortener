import { Link, LinkCreator } from "./types";

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

// async function addOne({
//   destination,
//   author,
//   password = undefined,
//   expiry = undefined,
// }: LinkCreator): Promise<Link> {
//   return txtDB.addOne(
//     await makeLink({ destination, author, password, expiry })
//   );
// }

// function findOneByLink(link: string): Promise<Link | undefined> {
//   return txtDB.findOne<Link>("link", link);
// }

// function findOneById(id: string): Promise<Link | undefined> {
//   return txtDB.findOne<Link>("id", id);
// }

// function getAll(): Promise<Link[]> {
//   return txtDB.find<Link>();
// }

// export default {
//   addOne,
//   findOneByLink,
//   findOneById,
//   getAll,
// };
