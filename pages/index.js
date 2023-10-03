import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { 
    SourceForm, Bozos, ActiveHostsPanel, CurrentInfoPanel, ErrorPanel, BatchInfo, UrlLogPanel
} from "@/components";
import AppContext from "@/context/AppContext";

export default function Home() {
    const { started } = useContext(AppContext);

    return (
        <>
            <Row className="justify-content-around">
                {
                    !started 
                    ? 
                    <Col xs md="4">
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
        </>
    );
}