const fs = require('fs');

const tasks = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tasks-simple.json`)
);

exports.checkId = (req, res, next, val) => {
	if (req.params.id * 1 > tasks.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
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
	// res.set('Access-Control-Allow-Origin', '*');
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
	// res.set('Access-Control-Allow-Origin', '*');
	const id = req.params.id * 1;

	const task = tasks.find((el) => el.id === id);

	res.status(200).json({
		status: 'success',
		data: {
			task,
		},
	});
};

exports.createTask = (req, res) => {
	const newId = tasks[tasks.length - 1].id + 1;
	const newTask = Object.assign({ id: newId }, req.body);
	// res.set('Access-Control-Allow-Origin', '*');
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
	res.status(200).json({
		status: 'success',
		data: {
			task: '<Updated task here />',
		},
	});
};

exports.deleteTask = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};
