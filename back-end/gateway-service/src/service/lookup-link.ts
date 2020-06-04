import fetch from "node-fetch";
import { SoftError } from "./error";

type LookupLinkResponse = {
  protected?: boolean;
  destination?: string;
  expiry?: string;
};

async function lookupLink(link: string) {
  const res = await fetch("http://localhost:5001/lookup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link,
    }),
  });

  return (await res.json()) as LookupLinkResponse | SoftError;
}

export default lookupLink;
