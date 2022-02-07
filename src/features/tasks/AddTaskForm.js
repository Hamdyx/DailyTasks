import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTask } from './tasksSlice';

import { Form, Container, Row, Col, Button, Modal, FloatingLabel } from 'react-bootstrap';

export const AddTaskForm = () => {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [startOn, setStartOn] = useState('');
	const [dueOn, setDueOn] = useState('');
	const [category, setCategory] = useState('personal');
	const [additionalNotes, setAdditionalNotes] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('');

	const [show, setShow] = useState(false);

	const handleModalShow = () => setShow(true);
	const handleModalClose = () => setShow(false);

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onStartOnChanged = (e) => setStartOn(e.target.value);
	const onDueOnChanged = (e) => setDueOn(e.target.value);

	const canSave = [title].every(Boolean) && addRequestStatus === 'idle';

	const onFormSubmit = () => {
		if (title && details) {
			console.log(`title: ${title}`);
			console.log(`details: ${details}`);
			console.log('calling dispatch');
			const addToServer = async () => {
				await dispatch(
					addNewTask({
						id: new Date().toISOString(),
						title,
						details,
						startOn,
						dueOn,
						category,
						additionalNotes,
						isCompleted: false,
						progress: 0,
					})
				);
			};
			addToServer();

			console.log('done dispatch');
			setTitle('');
			setDetails('');
			setStartOn('');
			setDueOn('');
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
								<FloatingLabel
									controlId="floatingInput"
									label="Task Name"
									className="mb-3"
								>
									<Form.Control
										placeholder="Task Name"
										value={title}
										onChange={onTitleChanged}
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
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
							<Col md={6}>
								<FloatingLabel label="Start-On" className="mb-3">
									<Form.Control
										type="datetime-local"
										placeholder="Start-On"
										value={startOn}
										onChange={onStartOnChanged}
									/>
								</FloatingLabel>
							</Col>
							<Col md={6}>
								<FloatingLabel label="Due-On" className="mb-3">
									<Form.Control
										type="datetime-local"
										placeholder="Start-On"
										value={dueOn}
										onChange={onDueOnChanged}
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								<FloatingLabel controlId="floatingInput" label="Notes" className="mb-3">
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
