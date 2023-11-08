import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import config from "@/config";
import { Info, Info2 } from "@/components";

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
            <Info2.ProjectCard src={config.imgUrl + '/' + imgUrls.project} />
            <Info2.KeywordCard />
            <Info.RequirementsList />
            <Row>
                <Col>
                </Col>
                <Col lg={5}>
                </Col>
            </Row>          
        </Container>
    );
}

export default About;