import fetch from "node-fetch";
import { SoftError } from "./error";

type VerifyPasswordResponse = {
  reply?: "NOT_PROTECTED" | "CORRECT" | "WRONG";
  destination?: string;
};

async function verifyPassword(link: string, password: string) {
  const res = await fetch("http://localhost:5001/verify-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link,
      password,
    }),
  });

  return (await res.json()) as VerifyPasswordResponse | SoftError;
}

export default verifyPassword;
