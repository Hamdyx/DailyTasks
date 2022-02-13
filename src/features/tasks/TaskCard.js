import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskById, taskUpdated } from './tasksSlice';
import { DeleteTaskModal } from './DeleteTaskModal';

import { Container, Row, Col, Form, ProgressBar } from 'react-bootstrap';

import { FaEdit } from 'react-icons/fa';
import { RiTimerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const TaskCard = ({ taskId }) => {
	const dispatch = useDispatch();
	const task = useSelector((state) => selectTaskById(state, taskId));
	let isCompleted;
	if (task) {
		isCompleted = task.isCompleted;
	}

	const onTaskCheck = (ev) => {
		console.log(`${ev.target.checked}`);
		isCompleted = ev.target.checked;
		let progress = isCompleted ? 100 : 0;
		let { id, title, details, additionalNotes } = task;
		dispatch(taskUpdated({ id, title, details, additionalNotes, isCompleted, progress }));
	};

	const formatDueDate = (date) => {
		const dateObj = new Date(date);
		const dateString = dateObj.toUTCString().split(' ');
		const timeString = dateObj.toLocaleTimeString().split(':');
		let datePart;

		if (dateObj.toDateString() === new Date().toDateString()) {
			datePart = 'Today';
		} else {
			datePart = `${dateString[1]} ${dateString[2]}`;
		}

		const timePart = `${timeString[0]}:${timeString[1]} ${timeString[2].split(' ')[1]}`;
		return `${datePart} ${timePart}`;
	};

	let content;
	if (task) {
		content = (
			<React.Fragment>
				<Row>
					<Col className="text-left">
						<p>{task.title}</p>
					</Col>
					<Col className="task-edit-icon">
						<Link to={`/editTask/${task.id}`}>
							<FaEdit />
						</Link>
						<DeleteTaskModal id={task.id} />
					</Col>
				</Row>
				<ProgressBar now={task.progress} label={`${task.progress}%`} animated />
				<p>{task.details}</p>
				<p>{task.additionalNotes}</p>
				<Form.Check type="checkbox" onChange={onTaskCheck} checked={isCompleted} />
				<Row>
					<Col className="text-right">
						<div className="dueTime-div">
							<RiTimerLine />
							{formatDueDate(task.dueOn)}
						</div>
					</Col>
				</Row>
			</React.Fragment>
		);
	} else {
		content = <div>Loading</div>;
	}
	return <Container className="customBg-card">{content}</Container>;
};
