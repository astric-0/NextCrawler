import { Container, Col, Row } from "react-bootstrap";
import { Info } from "@/components";

const About = _ => {
    return (
        <Container className="p-2">  
            <Row>
                <Col>
                    <Info.ProjectCard />
                </Col>
                <Col md={5}>
                    <Info.RequirementsList />
                </Col>
            </Row>          
            <Info.KeywordCard />
        </Container>
    );
}

export default About;