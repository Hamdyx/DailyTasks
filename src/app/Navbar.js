import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
	return (
		<Nav defaultActiveKey="/" className="flex-column">
			<Link to="/">Home</Link>
			<Link to="/link2">Link2</Link>
			<Link to="/link3">Link3</Link>
			<Link to="/link4">Link4</Link>
		</Nav>
	);
};
