import config from "./config";

import express from "express";
import bodyParser from "body-parser";
import { OpenApiValidator } from "express-openapi-validator";

import linksController from "./controllers/links";
import redirectController from "./controllers/redirect";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import morgan from "morgan";

const API_SPEC = "api/api.yaml";
const PORT = config().PORT;

const app = express();

app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("api"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("../src/views/index");
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
    app.use(redirectController);
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  })
  .catch(console.log);
