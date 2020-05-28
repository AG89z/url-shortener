import React, { useState } from "react";
import style from "./style.css";

function UrlShortenerForm() {
  const [state, setState] = useState({
    url: "",
    expiry: "",
    password: "",
  });

  const setUrl = (url) => setState((prevState) => ({ ...prevState, url }));
  const setExpiry = (expiry) => setState((prevState) => ({ ...prevState, expiry }));
  const setPassword = (password) => setState((prevState) => ({ ...prevState, password }));

  return (
    <>
      <style>{style}</style>
      <div className="urlFormShortener">
        <h3 id="ufs-title">URL shortener</h3>
        <form id="ufs-form">
          <div id="ufs-url-area">
            <input
              id="ufs-url"
              name="url"
              type="url"
              value={state.url}
              onChange={(e) => {
                console.log(e.target.validity);
                setUrl(e.target.value);
              }}
              required
              placeholder="URL"
            />
            <input id="ufs-submit" type="submit" />
          </div>
          <div id="ufs-security-note">
            <p>
              Although very difficult, a malicious party could discover a short link and from there
              get to the destination URL. If your URL contains sensible data, consider protecting it
              with a password and/or and expiry date.
            </p>
          </div>
          <div id="ufs-password-expiry-area">
            <label>
              Password
              <input
                id="ufs-password"
                name="password"
                type="password"
                value={state.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Expiry date
              <input
                id="ufs-expiry"
                name="expiry"
                type="date"
                value={state.expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default UrlShortenerForm;
