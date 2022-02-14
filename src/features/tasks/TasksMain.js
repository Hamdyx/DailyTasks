import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { AddTaskForm } from './AddTaskForm';
import { TaskCard } from './TaskCard';
import './TasksMain.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, selectTasksIds, fetchTasks } from './tasksSlice';

export const TasksMain = () => {
	const [today, setToday] = useState('');
	const [category, setCategory] = useState('work');

	const dispatch = useDispatch();
	const tasksImg = 'images/tasks_art.svg';

	const tasksIds = useSelector(selectTasksIds);
	const allTasks = useSelector(selectAllTasks);
	const tasksStatus = useSelector((state) => state.tasks.status);

	const categories = ['work', 'personal', 'healthcare', 'read', 'games'];
	let categoryBtns = [];
	categoryBtns = categories.map((el, i) => (
		<CategoryBtn key={i} category={el} active={el === category} />
	));
	useEffect(() => {
		const fetchData = async () => {
			let res = await dispatch(fetchTasks());
			handleInitialDailyTasks();
			return res;
		};
		fetchData();
		const testDate = new Date().toUTCString().split(' ');
		setToday(`${testDate[1]} ${testDate[2]} ${testDate[3]}`);
		document.querySelectorAll('.category-btn').forEach((item) => {
			item.addEventListener('click', (ev) => {
				setCategory(ev.currentTarget.value);
			});
		});
	}, [dispatch]);

	let totalProgress = 0;
	let avgProgress = 0;
	if (tasksIds.length > 0) {
		allTasks.forEach((task) => (totalProgress += task.progress));

		avgProgress = totalProgress / tasksIds.length;
	}

	// filter by category
	// @dev filter by dueDate
	const filteredTasks = allTasks.filter((task) => task.category === category);

	const handleInitialDailyTasks = () => {
		if (tasksStatus === 'idle') {
			console.log(`tasksStatus: ${tasksStatus}`);
		} else if (tasksStatus === 'succeeded') {
			console.log(`tasksStatus: ${tasksStatus}`);
		}
	};
	let devTasks = filteredTasks;
	let devContent = devTasks.map((task) => <TaskCard key={task.id} taskId={task.id} />);

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
			</Row>
		</Container>
	);
};

const CategoryBtn = ({ category, active }) => {
	return (
		<Button className="category-btn" value={category} active={active}>
			<span className={`${category}-icon`}></span>
			{category}
		</Button>
	);
};
