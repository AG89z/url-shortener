const express = require("express");

const React = require("react");
const ReactDOMServer = require("react-dom/server");

const UrlShortenerForm = require("url-shortener-form");

const app = express();

app.get("/", (req, res) => {
  const form = React.createElement(UrlShortenerForm, {
    jwt:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTdXBlckJ1c2luZXNzIiwiaWF0IjoxNTkwNTc5MzY3LCJleHAiOjI1MzcyNjQyOTMsImF1ZCI6Ind3dy5zdXBlcmJ1c2luZXNzLmNvbSIsInN1YiI6IkpvaG5ueSBSb2NrZXQiLCJOYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCIsImlkIjoiZWIzYTllYzgtOWRkYy00NGE3LWE2ZGMtMzJlM2QyZTJkZmI4In0.Slf9U8RWbEMA2r6S_s9oPnZhuKy5PCHBM8mfHgrryAQ",
  });
  const html = ReactDOMServer.renderToString(form);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <style>
        html,
        body {
          margin: 0;
          padding: 0;
        }
        #root {
          display: flex;
          justify-content: center;
        }
      </style>
      <body>
        ${html}
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("http://localhost:3000"));
