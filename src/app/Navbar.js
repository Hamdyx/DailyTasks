import React, { useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { RiDashboardFill } from 'react-icons/ri';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import {
	AiOutlineProject,
	AiOutlinePieChart,
	AiOutlineSetting,
	AiOutlinePlus,
} from 'react-icons/ai';
import { FiActivity } from 'react-icons/fi';

import './Navbar.css';

export const Navbar = () => {
	useEffect(() => {
		let navDom = document.querySelector('.nav-section');
		navDom.firstChild.classList.add('active');
		navDom.childNodes.forEach((el) => {
			el.addEventListener('click', (ev) => {
				let navList = Array.from(navDom.childNodes);
				let prevActive = navList.filter((n) => n.classList[0] === 'active');
				prevActive[0].classList.remove('active');
				ev.currentTarget.classList.add('active');
			});
		});
	}, []);

	return (
		<aside className="side-navbar">
			<Nav defaultActiveKey="/" className="flex-column nav-section">
				<Link to="/">
					<RiDashboardFill className="nav-icon" />
					Dashboard
				</Link>
				<Link to="/calendar">
					<IoCalendarOutline className="nav-icon" />
					Calendar
				</Link>
				<Link to="/tasks">
					<FaTasks className="nav-icon" />
					Tasks
				</Link>
				<Link to="/projects">
					<AiOutlineProject className="nav-icon" />
					Projects
				</Link>
				<Link to="/activity">
					<FiActivity className="nav-icon" />
					Activity
				</Link>
				<Link to="/analytics">
					<AiOutlinePieChart className="nav-icon" />
					Analytics
				</Link>
				<Link to="/settings">
					<AiOutlineSetting className="nav-icon" />
					Settings
				</Link>
			</Nav>
			<Button className="nav-add-btn">
				<AiOutlinePlus className="nav-icon" />
			</Button>
		</aside>
	);
};
