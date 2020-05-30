import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  //throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export = Object.freeze({
  PORT: process.env.PORT || "5001",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "very_secret",
  ALLOWED_DESTINATIONS: process.env.ALLOWED_DESTINATIONS || ".*",
});
