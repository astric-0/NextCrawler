import { Container, Col, Row } from "react-bootstrap";
import { Info } from "@/components";

const About = _ => {
    return (
        <Container className="p-2">  
            <Info.ProjectCard />
            <Row>
                <Col>
                    <Info.KeywordCard />
                </Col>
                <Col md={5}>
                    <Info.RequirementsList />
                </Col>
            </Row>          
        </Container>
    );
}

export default About;