import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { RiDashboardFill } from 'react-icons/ri';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import {
	AiOutlineProject,
	AiOutlinePieChart,
	AiOutlineSetting,
} from 'react-icons/ai';
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
			path === '/'
				? formatTitle('dailytasks')
				: formatTitle(path.split('/')[1]);

		[...navDom.querySelectorAll('a')].forEach((el) => {
			el.addEventListener('click', (ev) => {
				let _path = ev.target.href.split('http://localhost:3000')[1];

				document.title =
					_path === '/'
						? formatTitle('dailytasks')
						: formatTitle(_path.split('/')[1]);

				setPath(_path);
			});
		});
	});

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
				<ColorModeToggle />
			</Nav>
		</aside>
	);
};

const ColorModeToggle = () => {
	function handleModeToggle() {
		console.log('modeToggle clicked');
		console.log(this);
		console.log(this.checked);
		let darkMode = {
			mainBgColor: '#41435c',
			baseColor: '#14213d',
			subColor: '#005F73',
			subColor1: '#0A9396',
			mainTxtColor: '#fff',
		};
		let lightMode = {
			mainBgColor: '#e1e4e6',
			baseColor: '#264653',
			subColor: '#7fccf0',
			subColor1: '#2a9d8f',
			mainTxtColor: '#264653',
		};
		if (!this.checked) {
			document.documentElement.style.setProperty(
				`--mainBgColor`,
				lightMode.mainBgColor
			);
			document.documentElement.style.setProperty(
				`--mainTxtColor`,
				lightMode.mainTxtColor
			);
			document.documentElement.style.setProperty(
				`--baseColor`,
				lightMode.baseColor
			);
			document.documentElement.style.setProperty(
				`--subColor`,
				lightMode.subColor
			);
			document.documentElement.style.setProperty(
				`--subColor1`,
				lightMode.subColor1
			);
		} else {
			document.documentElement.style.setProperty(
				`--mainBgColor`,
				darkMode.mainBgColor
			);
			document.documentElement.style.setProperty(
				`--mainTxtColor`,
				darkMode.mainTxtColor
			);
			document.documentElement.style.setProperty(
				`--baseColor`,
				darkMode.baseColor
			);
			document.documentElement.style.setProperty(
				`--subColor`,
				darkMode.subColor
			);
			document.documentElement.style.setProperty(
				`--subColor1`,
				darkMode.subColor1
			);
		}
	}

	useEffect(() => {
		const toggle = document.querySelector('#toggle-checkbox');
		console.log(toggle.checked);
		toggle.addEventListener('click', handleModeToggle);
	});

	return (
		<div className="mode-wrapper">
			<label className="darkmode-toggle" htmlFor="toggle-checkbox">
				<span className="visually-hidden">Enable dark mode</span>
				<input type="checkbox" id="toggle-checkbox" />
				<span className="toggle-slider" aria-hidden="true"></span>
			</label>
		</div>
	);
};
