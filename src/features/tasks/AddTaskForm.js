import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTask } from './tasksSlice';

import { Form } from 'react-bootstrap';

export const AddTaskForm = () => {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('');

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);

	const canSave = [title].every(Boolean) && addRequestStatus === 'idle';

	return (
		<section>
			<h2>Add a New Task</h2>
			<Form>
				<Form.Group>
					<Form.Label htmlFor="taskTitle">Task Title: </Form.Label>
					<Form.Control type="text" placeholder="task text" />
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="taskDetails">Task Details: </Form.Label>
					<Form.Control type="text" placeholder="task details" />
				</Form.Group>
			</Form>
		</section>
	);
};
