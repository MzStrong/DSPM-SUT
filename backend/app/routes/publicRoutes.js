const express = require("express");
const router = express.Router();
const userRelationship = require('../controllers/user/RelationshipController')
const userGender = require('../controllers/user/GenderController')
const topic = require('../controllers/admin/TopicController')


router.get("/relationships", userRelationship.getAllRelationships);
router.get("/genders", userGender.getAllGenders);
router.get("/topics", topic.getAllTopics);

module.exports = router;
