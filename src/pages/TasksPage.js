import { Container, Row, Col, Image } from 'react-bootstrap';

import { AddTaskForm } from '../features/tasks/AddTaskForm';

import { useSelector } from 'react-redux';
import { selectAllTasks, selectTasksIds } from '../features/tasks/tasksSlice';

export const TasksPage = () => {
	const tasksImg = 'images/tasks_art.svg';
	const tasksIds = useSelector(selectTasksIds);
	const allTasks = useSelector(selectAllTasks);
	const testDate = new Date().toUTCString().split(' ');
	let today = `${testDate[1]} ${testDate[2]} ${testDate[3]}`;

	let totalProgress = 0;
	let avgProgress = 0;
	if (tasksIds.length > 0) {
		allTasks.forEach((task) => (totalProgress += task.progress));

		avgProgress = totalProgress / tasksIds.length;
	}

	return (
		<Container fluid>
			<Row>
				<Col>
					<AddTaskForm />
				</Col>
				<Col>
					<Image src={tasksImg} alt="tasks art" width={450} height={300} />
				</Col>
			</Row>
			<Row className="tasks-details">
				<Col className="total-tasks">
					<h6>Total Tasks</h6>
					<p>{tasksIds.length}</p>
				</Col>
				<Col className="tasks-productivity">
					<h6>Productivity</h6>
					<p>{avgProgress.toFixed(2)}%</p>
				</Col>
				<Col className="tasks-dueDate">
					<h6>Due date</h6>
					<p>{today}</p>
				</Col>
				<Col className="tasks-attach">
					<h6>Attachments</h6>
					<p>85</p>
				</Col>
			</Row>
		</Container>
	);
};
