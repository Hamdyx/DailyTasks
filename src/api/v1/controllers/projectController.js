const fs = require('fs');

const projects = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/projects-simple.json`)
);

exports.checkId = (req, res, next, val) => {
	console.log('Checking Project ID');
	next();
};

exports.checkBody = (req, res, next) => {
	/* if (!req.body.title) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing title',
		});
	} */
	next();
};

exports.getAllProjects = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		results: projects.length,
		data: {
			projects,
		},
	});
};

exports.getProject = (req, res) => {
	const id = req.params.id;
	const project = projects.find((el) => el.id === id);

	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
};

exports.createProject = (req, res) => {
	const newProject = Object.assign(req.body);
	projects.push(newProject);

	fs.writeFile(
		`${__dirname}/../dev-data/data/projects-simple.json`,
		JSON.stringify(projects, null, 4),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					project: newProject,
				},
			});
		}
	);
};

exports.updateProject = (req, res) => {
	const id = req.params.id;
	const project = projects.find((el) => el.id === id);
	const updatedProject = Object.assign(project, req.body);

	fs.writeFile(
		`${__dirname}/../dev-data/data/projects-simple.json`,
		JSON.stringify(projects, null, 4),
		(err) => {
			res.status(200).json({
				status: 'success',
				data: {
					project: updatedProject,
				},
			});
		}
	);
};

exports.deleteProject = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};
