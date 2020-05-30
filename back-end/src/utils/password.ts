import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(password: string) {
  return bcrypt.hash(password, saltRounds);
}

export function checkPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export default { hashPassword, checkPassword };
