require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { OpenApiValidator } = require("express-openapi-validator");

const router = require("./middlewares/router");
const redirectLinks = require("./middlewares/redirectLinks");

const apiSpec = "./api/api.yaml";
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('src/public'));

app.set("view engine", "ejs");

app.use("/spec", express.static(apiSpec));

new OpenApiValidator({
  apiSpec,
  validateRequests: true,
  validateResponses: true,
})
  .install(app)
  .then(() => {
    app.use(router);
    app.use(redirectLinks);

    app.use((err, req, res, next) => {
      console.log(err);
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    });

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  });
