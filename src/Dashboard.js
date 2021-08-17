import React from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { IoNotificationsSharp, IoMailSharp } from 'react-icons/io5';

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
	return (
		<Container className="dashboard-schedule">
			<Row>
				<Col>
					<p className="dashboard-fulldate">August 10, 2021</p>
					<p className="dashboard-day">Today</p>
				</Col>
				<Col>
					<Button className="dashboard-addTask">+ add task</Button>
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
		<Container className="dashboard-procjet-tracker">
			<Row>
				<Col>
					<p>Project time tracker</p>
					<p>You can start tracking</p>
				</Col>
				<Col>
					<Button>X</Button>
				</Col>
			</Row>
		</Container>
	);
};

const DashboardProfile = () => {
	return (
		<Container className="dashboard-profile">
			<Row>
				<Col sm={{ span: 4 }}>
					<img src={avatarPic} alt="logo" className="avatar-pic" />
				</Col>
				<Col className="profile-info">
					<p>Cryptojoint</p>
					<p>Developer</p>
				</Col>
				<Col>
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
