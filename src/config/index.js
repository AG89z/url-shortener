const dotenv = require("dotenv");

const envFound = dotenv.config();

if (envFound.error) {
  //throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = Object.freeze({
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
});
