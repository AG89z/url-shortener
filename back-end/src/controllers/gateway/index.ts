import { Router } from "express";

import { wrapAsync } from "../../libs/wrapAync";
import gateway from "./gateway";

const router = Router();

router.use("*", wrapAsync(gateway));

export default router;
