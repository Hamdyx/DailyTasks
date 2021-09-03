import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { Navbar } from './app/Navbar';

import { Dashboard } from './Dashboard';
import { TasksMain } from './features/tasks/TasksMain';
import { ProjectsMain } from './features/projects/ProjectsMain';
import { EditTaskForm } from './features/tasks/EditTaskForm';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SingleTaskPage } from './features/tasks/SingleTaskPage';

function App() {
	return (
		<Router>
			<Container fluid className="main-content">
				<Row>
					<Col sm={3} md={3} className="navbar-col">
						<Navbar />
					</Col>
					<Col className="main-page">
						<div className="App">
							<Switch>
								<Route exact path="/" render={() => <Dashboard />} />
								<Route exact path="/calendar" render={() => <div>Calendar</div>} />
								<Route exact path="/tasks" render={() => <TasksMain />} />
								<Route exact path="/projects" render={() => <ProjectsMain />} />
								<Route exact path="/activity" render={() => <div>Activity</div>} />
								<Route exact path="/analytics" render={() => <div>Analytics</div>} />
								<Route exact path="/settings" render={() => <div>Settings</div>} />
								<Route exact path="/tasks/:taskId" component={SingleTaskPage} />
								<Route exact path="/editTask/:taskId" component={EditTaskForm} />
								<Redirect to="/" />
							</Switch>
						</div>
					</Col>
				</Row>
			</Container>
		</Router>
	);
}

export default App;
