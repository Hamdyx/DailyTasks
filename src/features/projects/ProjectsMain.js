import React, { useEffect, useState } from 'react';
import { fetchProjects, selectProjectIds } from './projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

import { AddProjectForm } from './AddProjectForm';
import { ProjectCard } from './ProjectCard';

import projectArt from '../../projects-art.svg';
import webDesign from '../../web-design-art.png';
import apiDesign from '../../api-design-art.svg';
import mobileDesign from '../../mobile-app-art.svg';
import './ProjectsMain.css';

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 1,
		}}
	/>
);

export const ProjectsMain = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			let res = await dispatch(fetchProjects());
			return res;
		};
		fetchData();
		/* const testDate = new Date().toUTCString().split(' ');
		setToday(`${testDate[1]} ${testDate[2]} ${testDate[3]}`); */
	}, []);

	const projectsIds = useSelector(selectProjectIds);

	let content;

	if (projectsIds) {
		content = projectsIds.map((id) => <ProjectCard key={id} projectId={id} />);
	}

	return (
		<Container fluid>
			<Row>
				<Col className="projects-header">
					<AddProjectForm />
				</Col>
				<Col>
					<Image src={projectArt} alt="project art" width={350} height={250} />
				</Col>
			</Row>
			<Row className="categories-row">
				<Col>
					<CategoryCard imgSrc={webDesign} />
				</Col>
				<Col>
					<CategoryCard imgSrc={apiDesign} />
				</Col>
				<Col>
					<CategoryCard imgSrc={mobileDesign} />
				</Col>
			</Row>
			<Row>
				<Col className="text-left" sm={{ span: 1 }}>
					<h6>Projects</h6>
				</Col>
				<Col>
					<span>
						<ColoredLine color="#124861" />
					</span>
				</Col>
				<Col className="text-right" sm={{ span: 3 }}>
					<Button className="projects-btn active">ongoing</Button>
					<Button className="projects-btn">pending</Button>
				</Col>
			</Row>
			<Row className="projects-row">{content}</Row>
		</Container>
	);
};

const CategoryCard = ({ imgSrc }) => {
	return (
		<Container className="category-card">
			<Row>
				<Col sm={{ span: 4 }}>
					<Image src={imgSrc} alt="project art" width={50} height={50} />
				</Col>
				<Col className="text-left">
					<h5>Category Title</h5>
					<p>22 Task</p>
				</Col>
			</Row>
		</Container>
	);
};
