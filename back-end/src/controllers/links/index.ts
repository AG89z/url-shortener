import { Router } from "express";

import linksGET from "./links-GET";
import linksPOST from "./links-POST";
import linksIdGET from "./links.id-GET";
import errorHandler from "./errorHandler";

import { wrapAsync } from "../../libs/wrapAync";
import { checkJwt } from "../../libs/checkJwt";
import cors from "cors";

const router = Router();

router.post("/v0/links", cors(), checkJwt, wrapAsync(linksPOST));

router.get("/v0/links", cors(), checkJwt, wrapAsync(linksGET));

router.get("/v0/links/:id", cors(), checkJwt, wrapAsync(linksIdGET));

//TODO
// router.patch(
//   "/v0/links/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     res.status(200).end();
//   })
// );

//TODO
// router.delete(
//   "/v0/links/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     res.status(200).end();
//   })
// );

router.use(errorHandler);

export default router;
