import React from 'react';
import { useSelector } from 'react-redux';
import { selectTaskById } from './tasksSlice';

import { Container, Row, Col } from 'react-bootstrap';

export const TaskCard = ({ taskId }) => {
	const task = useSelector((state) => selectTaskById(state, taskId));
	// console.log(task.title);
	let content;
	if (task) {
		content = (
			<React.Fragment>
				<h6>{`Task ${task.id}`}</h6>
				<p>{task.title}</p>
				<p>progress</p>
			</React.Fragment>
		);
	} else {
		content = <div>Loading</div>;
	}
	return <Container className="task-card">{content}</Container>;
};
