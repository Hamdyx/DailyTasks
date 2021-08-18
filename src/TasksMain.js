import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { AddTaskForm } from './features/tasks/AddTaskForm';
import { TasksList } from './features/tasks/TasksList';
import { TaskCard } from './features/tasks/TaskCard';

import './TasksMain.css';

export const TasksMain = () => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<AddTaskForm />
				</Col>
			</Row>
			<Row className="tasks-details">
				<Col className="total-tasks">
					<h6>Total Tasks</h6>
					<p>123,456</p>
				</Col>
				<Col className="tasks-productivity">
					<h6>Productivity</h6>
					<p>85.45%</p>
				</Col>
				<Col className="tasks-dueDate">
					<h6>Due date</h6>
					<p>19 Aug 2021</p>
				</Col>
				<Col className="tasks-attach">
					<h6>Attachments</h6>
					<p>85</p>
				</Col>
			</Row>
			<Row>
				<Col>
					Next up
					<TaskCard taskId={1} />
					<TaskCard taskId={2} />
					<TaskCard taskId={3} />
				</Col>
				<Col>
					In Progress
					<TaskCard taskId={4} />
					<TaskCard taskId={5} />
					<TaskCard taskId={6} />
				</Col>
				<Col>
					In review
					<TaskCard taskId={7} />
					<TaskCard taskId={8} />
					<TaskCard taskId={9} />
				</Col>
				<Col>
					Finished
					<TaskCard taskId={10} />
					<TaskCard taskId={11} />
					<TaskCard taskId={12} />
				</Col>
			</Row>
		</Container>
	);
};
