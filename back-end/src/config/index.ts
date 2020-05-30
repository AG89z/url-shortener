import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export = Object.freeze({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  ALLOWED_DESTINATIONS: process.env.ALLOWED_DESTINATIONS,
});
