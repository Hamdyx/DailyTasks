import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { AddTaskForm } from '../features/tasks/AddTaskForm';
// import { TaskCard } from './TaskCard';
// import './Tasks.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, selectTasksIds, fetchTasks } from '../features/tasks/tasksSlice';

export const TasksPage = () => {
	const tasksImg = 'images/tasks_art.svg';
	const tasksIds = useSelector(selectTasksIds);
	const allTasks = useSelector(selectAllTasks);
	const testDate = new Date().toUTCString().split(' ');
	let today = `${testDate[1]} ${testDate[2]} ${testDate[3]}`;

	let totalProgress = 0;
	let avgProgress = 0;
	if (tasksIds.length > 0) {
		allTasks.forEach((task) => (totalProgress += task.progress));

		avgProgress = totalProgress / tasksIds.length;
	}

	return (
		<Container fluid>
			<Row>
				<Col>
					<AddTaskForm />
				</Col>
				<Col>
					<Image src={tasksImg} alt="tasks art" width={450} height={300} />
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
			{/*
			<Row>
				<Col md={{ span: 8 }} className="text-left">
					{categoryBtns}
				</Col>
				<Col>
					<Button className="category-btn">
						<span className="addCategory-icon"></span>
						new category
					</Button>
				</Col>
			</Row>
			<Row className="tasks-sections">
				<Col>
					<p>
						Next up <span className="tasks-status-badge">{devContent.length}</span>
					</p>
					{devContent}
				</Col>
			</Row> */}
		</Container>
	);
};
/* 
const CategoryBtn = ({ category, active }) => {
	return (
		<Button className="category-btn" value={category} active={active}>
			<span className={`${category}-icon`}></span>
			{category}
		</Button>
	);
};
 */
