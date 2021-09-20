import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import { AddTaskForm } from './AddTaskForm';
import { TaskCard } from './TaskCard';

import tasksArt from '../../tasks_art.svg';

import '../../TasksMain.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, selectTasksIds, fetchTasks } from './tasksSlice';

export const TasksMain = () => {
	const [today, setToday] = useState('');

	const dispatch = useDispatch();

	const tasksIds = useSelector(selectTasksIds);
	let allTasks = useSelector(selectAllTasks);

	useEffect(() => {
		const fetchData = async () => {
			let res = await dispatch(fetchTasks());
			return res;
		};
		fetchData();
		const testDate = new Date().toUTCString().split(' ');
		setToday(`${testDate[1]} ${testDate[2]} ${testDate[3]}`);
	}, []);

	let totalProgress = 0;
	let avgProgress = 0;
	if (tasksIds.length > 0) {
		allTasks.forEach((task) => (totalProgress += task.progress));
		console.log(`totalProgress: ${totalProgress}`);
		avgProgress = totalProgress / tasksIds.length;
		// setProductivity(testProgress);
		console.log(`avgProgress: ${avgProgress}`);
	}

	let nextTasks = allTasks.filter(
		(task) => task.isCompleted === false && task.progress === 0
	);
	let nextContent = nextTasks.map((task) => <TaskCard key={task.id} taskId={task.id} />);

	let inProgressTasks = allTasks.filter(
		(task) => task.progress > 0 && task.progress < 100
	);
	let inProgressContent = inProgressTasks.map((task) => (
		<TaskCard key={task.id} taskId={task.id} />
	));

	/* let inReviewTasks = allTasks.filter(
		(task) => task.progress >= 99 && task.isCompleted === false
	); */

	/* let inReviewContent = inReviewTasks.map((task) => (
		<TaskCard key={task.id} taskId={task.id} />
	)); */

	let finishedTasks = allTasks.filter((task) => task.isCompleted === true);
	let finishedContent = finishedTasks.map((task) => (
		<TaskCard key={task.id} taskId={task.id} />
	));
	return (
		<Container fluid>
			<Row>
				<Col>
					<AddTaskForm />
				</Col>
				<Col>
					<Image src={tasksArt} alt="tasks art" width={450} height={300} />
				</Col>
			</Row>
			<Row className="tasks-details">
				<Col className="total-tasks">
					<h6>Total Tasks</h6>
					<p>{tasksIds.length}</p>
				</Col>
				<Col className="tasks-productivity">
					<h6>Productivity</h6>
					<p>{avgProgress.toFixed(2)}%</p>
				</Col>
				<Col className="tasks-dueDate">
					<h6>Due date</h6>
					<p>{today}</p>
				</Col>
				<Col className="tasks-attach">
					<h6>Attachments</h6>
					<p>85</p>
				</Col>
			</Row>
			<Row className="tasks-sections">
				<Col>
					<p>
						Next up <span className="tasks-status-badge">{nextContent.length}</span>
					</p>

					{nextContent}
				</Col>
				<Col>
					In Progress{' '}
					<span className="tasks-status-badge">{inProgressContent.length}</span>
					{inProgressContent}
				</Col>
				{/* <Col>
					In review
					{inReviewContent}
				</Col> */}
				<Col>
					Finished <span className="tasks-status-badge">{finishedContent.length}</span>
					{finishedContent}
				</Col>
			</Row>
		</Container>
	);
};
