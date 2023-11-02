import { useState } from "react";
import { Container, Card } from "react-bootstrap";

const KeyWords = _ => {
    const keywords = {
        webCrawler: {
            title: 'Web Crawler',
            details: 'A web crawler, also known as a web spider, web robot, or web scutter, is a program or automated script that systematically navigates the World Wide Web, visiting websites and collecting data from web pages. Web crawlers are commonly used for various purposes, including search engine indexing, web scraping, data mining, and website monitoring.',
            list: [
                {
                    listTitle: 'Purpose',
                    keyPoints: []
                }
            ]
        }
    }
    const [currentKeyword, setCurrentKeyword] = useState();
}

const About = _ => {
    return (
        <Container className="p-2">
            <Card bg="primary" text="light" className="shadow">
                <Card.Header className="h3">Project</Card.Header>
                <Card.Body>
                    This is a client side implementation of a <span class='fw-bold'>Web Crawler</span> being used as a data collection tool, 
                    the app is using <span class='fw-bold'>Next.js</span> as a base framework and some required libraries to function.
                    <br/>
                    App Provides simple UI for required Inputs and Outputs.<span class='fw-bold'> The basic purpose of the App is to provide 
                    reliable structure to perform crawling and collecting targeted data through web</span>. The app does that by providing modules to target
                    different types of content. Also, A user can easily implement their own modules as project is open source and fundamentally structured to extend.
                </Card.Body>
            </Card>
        </Container>
    );
}

export default About;