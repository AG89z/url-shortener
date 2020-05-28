import React, { useState } from "react";

function UrlShortenerForm() {
  const [state, setState] = useState({
    url: "",
    expiry: null,
    password: null,
  });

  // const setUrl = (url) => setState((prevState) => ({ ...prevState, url }));
  // const setExpiry = (expiry) => setState((prevState) => ({ ...prevState, expiry }));
  // const setPassword = (password) => setState((prevState) => ({ ...prevState, password }));

  return (
    <div>
      <form>
        SOme text

      </form>
    </div>
  );
}

export default UrlShortenerForm;
