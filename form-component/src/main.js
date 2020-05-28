import React, { useState, useRef } from "react";
import style from "./style.css";

function UrlShortenerForm() {
  const urlInputRef = useRef();

  const [state, setState] = useState({
    url: "",
    expiry: "",
    password: "",
  });

  const [urlInputError, setUrlInputError] = useState(false);

  const setUrl = (url) => setState((prevState) => ({ ...prevState, url }));
  const setExpiry = (expiry) => setState((prevState) => ({ ...prevState, expiry }));
  const setPassword = (password) => setState((prevState) => ({ ...prevState, password }));

  const isValidUrlInput = (input) => !input.validity.typeMismatch;

  const onSubmit = (e) => {
    if (!isValidUrlInput(urlInputRef.current)) {
      setUrlInputError(true);
    } else {
      setUrlInputError(false);
      console.log("POST");
    }
    e.preventDefault();
  };

  return (
    <>
      <style>{style}</style>
      <div className="urlFormShortener">
        <h3 id="ufs-title">URL shortener</h3>
        <form id="ufs-form" noValidate onSubmit={onSubmit}>
          <div id="ufs-url-area">
            <input
              ref={urlInputRef}
              id="ufs-url"
              name="url"
              type="url"
              value={state.url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              onBlur={(e) => {
                setUrlInputError(!isValidUrlInput(e.target));
              }}
              required
              placeholder="URL"
            />
            <input id="ufs-submit" type="submit" />
          </div>
          {urlInputError && (
            <div className="ufs-error">
              <p>Enter a valid URL</p>
            </div>
          )}
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
