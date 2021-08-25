import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { taskUpdated, selectTaskById } from './tasksSlice';

import { Col, Container, Form, Row, Button, ProgressBar } from 'react-bootstrap';

export const EditTaskForm = ({ match }) => {
	const { taskId } = match.params;

	const task = useSelector((state) => selectTaskById(state, taskId));

	if (!task) {
		console.log(match);
		console.log(taskId);

		console.log('task not found in EditTaskForm');
		/* return (
			<section>
				<h2>Task not found!</h2>
			</section>
		); */
	}

	const [title, setTitle] = useState(task.title);

	const [details, setDetails] = useState(task.details);
	const [additionalNotes, setAdditionalNotes] = useState(task.additionalNotes);
	const [isCompleted, setIsCompleted] = useState(task.isCompleted);

	const [target, setTarget] = useState(0);
	const [achieved, setAchieved] = useState(0);
	const [progress, setProgress] = useState(task.progress);

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onDetailsChanged = (e) => setDetails(e.target.value);
	const onAdditionalNotesChanged = (e) => setAdditionalNotes(e.target.value);
	const onTaskCheck = (ev) => {
		console.log(`${ev.target.checked}`);
		// isCompleted = ev.target.checked;
		let _progress = ev.target.checked ? 100 : 0;
		setIsCompleted(ev.target.checked);
		setProgress(_progress);
		// let isCompleted = ev.target.checked;
		// let { id, title, details } = task;
		// dispatch(taskUpdated({ id, title, details, additionalNotes, isCompleted, progress }));
	};

	const onTargetChanged = (ev) => {
		setTarget(ev.target.value);
		// onProgressUpdated();
	};

	const onAchievedChanged = (ev) => {
		setAchieved(ev.target.value);
		// onProgressUpdated();
	};
	const onProgressUpdated = () => {
		console.log(`target: ${target}`);
		console.log(`achieved: ${achieved}`);
		let _progress = ((achieved / target) * 100).toFixed(2);
		setProgress(Number(_progress));
	};

	const onSaveTaskClicked = () => {
		console.log('task edited and saved');
		console.log(`title: ${title}`);
		console.log(`details: ${details}`);
		console.log(`additional notes: ${additionalNotes}`);
		console.log(`progress: ${progress}`);
		// let { isCompleted } = task;
		if (title && details) {
			dispatch(
				taskUpdated({
					id: taskId,
					title,
					details,
					additionalNotes,
					isCompleted,
					progress,
				})
			);
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<h4>Edit Task</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label>Task Title</Form.Label>
					<Form.Control
						placeholder="task title"
						value={title}
						onChange={onTitleChanged}
					/>
				</Col>
				<Col>
					<Form.Label>Task Details</Form.Label>
					<Form.Control
						placeholder="task details"
						value={details}
						onChange={onDetailsChanged}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label>Task Additional Notes</Form.Label>
					<Form.Control
						placeholder="task additional notes..."
						value={additionalNotes}
						onChange={onAdditionalNotesChanged}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label>Set Target</Form.Label>
					<Form.Control type="number" onChange={onTargetChanged} value={target} />
				</Col>
				<Col>
					<Form.Label>Set Achieved</Form.Label>
					<Form.Control type="number" onChange={onAchievedChanged} value={achieved} />
				</Col>
				<Col>
					<Button onClick={onProgressUpdated}>Set Progress</Button>
				</Col>
			</Row>
			<Row>
				<Row>
					<Col>
						<ProgressBar now={progress} label={`${progress}%`} animated />
					</Col>
				</Row>
				<Col>
					<Form.Label>mark completed</Form.Label>
					<Form.Check type="checkbox" onChange={onTaskCheck} checked={isCompleted} />
				</Col>
				<Col>
					<Button onClick={onSaveTaskClicked}>Save Task</Button>
				</Col>
			</Row>
		</Container>
	);
};
