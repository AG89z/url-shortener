import bcrypt from "bcrypt";

export function hash(text: string, saltRounds = 10) {
  return bcrypt.hash(text, saltRounds);
}

export function compareHash(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}

export default { hash, compareHash };
