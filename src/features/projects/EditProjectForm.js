import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { projectUpdated, selectProjectById } from './projectsSlice';

import { Col, Container, Form, Row, FloatingLabel } from 'react-bootstrap';
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
	const [isCompleted, setIsCompleted] = useState(project.isCompleted);

	const dispatch = useDispatch();

	const titleChanged = (ev) => setTitle(ev.target.value);
	const startTimeChanged = (ev) => setStartTime(ev.target.value);
	const endTimeChanged = (ev) => setEndTime(ev.target.value);
	const isCompletedChanged = (ev) => setIsCompleted(ev.target.checked);

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
							placeholder="Task Title"
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
					<Link to={`/projects`} onClick={handleFormSubmit} className="customBg-link">
						Save Project
					</Link>
				</Col>
			</Row>
		</Container>
	);
};
