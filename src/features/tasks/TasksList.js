import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { selectTasksIds } from './tasksSlice';

export const TasksList = () => {
	const dispatch = useDispatch();

	const taskStatus = useSelector((state) => state.tasks.status);
	const error = useSelector((state) => state.tasks.error);

	let content;
	if (taskStatus === 'loading') {
		content = <div className="loader">Loading...</div>;
	} else if (taskStatus === 'succeeded') {
		content = <div>some tasks</div>;
	} else if (taskStatus === 'failed') {
		content = <div>{error}</div>;
	} else {
		content = (
			<Container fluid>
				<Row>
					<Col>Task 1 - Title</Col>
					<Col>Task 1 - Content</Col>
					<Col>Task 1 - Check</Col>
				</Row>
				<Row>
					<Col>Task 2 - Title</Col>
					<Col>Task 2 - Content</Col>
					<Col>Task 2 - Check</Col>
				</Row>
			</Container>
		);
	}

	return (
		<section className="tasks-list">
			<h2>Tasks</h2>
			{content}
		</section>
	);
};
