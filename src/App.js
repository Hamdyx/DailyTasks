import React from 'react';
import logo from './logo.svg';

import { TasksList } from './features/tasks/TasksList';
import { AddTaskForm } from './features/tasks/AddTaskForm';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<div className="App">
			<header className="App-header"></header>
			<AddTaskForm />
			<TasksList />
		</div>
	);
}

export default App;
