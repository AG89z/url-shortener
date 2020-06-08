import config from "./config";

import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import linksController from "./controllers/links";
import linksGatewayController from "./controllers/gateway";

import morgan from "morgan";

const API_SPEC = "api/api.yaml";
const PORT = config().PORT;

const app = express();

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("api"));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/apii", (req, res) => {
  res.render("../src/views/api");
});

app.use(linksController);
app.use(linksGatewayController);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});

function logError(err: Record<string, unknown>) {
  console.log("Error caught by the default handler:");
  console.log(err);
}

function errorHandler(
  err: Record<string, unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logError(err);

  const name = typeof err.name === "string" ? err.name : "UNKNOWN_ERROR";
  const status = typeof err.status === "number" ? err.status : 500;
  const message =
    typeof err.message === "string" ? err.message : "Unexpected error";

  return res.status(status).json({ type: name, message: message });
}
