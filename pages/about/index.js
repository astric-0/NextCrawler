import { useState, useEffect, useTransition } from "react";
import { Container, Col, Row } from "react-bootstrap";
import config from "@/config";
import { Info } from "@/components";

const About = _ => {
    const [imgUrls, setImgUrls] = useState({});
    const [isPending, setIsPending] = useState(true);

    useEffect(_ => {
        (async function(){
            try {
                const response = await fetch(config.imgListUrl);
                if (response.status == 200)
                    setImgUrls(await response.json());
            } catch (error) {
                console.error(error);
            }

            setIsPending(false);
        })();
    }, []);
    
    if(isPending) return <></>;

    return (
        <Container className="p-2">  
            <Info.ProjectCard src={config.imgUrl + '/' + imgUrls.project} />
            <Row>
                <Col>
                    <Info.KeywordCard />
                </Col>
                <Col lg={5}>
                    <Info.RequirementsList />
                </Col>
            </Row>          
        </Container>
    );
}

export default About;