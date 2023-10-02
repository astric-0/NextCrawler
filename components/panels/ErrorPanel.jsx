import React, { useContext, useState } from 'react';
import { Container, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn } from '@/components';

const ErrorPanel = _ => {
    const { crawlerErrorList } = useContext(AppContext);
    const [expand, setExpand] = useState(false);

    if (!crawlerErrorList || crawlerErrorList.length == 0) return;

    const errorList = [];
    crawlerErrorList.reduceRight((_, error, index) => {
        const { message, url, urlId, batch } = error;
        errorList.push(
            <ListGroup.Item
                key={index}
                as="li"
                variant='danger'
                className="d-flex justify-content-between align-items-start"
                title={url}
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <span className='fw-bold'>{urlId}</span>: {message}
                    </div>
                </div>
                <Badge bg="primary" pill>
                    batch: {batch}
                </Badge>
            </ListGroup.Item>
        );
    }, null);

    return (
        <Container className='my-4'>
            <Row>
                <Col xs="11">
                    <div className='d-flex align-items-start text-danger'>
                        <PanelTitle title="Error List" icon={faBomb} />
                        <Badge className='mx-1' bg="danger" pill>
                            {errorList.length}
                        </Badge>
                    </div>
                </Col>
                <Col xs='1'>
                    <ExpandBtn expand={expand} onClick={_ => setExpand(!expand)} color='danger' />
                </Col>
            </Row>
            <ListGroup variant='flush' className={`shadow ${ !expand ? 'error-list' : '' }`}>
                {errorList}
            </ListGroup>
        </Container>
    );
}

export default ErrorPanel;