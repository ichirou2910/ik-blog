const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const imageController = require("../controllers/image.controller");

router.post("/upload", fileUpload.single("image"), imageController.upload);

module.exports = router;
