import React from "react";
import ReactDOM from "react-dom";

import UrlShortenerForm from "url-shortener-form";

const root = document.getElementById("root");

const jwt =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTdXBlckJ1c2luZXNzIiwiaWF0IjoxNTkwNTc5MzY3LCJleHAiOjI1MzcyNjQyOTMsImF1ZCI6Ind3dy5zdXBlcmJ1c2luZXNzLmNvbSIsInN1YiI6IkpvaG5ueSBSb2NrZXQiLCJOYW1lIjoiSm9obm55IiwiU3VybmFtZSI6IlJvY2tldCIsImlkIjoiZWIzYTllYzgtOWRkYy00NGE3LWE2ZGMtMzJlM2QyZTJkZmI4In0.Slf9U8RWbEMA2r6S_s9oPnZhuKy5PCHBM8mfHgrryAQ";

ReactDOM.render(<UrlShortenerForm jwt={jwt} />, root);
