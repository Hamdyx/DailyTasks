const fs = require('fs');

const tasks = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tasks-simple.json`)
);

exports.checkId = (req, res, next, val) => {
	/* if (req.params.id * 1 > tasks.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	} */

	// const isValid = tasks.find((el) => el.id === req.params.id * 1);
	next();
};

exports.checkBody = (req, res, next) => {
	if (!req.body.title || !req.body.details) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing title or details',
		});
	}
	next();
};

exports.getAllTasks = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		results: tasks.length,
		data: {
			tasks,
		},
	});
};

exports.getTask = (req, res) => {
	const id = req.params.id;
	const task = tasks.find((el) => el.id === id);

	res.status(200).json({
		status: 'success',
		data: {
			task,
		},
	});
};

exports.createTask = (req, res) => {
	const newTask = Object.assign(req.body);
	tasks.push(newTask);

	fs.writeFile(
		`${__dirname}/../dev-data/data/tasks-simple.json`,
		JSON.stringify(tasks, null, 4),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					task: newTask,
				},
			});
		}
	);
};

exports.updateTask = (req, res) => {
	const id = req.params.id;
	const task = tasks.find((el) => el.id === id);
	const updatedTask = Object.assign(task, req.body);

	fs.writeFile(
		`${__dirname}/../dev-data/data/tasks-simple.json`,
		JSON.stringify(tasks, null, 4),
		(err) => {
			res.status(200).json({
				status: 'success',
				data: {
					task: updatedTask,
				},
			});
		}
	);
};

exports.deleteTask = (req, res) => {
	const id = req.params.id;
	const filteredTasks = tasks.filter((el) => el.id !== id);

	fs.writeFile(
		`${__dirname}/../dev-data/data/tasks-simple.json`,
		JSON.stringify(filteredTasks, null, 4),
		(err) => {
			if (err) {
				console.log(err);
				res.status(400).json({
					status: 'failed to delete task',
					data: null,
				});
			} else {
				res.status(204).json({
					status: 'success',
					data: null,
				});
			}
		}
	);
};
