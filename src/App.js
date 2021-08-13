import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { TasksList } from './features/tasks/TasksList';
import { AddTaskForm } from './features/tasks/AddTaskForm';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Counter />
				<AddTaskForm />
				<TasksList />
			</header>
		</div>
	);
}

export default App;
