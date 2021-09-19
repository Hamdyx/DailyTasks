import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '../features/tasks/tasksSlice';
import projectReducer from '../features/projects/projectsSlice';
/* import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; */

export const store = configureStore(
	{
		reducer: {
			tasks: tasksReducer,
			projects: projectReducer,
		},
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	/* composeWithDevTools(applyMiddleware(...middleware)) */
);
