import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { IoNotificationsSharp, IoMailSharp, IoCaretForward } from 'react-icons/io5';

import './Dashboard.css';
import avatarPic from './avatar.png';

export const Dashboard = () => {
	return (
		<Container fluid className="dashboard-container">
			<Row>
				<Col className="dashboard-left">
					<h5 className="text-muted">Hello, Cryptojoint</h5>
					<h5>You've got</h5>
					<h5>8 tasks today</h5>
					<Form.Control placeholder="Search something..." className="dashboard-search" />
					<Container className="dashboard-tasks-section">
						<h5>My tasks</h5>
						<Button className="tasks-timeframe">Recenlty</Button>
						<Button className="tasks-timeframe">Today</Button>
						<Button className="tasks-timeframe">Upcoming</Button>
						<Button className="tasks-timeframe">Later</Button>
						<TaskComponent />
						<TaskComponent />
					</Container>
				</Col>
				<Col>
					<DashboardProfile />
					<ProjectTracker />
					<DashboardSchedule />
				</Col>
			</Row>
		</Container>
	);
};

const DashboardSchedule = () => {
	const [today, setToday] = useState('');
	const [currMonth, setCurrMonth] = useState('');

	useEffect(() => {
		let _today = new Date();
		let _month = _today.toLocaleString('default', { month: 'long' });
		setToday(_today);
		setCurrMonth(_month);
	}, []);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return (
		<Container className="dashboard-schedule">
			<Row>
				<Col>
					<p className="dashboard-fulldate">
						{today && currMonth
							? `${currMonth} ${today.getDate()}, ${today.getFullYear()}`
							: 'today'}
					</p>
					<p className="dashboard-day">Today</p>
				</Col>
				<Col className="dashboard-addTask-col">
					<Button className="dashboard-addTask">+ add task</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<ScheduleCalendar />
				</Col>
			</Row>
		</Container>
	);
};

const TaskComponent = () => {
	return (
		<Container className="task-card">
			<h6>Task</h6>
			<p>some description about this task</p>
			<p>Progress</p>
		</Container>
	);
};

const ProjectTracker = () => {
	return (
		<Container className="dashboard-project-tracker">
			<Row>
				<Col>
					<p>Project time tracker</p>
					<p>You can start tracking</p>
				</Col>
				<Col className="projects-tracker-btn">
					<Button>
						<IoCaretForward />
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

const ScheduleCalendar = () => {
	const [days, setDays] = useState('');

	useEffect(() => {
		let daysInWeek = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		setDays(daysInWeek.map((d, i) => <th key={i}>{d.slice(0, 3)}</th>));
	}, []);

	const getDates = () => {
		let today = new Date();
		console.log(today.getDate());
		let datesLimit = 14;
		let datesArr1 = [];
		let datesArr2 = [];
		for (let i = 1; i <= datesLimit / 2; i++) {
			datesArr1.push(<td key={i}>{i}</td>);
		}
		for (let i = 8; i <= datesLimit; i++) {
			datesArr2.push(<td key={i}>{i}</td>);
		}

		return (
			<>
				<tr>{datesArr1}</tr>
				<tr>{datesArr2}</tr>
			</>
		);
	};

	return (
		<Container>
			<Table>
				<thead>
					<tr>{days}</tr>
				</thead>
				<tbody>{getDates()}</tbody>
			</Table>

			<Row>
				<Col>
					<TaskComponent />
					<TaskComponent />
				</Col>
			</Row>
		</Container>
	);
};

const DashboardProfile = () => {
	return (
		<Container className="dashboard-profile">
			<Row>
				<Col sm={{ span: 3 }}>
					<img src={avatarPic} alt="logo" className="avatar-pic" />
				</Col>
				<Col className="profile-info">
					<p>Cryptojoint</p>
					<p>Developer</p>
				</Col>
				<Col className="profie-icons">
					<Button className="profile-btn">
						<IoNotificationsSharp />
					</Button>
					<Button className="profile-btn">
						<IoMailSharp />
					</Button>
				</Col>
			</Row>
		</Container>
	);
};
