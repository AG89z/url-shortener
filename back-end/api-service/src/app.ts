import config from "./config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { OpenApiValidator } from "express-openapi-validator";
import path from "path";

import linksController from "./controllers/links";

import morgan from "morgan";

const apiFolder = path.join(__dirname, "/../api/");

const API_SPEC = apiFolder + "api.yaml";
const PORT = 5001;

const app = express();

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(apiFolder));

app.set("view engine", "ejs");

app.get("/apii", (req, res) => {
  res.render(path.join(__dirname, "/../src/views/api"));
});

app.use(cors());

new OpenApiValidator({
  apiSpec: API_SPEC,
  validateRequests: true,
  validateResponses: true,
})
  .install(app)
  .then(() => {
    app.use(linksController);
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  })
  .catch(console.log);

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
