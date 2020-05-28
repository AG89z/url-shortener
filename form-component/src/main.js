import React, { useState, useRef } from "react";
import style from "./style.css";

function UrlShortenerForm({ jwt }) {
  const urlInputRef = useRef();

  const [state, setState] = useState({
    url: "",
    expiry: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [shortLink, setShortLink] = useState(null);

  const setUrl = (url) => setState((prevState) => ({ ...prevState, url }));
  const setExpiry = (expiry) => setState((prevState) => ({ ...prevState, expiry }));
  const setPassword = (password) => setState((prevState) => ({ ...prevState, password }));

  const isValidUrlInput = (input) => !input.validity.typeMismatch;

  const urlError = "Enter a valid URL";

  const onSubmit = (e) => {
    setShortLink(null);
    if (!isValidUrlInput(urlInputRef.current)) {
      setError(urlError);
    } else {
      setError(null);
      fetch("http://localhost:5001/v0/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          destination: state.url,
          expiry: (state.expiry && new Date(state.expiry).toISOString()) || null,
          password: state.password || null,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.error) {
            setShortLink(res.link);
          } else {
            setError(res.message);
          }
        })
        .catch((err) => {
          setError(err.message || "UNEXPECTED ERROR");
        });
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
                setShortLink(null);
                setError(!isValidUrlInput(e.target) ? urlError : null);
              }}
              required
              placeholder="URL"
            />
            <input id="ufs-submit" type="submit" />
          </div>
          {error && (
            <div className="ufs-error">
              <p>{error}</p>
            </div>
          )}
          {shortLink && (
            <div className="ufs-success">
              <p>
                Short link created:{"  "}
                <a target="_blank" href={shortLink}>
                  {shortLink}
                </a>
              </p>
            </div>
          )}
          <div id="ufs-security-note">
            <p>
              ATTENTION: Although very difficult, a malicious party could discover a short link and from there
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
