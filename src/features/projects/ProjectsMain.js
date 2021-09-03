import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

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
	return (
		<Container fluid>
			<Row>
				<Col className="projects-header">
					<section className="header-text">
						<h5>Hello %USERNAME%</h5>
						<p>You can track all of your projects here</p>
					</section>
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
						<ColoredLine color="#000000" />
					</span>
				</Col>
				<Col className="text-right" sm={{ span: 3 }}>
					<Button className="projects-btn active">ongoing</Button>
					<Button className="projects-btn">pending</Button>
				</Col>
			</Row>
			<Row className="projects-row">
				<Col>
					<ProjectCard />
				</Col>
				<Col>
					<ProjectCard />
				</Col>
				<Col>
					<ProjectCard />
				</Col>
			</Row>
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

const ProjectCard = () => {
	return (
		<Container className="category-card">
			<Row>
				<Col>Project Title</Col>
			</Row>
			<Row>
				<Col>
					<p>10.00 AM - 4.30 PM</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p>Progress</p>
				</Col>
			</Row>
		</Container>
	);
};
