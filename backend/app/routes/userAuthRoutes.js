const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/user/AuthController");

router.post("/login", userAuthController.loginUser);
router.post("/register", userAuthController.createUser);

module.exports = router;
