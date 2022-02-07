import React, { useEffect, useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useRouter } from 'next/router';

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

const NavItem = ({ title, icon, path }) => {
	/* const [path, setPath] = useState(
		window.location.href.split('http://localhost:3000')[1]
	); */
	/* let _path = window.location.href.split('http://localhost:3000')[1]; */

	/* useEffect(() => {
		_path = window.location.href.split('http://localhost:3000')[1];
		setPath(_path);
	}, [window.location.href]); */

	// console.log('NavItem');
	// console.log(path);
	let _link = '/';
	if (title !== 'dashboard') {
		// console.log(`NavItem title: ${title}`);
		_link = `/${title}`;
	}
	return (
		<Link to={_link} className={_link === path ? 'active' : ''}>
			{icon}
			{title}
		</Link>
	);
};

export const Navbar = () => {
	const [path, setPath] = useState(
		window.location.href.split('http://localhost:3000')[1]
	);
	const routes = [
		'dashboard',
		'calendar',
		'tasks',
		'projects',
		'activity',
		'analytics',
		'settings',
	];
	const icons = [
		<RiDashboardFill className="nav-icon" />,
		<IoCalendarOutline className="nav-icon" />,
		<FaTasks className="nav-icon" />,
		<AiOutlineProject className="nav-icon" />,
		<FiActivity className="nav-icon" />,
		<AiOutlinePieChart className="nav-icon" />,
		<AiOutlineSetting className="nav-icon" />,
	];
	/* let path = window.location.href.split('http://localhost:3000')[1]; */
	let navItems = routes.map((el, i) => (
		<NavItem key={i} title={el} icon={icons[i]} path={path} />
	));
	useEffect(() => {
		let navDom = document.querySelector('.nav-section');
		/* navDom.firstChild.classList.add('active'); */
		navDom.childNodes.forEach((el) => {
			el.addEventListener('click', (ev) => {
				/* path = window.location.href.split('http://localhost:3000')[1]; */
				/* let navList = Array.from(navDom.childNodes);
				let prevActive = navList.filter((n) => n.classList[0] === 'active');
				prevActive[0].classList.remove('active');
				ev.currentTarget.classList.add('active'); */
				// console.log('navDom click ev.target');
				// console.log(ev.target.to);
				// console.log(ev.target.href);
				let _path = ev.target.href.split('http://localhost:3000')[1];
				// console.log('_path');
				// console.log(_path);
				setPath(_path);
			});
		});
	}, []);

	const updateNavItems = (path) => {
		// console.log('updateNavItems');
		// console.log(path);
		navItems = routes.map((el, i) => (
			<NavItem key={i} title={el} icon={icons[i]} path={path} />
		));
	};

	useEffect(() => {
		updateNavItems(path);
	}, [path]);

	return (
		<aside className="side-navbar">
			<Nav defaultActiveKey="/" className="flex-column nav-section">
				{navItems}
			</Nav>
		</aside>
	);
};
