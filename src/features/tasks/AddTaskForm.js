import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomFloatingLabel from '../../components/inputs/CustomFloatingLabel';
import { addNewTask } from './tasksSlice';

import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export const AddTaskForm = () => {
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [startOn, setStartOn] = useState('');
	const [dueOn, setDueOn] = useState('');
	const [category, setCategory] = useState('work');
	const [additionalNotes, setAdditionalNotes] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('');

	const [show, setShow] = useState(false);

	const handleModalShow = () => setShow(true);
	const handleModalClose = () => setShow(false);

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onDetailsChanged = (e) => setDetails(e.target.value);
	const onStartOnChanged = (e) => setStartOn(e.target.value);
	const onDueOnChanged = (e) => setDueOn(e.target.value);
	const onNotesChanged = (e) => setAdditionalNotes(e.target.value);
	const onCategoryChanged = (e) => setCategory(e.target.value);

	const canSave = [title].every(Boolean) && addRequestStatus === 'idle';

	const onFormSubmit = () => {
		if (title && details) {
			console.log(`title: ${title}`);
			console.log(`details: ${details}`);
			console.log('calling dispatch');
			const addToServer = async () => {
				dispatch(
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

	let testCat = ['work', 'personal', 'healthcare', 'read', 'games'];
	let categoryContent = testCat.map((el, i) => (
		<Button
			key={i}
			value={el}
			className={`category-btn ${el === category ? 'active' : ''}`}
			onClick={onCategoryChanged}
		>
			{el}
		</Button>
	));

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
								<CustomFloatingLabel
									type={'text'}
									label={'Title'}
									value={title}
									changeFunc={onTitleChanged}
								/>
								<CustomFloatingLabel
									type={'text'}
									label={'Description'}
									value={details}
									changeFunc={onDetailsChanged}
								/>
							</Col>
							<Col>
								<p>Category</p>
								{categoryContent}
							</Col>
						</Row>
						<Row></Row>
						<Row>
							<Col md={6}>
								<CustomFloatingLabel
									type={'datetime-local'}
									label={'Start-On'}
									value={startOn}
									changeFunc={onStartOnChanged}
								/>
							</Col>
							<Col md={6}>
								<CustomFloatingLabel
									type={'datetime-local'}
									label={'Due-On'}
									value={dueOn}
									changeFunc={onDueOnChanged}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<CustomFloatingLabel
									type={'text'}
									label={'Notes'}
									value={additionalNotes}
									changeFunc={onNotesChanged}
								/>
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
