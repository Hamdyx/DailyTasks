import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { AddTaskForm } from './features/tasks/AddTaskForm';
import { TasksList } from './features/tasks/TasksList';
import { TaskCard } from './features/tasks/TaskCard';

import './TasksMain.css';
import { useSelector } from 'react-redux';
import { selectAllTasks, selectTasksIds } from './features/tasks/tasksSlice';

export const TasksMain = () => {
	const tasksIds = useSelector(selectTasksIds);
	let allTasks = useSelector(selectAllTasks);

	const content = tasksIds.map((id) => <TaskCard taskId={id} />);

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

	let inReviewTasks = allTasks.filter(
		(task) => task.progress >= 99 && task.isCompleted === false
	);
	let inReviewContent = inReviewTasks.map((task) => (
		<TaskCard key={task.id} taskId={task.id} />
	));

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
			</Row>
			<Row className="tasks-details">
				<Col className="total-tasks">
					<h6>Total Tasks</h6>
					<p>123,456</p>
				</Col>
				<Col className="tasks-productivity">
					<h6>Productivity</h6>
					<p>85.45%</p>
				</Col>
				<Col className="tasks-dueDate">
					<h6>Due date</h6>
					<p>19 Aug 2021</p>
				</Col>
				<Col className="tasks-attach">
					<h6>Attachments</h6>
					<p>85</p>
				</Col>
			</Row>
			<Row>
				<Col>
					Next up
					{nextContent}
				</Col>
				<Col>
					In Progress
					{inProgressContent}
				</Col>
				<Col>
					In review
					{inReviewContent}
				</Col>
				<Col>
					Finished
					{finishedContent}
				</Col>
			</Row>
		</Container>
	);
};
