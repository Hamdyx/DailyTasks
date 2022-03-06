import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomFloatingLabel from '../../components/inputs/CustomFloatingLabel';

import { taskUpdated, selectTaskById } from './tasksSlice';
import { IoReturnUpBack } from 'react-icons/io5';

import {
	Col,
	Container,
	Form,
	Row,
	Button,
	ProgressBar,
} from 'react-bootstrap';

export const EditTaskForm = ({ match }) => {
	const { taskId } = match.params;

	const task = useSelector((state) => selectTaskById(state, taskId));

	if (!task) {
		console.log(match);
		console.log(taskId);

		console.log('task not found in EditTaskForm');
	}

	const [title, setTitle] = useState(task.title);

	const [details, setDetails] = useState(task.details);
	const [startOn, setStartOn] = useState(task.startOn);
	const [dueOn, setDueOn] = useState(task.dueOn);
	const [category, setCategory] = useState(task.category);
	const [additionalNotes, setAdditionalNotes] = useState(task.additionalNotes);
	const [isCompleted, setIsCompleted] = useState(task.isCompleted);
	const [target, setTarget] = useState(100);
	const [achieved, setAchieved] = useState(task.progress);
	const [progress, setProgress] = useState(task.progress);

	const dispatch = useDispatch();

	const onTitleChanged = (e) => setTitle(e.target.value);
	const onDetailsChanged = (e) => setDetails(e.target.value);
	const onStartOnChanged = (e) => setStartOn(e.target.value);
	const onDueOnChanged = (e) => setDueOn(e.target.value);
	const onAdditionalNotesChanged = (e) => setAdditionalNotes(e.target.value);

	const onTaskCheck = (ev) => {
		let _progress = ev.target.checked ? 100 : 0;
		setIsCompleted(ev.target.checked);
		setProgress(_progress);
	};

	const onTargetChanged = (ev) => {
		setTarget(ev.target.value);
	};

	const onAchievedChanged = (ev) => {
		setAchieved(ev.target.value);
	};
	const onCategoryChanged = (ev) => {
		setCategory(ev.target.value);
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
		if (title && details) {
			dispatch(
				taskUpdated({
					id: taskId,
					title,
					details,
					startOn,
					dueOn,
					category,
					additionalNotes,
					isCompleted,
					progress,
				})
			);
		}
	};

	let testCat = ['work', 'personal', 'healthcare', 'read', 'games'];
	let categoryContent = testCat.map((el, i) => (
		<Button
			key={i}
			value={el}
			className={`category-btn ${el === category ? 'active' : ''}`}
			onClick={onCategoryChanged}
		>
			{el}
		</Button>
	));

	return (
		<Container>
			<Row>
				<Col className="editTask-returnIcon">
					<Link to="/tasks">
						<IoReturnUpBack />
					</Link>
				</Col>
				<Col>
					<h4>Edit Task</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<CustomFloatingLabel
						type={'text'}
						label={'Title'}
						value={title}
						changeFunc={onTitleChanged}
					/>
					<CustomFloatingLabel
						type={'text'}
						label={'Details'}
						value={details}
						changeFunc={onDetailsChanged}
					/>
				</Col>
				<Col>
					<p>Category</p>
					{categoryContent}
				</Col>
			</Row>
			<Row>
				<Col>
					<CustomFloatingLabel
						type={'datetime-local'}
						label={'Start-On'}
						value={startOn}
						changeFunc={onStartOnChanged}
					/>
					<CustomFloatingLabel
						type={'text'}
						label={'Comments'}
						value={additionalNotes}
						changeFunc={onAdditionalNotesChanged}
					/>
				</Col>
				<Col>
					<CustomFloatingLabel
						type={'datetime-local'}
						label={'Due-On'}
						value={dueOn}
						changeFunc={onDueOnChanged}
					/>
				</Col>
			</Row>
			<Row>
				<Col></Col>
			</Row>
			<Row>
				<Col>
					<CustomFloatingLabel
						type={'number'}
						label={'Target'}
						value={target}
						changeFunc={onTargetChanged}
					/>
				</Col>
				<Col>
					<CustomFloatingLabel
						type={'number'}
						label={'Achieved'}
						value={achieved}
						changeFunc={onAchievedChanged}
					/>
				</Col>
				<Col>
					<Button onClick={onProgressUpdated} className="customBg-btn">
						Set Progress
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<ProgressBar now={progress} label={`${progress}%`} animated />
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Label>mark completed</Form.Label>
					<Form.Check
						type="checkbox"
						onChange={onTaskCheck}
						checked={isCompleted}
					/>
				</Col>
				<Col>
					<Link
						to={`/tasks`}
						onClick={onSaveTaskClicked}
						className="customBg-link"
					>
						Save Task
					</Link>
				</Col>
			</Row>
		</Container>
	);
};
