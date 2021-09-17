import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTask } from './tasksSlice';

import { Form, Container, Row, Col, Button, Modal, FloatingLabel } from 'react-bootstrap';

export const AddTaskForm = () => {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [additionalNotes, setAdditionalNotes] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('');

	const [show, setShow] = useState(false);

	const handleModalShow = () => setShow(true);
	const handleModalClose = () => setShow(false);

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);

	const canSave = [title].every(Boolean) && addRequestStatus === 'idle';

	const onFormSubmit = () => {
		if (title && details) {
			console.log(`title: ${title}`);
			console.log(`details: ${details}`);
			console.log('calling dispatch');
			dispatch(
				addNewTask({
					id: new Date().toISOString(),
					title,
					details,
					additionalNotes,
					isCompleted: false,
					progress: 0,
				})
			);
			console.log('done dispatch');
			setTitle('');
			setDetails('');
			handleModalClose();
		}
	};

	return (
		<section className="add-task-form">
			<p>
				here you can track all of your tasks which are upcoming, in progress or already
				finished, also you can add new customised tasks
			</p>
			<Button className="customBg-btn" onClick={handleModalShow}>
				ADD TASK
			</Button>

			<Modal show={show} onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col>
								{/* <Form.Group>
									<Form.Label htmlFor="taskTitle">Task Title: </Form.Label>
									<Form.Control
										type="text"
										placeholder="task text"
										value={title}
										onChange={onTitleChanged}
									/>
								</Form.Group> */}
								<FloatingLabel
									controlId="floatingInput"
									label="Task name"
									className="mb-3"
								>
									<Form.Control
										placeholder="task name"
										value={title}
										onChange={onTitleChanged}
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								{/* <Form.Group>
									<Form.Label htmlFor="taskDetails">Task Details: </Form.Label>
									<Form.Control
										type="text"
										placeholder="task details"
										value={details}
										onChange={(e) => setDetails(e.target.value)}
									/>
								</Form.Group> */}
								<FloatingLabel
									controlId="floatingInput"
									label="Description"
									className="mb-3"
								>
									<Form.Control
										placeholder="Add more detail to this task..."
										value={details}
										onChange={(e) => setDetails(e.target.value)}
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								{/* <Form.Group>
									<Form.Label htmlFor="taskDetails">Additional Notes: </Form.Label>
									<Form.Control
										type="text"
										placeholder="Additional Notes"
										value={additionalNotes}
										onChange={(e) => setAdditionalNotes(e.target.value)}
									/>
								</Form.Group> */}
								<FloatingLabel
									controlId="floatingInput"
									label="Comments"
									className="mb-3"
								>
									<Form.Control
										placeholder="Add extra notes or comments to this task..."
										value={additionalNotes}
										onChange={(e) => setAdditionalNotes(e.target.value)}
									/>
								</FloatingLabel>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Close
					</Button>
					<Button onClick={onFormSubmit} className="customBg-btn">
						Add Task
					</Button>
				</Modal.Footer>
			</Modal>
		</section>
	);
};
