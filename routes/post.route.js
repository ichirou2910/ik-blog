const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const postController = require("../controllers/post.controller");
const checkAuth = require("../middleware/check-auth");

router.get("/", postController.getAll);
router.get("/:slug", postController.getBySlug);
router.get("/tag/:tag", postController.getByTag);

router.use(checkAuth);

router.post("/create", fileUpload.single("cover"), postController.create);
router.delete("/:slug", postController.delete);
router.post("/:slug", fileUpload.single("cover"), postController.update);

module.exports = router;
