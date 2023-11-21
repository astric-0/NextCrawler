import React from "react";
import Image from "next/image";
import { Container, Card, Col } from "react-bootstrap";

const ProjectCard = ({ src }) => {
	return (
		<Container className="d-flex justify-content-around">
			<Col xs={4}>
				<Image src={src} width={350} height={350} alt="Project" />
			</Col>
			<Col>
				<Card.Header className="h3 text-primary bg-transparent fw-bold">
					Project
				</Card.Header>
				<Card.Body className="mt-4" align="justify">
					This is a client side implementation of a{" "}
					<span className="fw-bold">Web Crawler</span> being used as a
					data collection tool, the app is using{" "}
					<span className="fw-bold">Next.js</span> as a base framework
					and some required libraries to function.
					<br />
					<br />
					App Provides simple UI for required Inputs and Outputs.
					<span className="fw-bold">
						{" "}
						The basic purpose of the App is to provide reliable
						structure to perform crawling and collecting targeted
						data through web
					</span>
					. The app does that by providing modules to target different
					types of content. Also, A user can easily implement their
					own modules as project is open source and fundamentally
					structured to extend.
				</Card.Body>
			</Col>
		</Container>
	);
};

export default ProjectCard;
