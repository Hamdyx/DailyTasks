import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Form, FloatingLabel, Button } from 'react-bootstrap';

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
				console.log(ev);
				// ev.currentTarget.classList.add('active');

				setCategory(ev.currentTarget.value);
			});
		});
	}, [dispatch]);

	let totalProgress = 0;
	let avgProgress = 0;
	if (tasksIds.length > 0) {
		allTasks.forEach((task) => (totalProgress += task.progress));
		// console.log(`totalProgress: ${totalProgress}`);
		avgProgress = totalProgress / tasksIds.length;
		// setProductivity(testProgress);
		// console.log(`avgProgress: ${avgProgress}`);
	}

	const getFormatedDate = (d) => {
		let ep = Date.parse(d);
		// console.log(`Epoch ${ep}`);
		let newDate = new Date(ep);
		// console.log(`newDate: ${newDate}`);
		let formatedDate = newDate.toLocaleDateString();
		// console.log(`F-Date: ${formatedDate}`);
		return formatedDate;
	};

	const onCategoryChange = (ev) => {
		console.log(ev.target.value);
		setCategory(ev.target.value);
	};

	/* const filteredTasks = allTasks.filter(
		(task) => getFormatedDate(task.startOn) === getFormatedDate(task.startOn)
	); */
	// change the date to inputDate
	const filteredTasks = allTasks.filter(
		(task) =>
			getFormatedDate(task.startOn) === getFormatedDate(task.startOn) &&
			task.category === category
	);
	/* 	const filteredTasks = allTasks.filter(
		(task) => getFormatedDate(task.startOn) === new Date().toLocaleDateString()
	); */

	const handleInitialDailyTasks = () => {
		if (tasksStatus === 'idle') {
			console.log(`tasksStatus: ${tasksStatus}`);
		} else if (tasksStatus === 'succeeded') {
			console.log(`tasksStatus: ${tasksStatus}`);
		}
	};

	let nextTasks = filteredTasks.filter(
		(task) => task.isCompleted === false && task.progress === 0
	);
	let nextContent = nextTasks.map((task) => <TaskCard key={task.id} taskId={task.id} />);

	let inProgressTasks = filteredTasks.filter(
		(task) => task.progress > 0 && task.progress < 100
	);
	let inProgressContent = inProgressTasks.map((task) => (
		<TaskCard key={task.id} taskId={task.id} />
	));

	let finishedTasks = filteredTasks.filter((task) => task.isCompleted === true);
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

const CategoryBtn = ({ category, active }) => {
	return (
		<Button className="category-btn" value={category} active={active}>
			<span className={`${category}-icon`}></span>
			{category}
		</Button>
	);
};
