import { Request } from "express";
import config from "../config";

const jwt = require("express-jwt");

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const checkJwt = jwt({ secret: config.JWT_SECRET });
