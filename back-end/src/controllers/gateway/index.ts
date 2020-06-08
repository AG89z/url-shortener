import { Router } from "express";

import { wrapAsync } from "../../libs/wrapAync";
import gateway from "./gateway";
import createLink from "./create-link-POST";
import verifyPassword from "./verify-password-POST";
import errorHandler from "./errorHandler";

const router = Router();

router.post("/create-link", createLink);

router.post("/:link/verify-password", verifyPassword);

router.use("*", wrapAsync(gateway));

router.use(errorHandler);

export default router;
