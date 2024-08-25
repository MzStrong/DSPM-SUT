const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/admin/AuthController");

router.post("/login", adminAuthController.loginAdmin);

module.exports = router;
