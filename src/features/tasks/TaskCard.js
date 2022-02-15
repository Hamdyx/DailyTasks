import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskById, taskUpdated } from './tasksSlice';
import { DeleteTaskModal } from './DeleteTaskModal';

import { Container, Row, Col, Form, ProgressBar } from 'react-bootstrap';

import { FaEdit } from 'react-icons/fa';
import { RiTimerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

// const DateIcons = React.lazy(() => import('react-icons/ri'));

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
			/* item.addEventListener('mouseenter', (ev) => {
				onTaskEnter(ev);
			}); */
			// hide taskCheckbox and editTask icons
			/* item.addEventListener('mouseleave', (ev) => {
				onTaskLeave(ev);
			}); */
		});
	}, []);

	const onTaskEnter = (ev) => {
		console.log('onTaskEnter called');
		let _target = ev.currentTarget;
		let testRow = _target.firstChild;
		let checkBtnRow = _target.children[3];
		let checkBtnDom = checkBtnRow.children[0];
		let testDom = testRow.children[1];

		testDom.style.display = 'block';
		checkBtnDom.style.display = 'block';
	};
	const onTaskLeave = (ev) => {
		let _target = ev.currentTarget;
		let testRow = _target.firstChild;
		let testDom = testRow.children[1];
		let checkBtnRow = _target.children[3];
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
					<Col className="taskCard-icons ">
						<Link
							className="task-edit-icon animate__animated animate__fadeInRight"
							to={`/editTask/${task.id}`}
						>
							<FaEdit />
						</Link>
						<DeleteTaskModal id={task.id} />
					</Col>
				</Row>
				{/* <ProgressBar now={task.progress} label={`${task.progress}%`} animated /> */}
				<p>{task.details}</p>
				<p>{task.additionalNotes}</p>

				<Row>
					<Col className="taskCard-checkbox ">
						<Form.Check
							type="checkbox"
							className="task-checkBtn animate__animated animate__fadeInLeft"
							onChange={onTaskCheck}
							checked={isCompleted}
						/>
					</Col>
					<Col className="text-right">
						<div className="dueTime-div">
							{/* <Suspense fallback={<div>loading</div>}>
								<DateIcons />
							</Suspense> */}
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
		<Container
			className={`task-card ${
				isCompleted ? 'task-finished' : ''
			} animate__animated animate__flipInX`}
			onMouseEnter={onTaskEnter}
			onMouseLeave={onTaskLeave}
		>
			{content}
		</Container>
	);
};
