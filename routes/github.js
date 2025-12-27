const express = require('express');
const router = express.Router();
const githubController = require('../controllers/githubController');

router.post('/suggest', githubController.suggestIdeas);
router.post('/explain', githubController.explainRepo);
router.post('/roadmap', githubController.getRoadmap);
router.post('/contribute', githubController.findContributions);
router.post('/elaborate', githubController.elaborateProject);

module.exports = router;
