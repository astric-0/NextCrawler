import { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Info } from "@/components";

const About = _ => {
    return (
        <Container className="p-2">
            <Card bg="primary" text="light" className="shadow">
                <Card.Header className="h3">Project</Card.Header>
                <Card.Body align='justify'>
                    This is a client side implementation of a <span className='fw-bold'>Web Crawler</span> being used as a data collection tool, 
                    the app is using <span className='fw-bold'>Next.js</span> as a base framework and some required libraries to function.
                    <br/><br />
                    App Provides simple UI for required Inputs and Outputs.<span className='fw-bold'> The basic purpose of the App is to provide 
                    reliable structure to perform crawling and collecting targeted data through web</span>. The app does that by providing modules to target
                    different types of content. Also, A user can easily implement their own modules as project is open source and fundamentally structured to extend.
                </Card.Body>
            </Card>
            
            <Info.KeywordCard />
        </Container>
    );
}

export default About;