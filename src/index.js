const config = require('./config')

const express = require("express");
const bodyParser = require("body-parser");
const { OpenApiValidator } = require("express-openapi-validator");

const linksController = require("./controllers/links");
const redirectController = require("./controllers/redirect");
const errorHandler = require("./middlewares/errorHandler");

const API_SPEC = "src/api/api.yaml";
const PORT = config.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static("src/public"));
app.use(express.static("src/api"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("../src/views/index");
});

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
      console.log(`App listening on port ${PORT}`);
    });
  });
