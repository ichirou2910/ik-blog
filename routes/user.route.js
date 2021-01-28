const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Routes
router.get("/", userController.getInfo);
router.post("/authenticate", userController.login);

module.exports = router;
