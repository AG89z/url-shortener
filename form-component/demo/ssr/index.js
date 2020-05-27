const express = require("express");

const React = require("react");
const ReactDOMServer = require("react-dom/server");

const UrlShortenerForm = require("url-shortener-form");

const app = express();

app.get("/", (req, res) => {
  const form = React.createElement(UrlShortenerForm);
  const html = ReactDOMServer.renderToString(form);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("http://localhost:3000"));
