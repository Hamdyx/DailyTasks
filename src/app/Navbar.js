import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useRouter } from 'next/router';

import { RiDashboardFill } from 'react-icons/ri';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { AiOutlineProject, AiOutlinePieChart, AiOutlineSetting } from 'react-icons/ai';
import { FiActivity } from 'react-icons/fi';

import './Navbar.css';

const NavItem = ({ title, icon, path }) => {
	let _link = '/';
	if (title !== 'dashboard') {
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

	let navItems = routes.map((el, i) => (
		<NavItem key={i} title={el} icon={icons[i]} path={path} />
	));

	const formatTitle = (t) => {
		return `${t.slice(0, 1)[0].toUpperCase()}${t.slice(1)}`;
	};
	useEffect(() => {
		let navDom = document.querySelector('.nav-section');

		document.title =
			path === '/' ? formatTitle('dailytasks') : formatTitle(path.split('/')[1]);
		navDom.childNodes.forEach((el) => {
			el.addEventListener('click', (ev) => {
				let _path = ev.target.href.split('http://localhost:3000')[1];

				document.title =
					_path === '/' ? formatTitle('dailytasks') : formatTitle(_path.split('/')[1]);
				setPath(_path);
			});
		});
	}, []);

	const updateNavItems = (path) => {
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
