const express = require("express");
const router = express.Router();
const adminAuthController = require("../controllers/admin/AuthController");
const policyController = require("../controllers/admin/PolicyController")
const evaluationController = require("../controllers/admin/EvaluationController")
const adminController = require("../controllers/admin/AdminController")
const userController = require("../controllers/admin/UserController");
const childController = require('../controllers/admin/ChildController')

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

//User
router.get("/users", userController.getAllUsers);
router.put("/updateuser/:id", userController.updateUser);
router.put("/userchangepassword/:id", userController.changePasswordUser);
router.delete("/deleteuser/:id", userController.deleteUser);

//Child
router.get("/child/:id", childController.getAllChilds);
router.post("/createchild", childController.createChild);
router.put("/updatechild/:id", childController.updateChild);
router.put("/changeparent/:id", childController.changeParent);
router.delete("/deletechild/:id", childController.deleteChild);

module.exports = router;
