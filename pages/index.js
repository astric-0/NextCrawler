import { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { SourceForm, Bozos, ActiveHostsPanel, CurrentInfoPanel, BatchInfo } from "@/components";
import AppContext from "@/context/AppContext";
import { weaverStates } from "@/lib/services";

const Home = _ => {
    const { crawler } = useContext(AppContext);    
    return (
        <Row className="justify-content-around">
            {
                crawler.getState() == weaverStates.inactive
                ? 
                <Col xs md="7">
                    <SourceForm />
                    <Bozos />
                </Col>
                :
                <Col>
                    <CurrentInfoPanel />
                    <Row>
                        <Col md="12" lg="6">
                            <ActiveHostsPanel />
                        </Col>
                        <Col  md="12" lg="6">
                            <BatchInfo />
                        </Col>
                    </Row>                                                
                </Col>
            }
        </Row>    
    );
}

export default Home;