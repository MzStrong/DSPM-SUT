const express = require("express");
const router = express.Router();
const relationshipController = require('../controllers/public/RelationshipController')
const genderController = require('../controllers/public/GenderController')
const topicController = require('../controllers/public/TopicController')


router.get("/relationships", relationshipController.getAllRelationships);
router.get("/genders", genderController.getAllGenders);
router.get("/topics", topicController.getAllTopics);

module.exports = router;
