const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/admin/AuthController");
const policyController = require("../controllers/admin/PolicyController")

router.get("/", adminAuthController.getAllAdmins);
router.post("/register", adminAuthController.createAdmin);
router.get("/getadmin", adminAuthController.getAdmin);


router.get("/getpolicys", policyController.getAllPolicys);
router.post("/createpolicy", policyController.createPolicy);
router.delete("/deletepolicy/:id", policyController.deletePolicy);
router.put("/updatepolicy/:id", policyController.updatePolicy);
router.patch("/updatepolicystatus/:id", policyController.updatePolicyStatus);

module.exports = router;
