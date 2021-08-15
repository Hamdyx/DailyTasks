import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Navbar } from './app/Navbar';

import { TasksList } from './features/tasks/TasksList';
import { AddTaskForm } from './features/tasks/AddTaskForm';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
	return (
		<Router>
			<Container fluid>
				<Row>
					<Col sm={3} md={3} className="navbar-col">
						<aside className="side-navbar">
							<Navbar />
						</aside>
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
								<Route exact path="/link2" render={() => <div>Link 2</div>} />
								<Route exact path="/link3" render={() => <div>Link 3</div>} />
								<Route exact path="/link4" render={() => <div>Link 4</div>} />
							</Switch>
						</div>
					</Col>
				</Row>
			</Container>
		</Router>
	);
}

export default App;
