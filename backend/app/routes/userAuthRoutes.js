const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/user/AuthController");

router.post("/login", userAuthController.loginParent);
router.post("/register", userAuthController.createParent);

module.exports = router;
