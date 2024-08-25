const express = require("express");
const router = express.Router();
const userAuthController = require('../controllers/user/AuthController')

router.get("/getuser", userAuthController.getUser);

module.exports = router;
