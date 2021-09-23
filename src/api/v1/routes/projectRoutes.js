const express = require('express');

const {
	getAllProjects,
	createProject,
	getProject,
	updateProject,
	deleteProject,
	checkId,
	checkBody,
} = require('../controllers/projectController');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllProjects).post(checkBody, createProject);

router.route('/:id').get(getProject).patch(updateProject).delete(deleteProject);

module.exports = router;
