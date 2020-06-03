import { Router } from "express";

import { wrapAsync } from "../../libs/wrapAync";
import gateway from "./gateway";
import verifyPassword from "./verify-password-POST";
import errorHandler from "./errorHandler";

const router = Router();

router.post("/:link/verify-password", verifyPassword);

router.use("*", wrapAsync(gateway));

router.use(errorHandler);

export default router;
