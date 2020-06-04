const express = require("express");
const httpProxy = require("http-proxy");

const app = express();

const proxy = httpProxy.createProxyServer({});

app.use((req, res, next) => {
  console.log(`Base url: ${req.baseUrl}; Path: ${req.path}`);
  if(/^\/api/.test(req.path)) {
    proxy.web(req, res, {
      target: "http://localhost:5001/"
    })
  } else {
    proxy.web(req,res, {
      target: "http://localhost:5002/"
    })
  }
});

app.listen(1000, () => {
  console.log("App listening on port 1000");
});

