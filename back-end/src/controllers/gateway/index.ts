import { Router } from "express";

import { wrapAsync } from "../../libs/wrapAync";
import gateway from "./gateway";
import errorHandler from "./errorHandler";

const router = Router();

router.use("*", wrapAsync(gateway));

router.use(errorHandler);

export default router;
