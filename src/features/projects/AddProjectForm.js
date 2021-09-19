import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addNewProject } from './projectsSlice';

import { Row, Col, Form, Button, Modal, FloatingLabel } from 'react-bootstrap';

export const AddProjectForm = () => {
	const [title, setTitle] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const [show, setShow] = useState(false);

	const handleModalShow = () => setShow(true);
	const handleModalClose = () => setShow(false);

	const dispatch = useDispatch();

	const titleChanged = (ev) => setTitle(ev.target.value);
	const startTimeChanged = (ev) => setStartTime(ev.target.value);
	const endTimeChanged = (ev) => setEndTime(ev.target.value);

	const handleFormSubmit = () => {
		if (title && startTime) {
			console.log('calling dispatch');
			dispatch(
				addNewProject({
					id: new Date().toISOString(),
					title,
					startTime,
					endTime,
					isCompleted: false,
				})
			);
			console.log('done dispatch');
			setTitle('');
			setStartTime('');
			setEndTime('');
			handleModalClose();
		}
	};

	return (
		<section className="add-project-form">
			<h5>Hello %USERNAME%</h5>
			<p>You can track all of your projects here</p>
			<Button className="customBg-btn" onClick={handleModalShow}>
				Add Project
			</Button>
			<Modal show={show} onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col>
								<FloatingLabel
									controlId="floatingInput"
									label="Project Title"
									className="mb-3"
								>
									<Form.Control
										placeholder="project title"
										value={title}
										onChange={titleChanged}
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row>
							<Col>
								<FloatingLabel
									controlId="floatingInput"
									label="Start Time"
									className="mb-3"
								>
									<Form.Control
										type="time"
										placeholder="when the project started..."
										value={startTime}
										onChange={startTimeChanged}
									/>
								</FloatingLabel>
							</Col>
							<Col>
								<FloatingLabel
									controlId="floatingInput"
									label="End Time"
									className="mb-3"
								>
									<Form.Control
										type="time"
										placeholder="when the project is finished..."
										value={endTime}
										onChange={endTimeChanged}
									/>
								</FloatingLabel>
							</Col>
						</Row>
						<Row></Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Close
					</Button>
					<Button onClick={handleFormSubmit} className="customBg-btn">
						Add Task
					</Button>
				</Modal.Footer>
			</Modal>
		</section>
	);
};
