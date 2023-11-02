import { Container } from "react-bootstrap";
import { Info } from "@/components";

const About = _ => {
    return (
        <Container className="p-2">            
            <Info.ProjectCard />
            <Info.KeywordCard />
        </Container>
    );
}

export default About;