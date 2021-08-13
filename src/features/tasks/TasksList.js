import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTasksIds } from './tasksSlice';

export const TasksList = () => {
	const dispatch = useDispatch();

	const taskStatus = useSelector((state) => state.tasks.status);
	const error = useSelector((state) => state.tasks.error);

	let content;
	if (taskStatus === 'loading') {
		content = <div className="loader">Loading...</div>;
	} else if (taskStatus === 'succeeded') {
		content = <div>some tasks</div>;
	} else if (taskStatus === 'failed') {
		content = <div>{error}</div>;
	} else {
		content = <div>taskStatus: Idle</div>;
	}

	return (
		<section className="tasks-list">
			<h2>Tasks</h2>
			{content}
		</section>
	);
};
