const express = require("express");
const router = express.Router();
const userRelationship = require('../controllers/user/RelationshipController')
const userGender = require('../controllers/user/GenderController')


router.get("/relationships", userRelationship.getAllRelationships);
router.get("/genders", userGender.getAllGenders);

module.exports = router;
