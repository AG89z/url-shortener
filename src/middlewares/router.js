const router = require("express").Router();
const linksController = require("../controllers/link");

router.post("/v0/links", linksController.postLink);

router.get("/v0/links", linksController.getLinks);

router.get("/v0/links/:id", linksController.getLink);

//TODO router.patch("/v0/links/:id", linksController.patchLink);

//TODO router.delete("/v0/links/:id", linksController.deleteLink);

module.exports = router;
