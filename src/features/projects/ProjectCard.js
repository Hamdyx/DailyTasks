import React from 'react';
import { useSelector } from 'react-redux';

import { selectProjectById } from './projectsSlice';

import { Container, Row, Col } from 'react-bootstrap';

import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ProjectCard = ({ projectId }) => {
	const project = useSelector((state) => selectProjectById(state, projectId));

	let content;
	if (project) {
		content = (
			<Container className="category-card">
				<Row>
					<Col md={9}>
						<p>{project.title}</p>
					</Col>
					<Col className="task-edit-icon">
						<Link to={`/editProject/${project.id}`}>
							<FaEdit />
						</Link>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>
							{project.startTime} - {project.endTime}
						</p>
					</Col>
				</Row>
			</Container>
		);
	} else {
		content = <div>Loading</div>;
	}
	return <Col md={4}>{content}</Col>;
};
