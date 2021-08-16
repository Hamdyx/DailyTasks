import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { Navbar } from './app/Navbar';

import { TasksList } from './features/tasks/TasksList';
import { AddTaskForm } from './features/tasks/AddTaskForm';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Router>
			<Container fluid className="main-content">
				<Row>
					<Col sm={3} md={3} className="navbar-col">
						<Navbar />
					</Col>
					<Col>
						<div className="App">
							<Switch>
								<Route
									exact
									path="/"
									render={() => (
										<React.Fragment>
											<AddTaskForm />
											<TasksList />
										</React.Fragment>
									)}
								/>
								<Route exact path="/calendar" render={() => <div>Calendar</div>} />
								<Route
									exact
									path="/tasks"
									render={() => (
										<React.Fragment>
											<AddTaskForm />
											<TasksList />
										</React.Fragment>
									)}
								/>
								<Route exact path="/projects" render={() => <div>Projects</div>} />
								<Route exact path="/activity" render={() => <div>Activity</div>} />
								<Route exact path="/analytics" render={() => <div>Analytics</div>} />
								<Route exact path="/settings" render={() => <div>Settings</div>} />
							</Switch>
						</div>
					</Col>
				</Row>
			</Container>
		</Router>
	);
}

export default App;
