const express = require('express');

const {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
	checkId,
	checkBody,
} = require('../controllers/taskController');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTasks).post(checkBody, createTask);

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
