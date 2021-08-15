import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTask } from './tasksSlice';

import { Form, Container, Row, Col, Button } from 'react-bootstrap';

export const AddTaskForm = () => {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('');

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);

	const canSave = [title].every(Boolean) && addRequestStatus === 'idle';

	return (
		<section className="add-task-form">
			<h2>Add a New Task</h2>
			<Container>
				<Form>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label htmlFor="taskTitle">Task Title: </Form.Label>
								<Form.Control type="text" placeholder="task text" />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label htmlFor="taskDetails">Task Details: </Form.Label>
								<Form.Control type="text" placeholder="task details" />
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button>Add Task</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</section>
	);
};
