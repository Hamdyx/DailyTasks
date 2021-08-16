import React from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';

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
					<img src={avatarPic} alt="logo" className="avatar-pic" />
					<p>Cryptojoint</p>
					<p>Developer</p>
					<h6>Profile UI</h6>
					<div>
						<p>Project time tracker</p>
						<p>You can start tracking</p>
						<Button>x</Button>
					</div>
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
