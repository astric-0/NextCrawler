import React from "react";
import { Row, Col } from "react-bootstrap";
import { SourceForm } from "@/components";

const InputBox = () => {
	return (
		<Row>
			<Col xs md="4">
				<SourceForm />
			</Col>
		</Row>
	);
};

export default InputBox;
