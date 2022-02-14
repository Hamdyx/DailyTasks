import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskById, taskUpdated } from './tasksSlice';
import { DeleteTaskModal } from './DeleteTaskModal';
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';

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

	useEffect(() => {
		console.log('adding onMouseEnter event');
		document.querySelectorAll('.task-card').forEach((item) => {
			// show taskCheckbox and editTask icons
			item.addEventListener('mouseenter', (ev) => {
				onTaskEnter(ev);
			});
			// hide taskCheckbox and editTask icons
			item.addEventListener('mouseleave', (ev) => {
				onTaskLeave(ev);
			});
		});
	}, []);

	const onTaskEnter = (ev) => {
		let _target = ev.currentTarget;
		let testRow = _target.firstChild;
		let checkBtnRow = _target.children[4];
		let checkBtnDom = checkBtnRow.children[0];
		let testDom = testRow.children[1];

		testDom.style.display = 'block';
		checkBtnDom.style.display = 'block';
	};
	const onTaskLeave = (ev) => {
		let _target = ev.currentTarget;
		let testRow = _target.firstChild;
		let testDom = testRow.children[1];
		let checkBtnRow = _target.children[4];
		let checkBtnDom = checkBtnRow.children[0];

		testDom.style.display = 'none';
		checkBtnDom.style.display = 'none';
	};

	let content;
	if (task) {
		content = (
			<React.Fragment>
				<Row>
					<Col>
						<p className="task-title">{task.title}</p>
					</Col>
					<Col className="taskCard-icons">
						<Slide right>
							<Link className="task-edit-icon" to={`/editTask/${task.id}`}>
								<FaEdit />
							</Link>
							<DeleteTaskModal id={task.id} />
						</Slide>
					</Col>
				</Row>
				<ProgressBar now={task.progress} label={`${task.progress}%`} animated />
				<p>{task.details}</p>
				<p>{task.additionalNotes}</p>

				<Row>
					<Col className="taskCard-checkbox">
						<Slide left>
							<Form.Check
								type="checkbox"
								className="task-checkBtn"
								onChange={onTaskCheck}
								checked={isCompleted}
							/>
						</Slide>
					</Col>
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
	return (
		<Flip top>
			<Container className={`task-card ${isCompleted ? 'task-finished' : ''}`}>
				{content}
			</Container>
		</Flip>
	);
};
