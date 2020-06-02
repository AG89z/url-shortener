import { Router } from "express";

import linksGET from "./links-GET";
import linksPOST from "./links-POST";
import linksIdGET from "./links.id-GET";
import linkIdVerifyPOST from "./links.id.verify-POST";
import checkRedirect from "./redirect";

import { wrapAsync } from "../../libs/wrapAync";
import { checkJwt } from "../../middlewares/checkJwt";

const router = Router();

router.post("/v0/links", checkJwt, wrapAsync(linksPOST));

router.get("/v0/links", checkJwt, wrapAsync(linksGET));

router.get("/v0/links/:id", checkJwt, wrapAsync(linksIdGET));

router.post("/v0/links/:id/verify", wrapAsync(linkIdVerifyPOST));

router.use("*", wrapAsync(checkRedirect));
// router.get("/_sLFbQsSy", (req, res) => {
//   console.log("All good");
//   // res.status(200).end();
// });

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

export = router;
