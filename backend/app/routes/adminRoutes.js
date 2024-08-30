const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/admin/AuthController");
const policyController = require("../controllers/admin/PolicyController")
const evaluationController = require("../controllers/admin/EvaluationController")
const adminController = require("../controllers/admin/AdminController")

router.post("/register", adminAuthController.createAdmin);
router.get("/getadmin", adminAuthController.getAdmin);

// Policy
router.get("/getpolicys", policyController.getAllPolicys);
router.post("/createpolicy", policyController.createPolicy);
router.delete("/deletepolicy/:id", policyController.deletePolicy);
router.put("/updatepolicy/:id", policyController.updatePolicy);
router.patch("/updatepolicystatus/:id", policyController.updatePolicyStatus);

// Evaluation
router.get("/getevaluations", evaluationController.getAllEvaluations);
router.post("/createevaluation", evaluationController.createEvaluation);
router.delete("/deleteevaluation/:id", evaluationController.deleteEvaluation);
router.put("/updateevaluation/:id", evaluationController.updateEvaluation);

//Admin
router.get("/admins", adminController.getAllAdmins);
router.put("/updateadmin/:id", adminController.updateAdmin);
router.put("/changepassword/:id", adminController.changePasswordAdmin);
router.delete("/deleteadmin/:id", adminController.deleteAdmin);


module.exports = router;
