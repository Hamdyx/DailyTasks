import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap'
import {
	IoNotificationsSharp,
	IoMailSharp,
	IoCaretForward,
} from 'react-icons/io5'

import { useSelector } from 'react-redux'
import { selectAllTasks, selectTasksIds } from './features/tasks/tasksSlice'

import { TaskCard } from './features/tasks/TaskCard'

import './Dashboard.css'
const avatarImg = 'images/avatar.png'

export const Dashboard = () => {
	const taskStatus = useSelector((state) => state.tasks.status)
	const error = useSelector((state) => state.tasks.error)
	const allTasksIds = useSelector(selectTasksIds)
	let tasksIdsArr = allTasksIds.filter((id) => id <= 5)

	let content

	if (taskStatus === 'loading') {
		content = <div className="loader">Loading...</div>
	} else if (taskStatus === 'succeeded') {
		content = tasksIdsArr.map((taskId) => (
			<TaskCard key={taskId} taskId={taskId} />
		))
	} else if (taskStatus === 'failed') {
		content = <div>{error}</div>
	} else if (taskStatus === 'idle') {
		content = allTasksIds.map((taskId) => (
			<TaskCard key={taskId} taskId={taskId} />
		))
	}

	return (
		<Container fluid className="dashboard-container">
			<Row>
				<Col className="dashboard-left">
					<h5>Hello, Cryptojoint</h5>
					<h5>You've got</h5>
					<h5>8 tasks today</h5>
					<Form.Control
						placeholder="Search something..."
						className="dashboard-search"
					/>
					<Container className="dashboard-tasks-section">
						<h5>My tasks</h5>
						<Button className="tasks-timeframe">Recenlty</Button>
						<Button className="tasks-timeframe">Today</Button>
						<Button className="tasks-timeframe">Upcoming</Button>
						<Button className="tasks-timeframe">Later</Button>
						{content}
					</Container>
				</Col>
				<Col>
					<DashboardProfile />
					<ProjectTracker />
					<DashboardSchedule />
				</Col>
			</Row>
		</Container>
	)
}

const DashboardSchedule = () => {
	const [today, setToday] = useState('')
	const [currMonth, setCurrMonth] = useState('')

	useEffect(() => {
		let _today = new Date()
		let _month = _today.toLocaleString('default', { month: 'long' })
		setToday(_today)
		setCurrMonth(_month)
	}, [])
	return (
		<Container className="dashboard-schedule">
			<Row>
				<Col>
					<p className="dashboard-fulldate">
						{today && currMonth
							? `${currMonth} ${today.getDate()}, ${today.getFullYear()}`
							: 'today'}
					</p>
					<p className="dashboard-day">Today</p>
				</Col>
				<Col className="dashboard-addTask-col">
					<Button className="dashboard-addTask">+ add task</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<ScheduleCalendar />
				</Col>
			</Row>
		</Container>
	)
}

const ProjectTracker = () => {
	return (
		<Container className="dashboard-project-tracker">
			<Row>
				<Col>
					<p>Project time tracker</p>
					<p>You can start tracking</p>
				</Col>
				<Col className="projects-tracker-btn">
					<Button>
						<IoCaretForward />
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

const ScheduleCalendar = () => {
	const allTasks = useSelector(selectAllTasks)
	const getDays = () => {
		let daysInWeek = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		]

		let days = daysInWeek.map((d, i) => <th key={i}>{d.slice(0, 3)}</th>)

		return days
	}

	const getDates = () => {
		let datesLimit = 14
		let datesArr1 = []
		let datesArr2 = []
		for (let i = 1; i <= datesLimit / 2; i++) {
			datesArr1.push(<td key={i}>{i}</td>)
		}
		for (let i = 8; i <= datesLimit; i++) {
			datesArr2.push(<td key={i}>{i}</td>)
		}

		let content

		if (datesArr1 && datesArr2) {
			content = (
				<tbody>
					<tr>{datesArr1}</tr>
					<tr>{datesArr2}</tr>
				</tbody>
			)
		} else {
			content = (
				<tbody>
					<tr>
						{[1, 2, 3, 4, 5, 6, 7].map((i) => (
							<td key={i}>{i}</td>
						))}
					</tr>
					<tr>
						{[1, 2, 3, 4, 5, 6, 7].map((i) => (
							<td key={i}>{i}</td>
						))}
					</tr>
				</tbody>
			)
		}

		return content
	}

	const getTasks = () => {
		let tasksContent = []
		for (let i = 0; i < 3 && i < allTasks.length; i++) {
			let _task = allTasks[i]
			tasksContent.push(<TaskCard key={_task.id} taskId={_task.id} />)
		}
		return tasksContent
	}

	return (
		<Container>
			<Table>
				<thead>
					<tr>{getDays()}</tr>
				</thead>
				{getDates()}
			</Table>

			{/* <Row>
				<Col>{getTasks()}</Col>
			</Row> */}
		</Container>
	)
}

const DashboardProfile = () => {
	return (
		<Container className="dashboard-profile">
			<Row>
				<Col sm={{ span: 3 }}>
					<img src={avatarImg} alt="logo" className="avatar-pic" />
				</Col>
				<Col className="profile-info">
					<p>Cryptojoint</p>
					<p>Developer</p>
				</Col>
				<Col className="profie-icons">
					<Button className="profile-btn">
						<IoNotificationsSharp />
					</Button>
					<Button className="profile-btn">
						<IoMailSharp />
					</Button>
				</Col>
			</Row>
		</Container>
	)
}
