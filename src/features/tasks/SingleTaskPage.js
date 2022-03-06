import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectTaskById } from './tasksSlice';

export const SingleTaskPage = ({ match }) => {
	const { taskId } = match.params;

	const task = useSelector((state) => selectTaskById(state, taskId));

	if (!task) {
		console.log('task not found in SingleTaskPage');
		return (
			<section>
				<h4>Task not found</h4>
			</section>
		);
	}

	return (
		<section>
			<article>
				<h2>{task.title} </h2>
				<p>{task.details}</p>
				<Link to={`/editTask/${task.id}`} className="button">
					Edit Task
				</Link>
			</article>
		</section>
	);
};
