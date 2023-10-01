import { Row, Col } from "react-bootstrap";
import { SourceForm, Bozos } from "@/components";

export default function Home() {
    return (
        <>
            <Row className="justify-content-around">
                <Col xs md="4">
                    <SourceForm />
                    <Bozos />
                </Col>
            </Row>
        </>
    );
}