import { Router } from "express";

import linksGET from "./links-GET";
import linksPOST from "./links-POST";
import linksIdGET from "./links.id-GET";
import linksLookupPOST from "./links.lookup-POST";
import linksVerifyPasswordPOST from "./links.verifyPassword-POST";
import errorHandler from "./errorHandler";

import { wrapAsync } from "../../libs/wrapAync";
import checkJwt from "../../libs/checkJwt";

const router = Router();

router.post("/v0/links", checkJwt(false), wrapAsync(linksPOST));

router.get("/v0/links", checkJwt(), wrapAsync(linksGET));

router.get("/v0/links/:id", checkJwt(), wrapAsync(linksIdGET));

router.post("/lookup", checkJwt(false), wrapAsync(linksLookupPOST));

router.post(
  "/verify-password",
  checkJwt(false),
  wrapAsync(linksVerifyPasswordPOST)
);

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
