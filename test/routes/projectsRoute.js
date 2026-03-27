const express = require('express');
const router = express.Router();
const {getAllProjects} = require('../controllers/projectsController');

router.use(express.json());
router.get('/', getAllProjects);

module.exports = router;