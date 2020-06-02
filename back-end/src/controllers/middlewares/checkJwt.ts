import { Request } from "express";
import config from "../../config";

import jwt from "express-jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    name: string;
    surname: string;
    id: string;
  };
}

export const checkJwt = jwt({ secret: config().JWT_SECRET });
