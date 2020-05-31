import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export = () => {
  if (
    !process.env.PORT ||
    !process.env.NODE_ENV ||
    !process.env.JWT_SECRET ||
    !process.env.ALLOWED_DESTINATIONS
  ) {
    throw new Error("Missing required environmental variable");
  }
  return Object.freeze({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    ALLOWED_DESTINATIONS: process.env.ALLOWED_DESTINATIONS,
  });
};
