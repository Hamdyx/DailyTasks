import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { projectUpdated, selectProjectById } from './projectsSlice';

import {
	Col,
	Container,
	Form,
	Row,
	FloatingLabel,
	Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const EditProjectForm = ({ match }) => {
	const { projectId } = match.params;

	const project = useSelector((state) => selectProjectById(state, projectId));

	if (!project) {
		console.log(match);
		console.log(projectId);

		console.log('project not found in EditProjectForm');
	}
	const [title, setTitle] = useState(project.title);
	const [startTime, setStartTime] = useState(project.startTime);
	const [endTime, setEndTime] = useState(project.endTime);
	const [checklist, setChecklist] = useState(project.checklist);
	const [isCompleted, setIsCompleted] = useState(project.isCompleted);

	const dispatch = useDispatch();

	const titleChanged = (ev) => setTitle(ev.target.value);
	const startTimeChanged = (ev) => setStartTime(ev.target.value);
	const endTimeChanged = (ev) => setEndTime(ev.target.value);
	const isCompletedChanged = (ev) => setIsCompleted(ev.target.checked);

	const getChecklist = () => {
		let content;
		console.log(checklist);
		if (checklist.length === 0) {
			return <h5>There is no checklist</h5>;
		} else {
			content = checklist.map((el, i) => (
				<ChecklistItem
					key={i}
					item={el}
					list={checklist}
					setList={setChecklist}
				/>
			));
		}
		return <ul className="text-left">{content}</ul>;
	};

	const handleFormSubmit = () => {
		console.log('project edited and saved');
		console.log(`title: ${title}`);
		console.log(`startTime: ${startTime}`);
		console.log(`endTime: ${endTime}`);
		console.log(`isCompleted: ${isCompleted}`);
		if (title && startTime) {
			dispatch(
				projectUpdated({
					id: projectId,
					title,
					startTime,
					endTime,
					checklist,
					isCompleted,
				})
			);
		}
	};
	return (
		<Container>
			<Row>
				<Col>
					<h4>Edit Project</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<FloatingLabel label="Project Title" className="mb-3">
						<Form.Control
							placeholder="Project Title"
							value={title}
							onChange={titleChanged}
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col>
					<FloatingLabel label="Start-Time" className="mb-3">
						<Form.Control
							type="time"
							placeholder="When the project started..."
							value={startTime}
							onChange={startTimeChanged}
						/>
					</FloatingLabel>
				</Col>
				<Col>
					<FloatingLabel label="End-Time" className="mb-3">
						<Form.Control
							type="time"
							placeholder="When the project is finished..."
							value={endTime}
							onChange={endTimeChanged}
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Checklist checklist={checklist} setChecklist={setChecklist} />
			<Row>
				<Col>{getChecklist()}</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label>mark completed</Form.Label>
					<Form.Check
						type="checkbox"
						onChange={isCompletedChanged}
						checked={isCompleted}
					/>
				</Col>
				<Col>
					{/* <Button onClick={handleFormSubmit} className="customBg-btn">
						Save Project
					</Button> */}
					<Link
						to={`/projects`}
						onClick={handleFormSubmit}
						className="customBg-link"
					>
						Save Project
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

const Checklist = ({ checklist, setChecklist }) => {
	const [title, setTitle] = useState('');
	const [startDate, setStartDate] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [isCompleted, setIsCompleted] = useState(false);

	const titleChanged = (e) => setTitle(e.target.value);
	const startDateChanged = (e) => setStartDate(e.target.value);
	const dueDateChanged = (e) => setDueDate(e.target.value);
	const isCompletedChanged = (e) => setIsCompleted(e.target.value);

	const taskAdded = () => {
		let _checklist = Array.from(checklist);

		_checklist.push({
			title,
			startDate,
			dueDate,
			isCompleted,
			completionDate: '',
		});
		setChecklist(_checklist);
		// setTitle('');
		// setStartDate('');
		// setDueDate('');
	};

	return (
		<Row>
			<Col>
				<h5 className="text-left">Checklist:</h5>
			</Col>
			<Col>
				<FloatingLabel label="Task Title" className="mb-3">
					<Form.Control
						placeholder="Task Title"
						value={title}
						onChange={titleChanged}
					/>
				</FloatingLabel>
			</Col>
			<Col>
				<FloatingLabel label="Start Date" className="mb-3">
					<Form.Control
						type="date"
						placeholder="Start Date"
						value={startDate}
						onChange={startDateChanged}
					/>
				</FloatingLabel>
			</Col>
			<Col>
				<FloatingLabel label="Due Date" className="mb-3">
					<Form.Control
						type="date"
						placeholder="Due Date"
						value={dueDate}
						onChange={dueDateChanged}
					/>
				</FloatingLabel>
			</Col>
			<Col>
				<Button onClick={taskAdded}>+</Button>
			</Col>
		</Row>
	);
};

const ChecklistItem = ({ item, list, setList }) => {
	const [title, setTitle] = useState(item.title);
	const [startDate, setStartDate] = useState(item.startDate);
	const [dueDate, setDueDate] = useState(item.dueDate);
	const [isDisabled, setIsDisabled] = useState(true);

	const titleChanged = (ev) => setTitle(ev.target.value);
	const startDateChanged = (ev) => setStartDate(ev.target.value);
	const dueDateChanged = (ev) => setDueDate(ev.target.value);
	const toggleEdit = () => setIsDisabled(!isDisabled);

	const saveItem = () => {
		let _list = Array.from(list);
		let _item = _list.find((el) => el.title === item.title);

		_item = { ...item, title, startDate, dueDate };

		let i = _list.indexOf(item);
		_list[i] = _item;

		setList(_list);
		setIsDisabled(true);
	};

	return (
		<li>
			<Row>
				<Col>
					<FloatingLabel label="Task Title" className="mb-3">
						<Form.Control
							placeholder="Task Title"
							value={title}
							onChange={titleChanged}
							disabled={isDisabled}
						/>
					</FloatingLabel>
				</Col>
				<Col>
					<FloatingLabel label="Start Date" className="mb-3">
						<Form.Control
							type="date"
							placeholder="Start Date"
							value={startDate}
							onChange={startDateChanged}
							disabled={isDisabled}
						/>
					</FloatingLabel>
				</Col>
				<Col>
					<FloatingLabel label="Due Date" className="mb-3">
						<Form.Control
							type="date"
							placeholder="Due Date"
							value={dueDate}
							onChange={dueDateChanged}
							disabled={isDisabled}
						/>
					</FloatingLabel>
				</Col>
				<Col>
					<Button onClick={toggleEdit}>Edit</Button>
					<Button onClick={saveItem}>Save</Button>
				</Col>
			</Row>
		</li>
	);
};
