import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { TaskCard } from './TaskCard';
import './TasksMain.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, fetchTasks } from './tasksSlice';

export const TasksMain = () => {
	const [category, setCategory] = useState('work');

	const dispatch = useDispatch();

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

		document.querySelectorAll('.category-btn').forEach((item) => {
			item.addEventListener('click', (ev) => {
				setCategory(ev.currentTarget.value);
			});
		});
	}, [dispatch]);

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
