import { Request } from "express";
import config from "../config";

import jwt from "express-jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    name: string;
    surname: string;
    id: string;
  };
}

function checkJwt(credentialsRequired = true) {
  return jwt({ secret: config().JWT_SECRET, credentialsRequired });
}

export default checkJwt;
