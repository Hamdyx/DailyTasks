import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskById, taskUpdated } from './tasksSlice';

import { Container, Row, Col, Form, ProgressBar, Button } from 'react-bootstrap';

import { FaEdit } from 'react-icons/fa';

export const TaskCard = ({ taskId }) => {
	const dispatch = useDispatch();
	const task = useSelector((state) => selectTaskById(state, taskId));
	let isCompleted;
	if (task) {
		isCompleted = task.isCompleted;
	}
	// console.log(task.title);

	const onTaskCheck = (ev) => {
		console.log(`${ev.target.checked}`);
		isCompleted = ev.target.checked;
		let progress = isCompleted ? 100 : 0;
		// let isCompleted = ev.target.checked;
		let { id, title, details } = task;
		dispatch(taskUpdated({ id, title, details, isCompleted, progress }));
	};

	const onTaskEdit = () => {
		let { id, title, details } = task;
		let progress = 50;
		console.log('task edited');

		dispatch(taskUpdated({ id, title, details, isCompleted, progress }));
	};

	let content;
	if (task) {
		content = (
			<React.Fragment>
				<Row>
					<Col>
						<p>{task.title}</p>
					</Col>
					<Col className="task-edit-icon">
						<Button onClick={onTaskEdit}>
							<FaEdit />
						</Button>
					</Col>
				</Row>
				<ProgressBar now={task.progress} label={`${task.progress}%`} animated />
				<p>{task.details}</p>
				<p>{`${task.isCompleted}`}</p>
				<Form.Check type="checkbox" onChange={onTaskCheck} checked={isCompleted} />
			</React.Fragment>
		);
	} else {
		content = <div>Loading</div>;
	}
	return <Container className="task-card">{content}</Container>;
};
