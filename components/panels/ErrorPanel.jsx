import React, { useContext, useState } from 'react';
import { Container, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn } from '@/components';

const ErrorItem = ({ error: { message, url, urlId, batch }, index }) => (    
    <ListGroup.Item
        as="li"
        variant='danger'
        className="d-flex justify-content-between align-items-start"
        title={url}
    >
        <div className="ms-2 me-auto">
            <div>
                <span className='me-1'>[{index}]</span>
                <span className='fw-bold'>[{urlId}] : {message}</span>
            </div>
        </div>
        <Badge bg="info" pill>
            Batch: {batch}
        </Badge>
    </ListGroup.Item>
);

const ErrorPanel = _ => {
    const { crawlerErrorList } = useContext(AppContext);
    const [expand, setExpand] = useState(false);

    if (!crawlerErrorList || crawlerErrorList.length == 0) return;

    const errorList = [];
    crawlerErrorList.reduceRight((_, error, index) => {
        errorList.push(<ErrorItem key={index} index={index} error={error} />);
    }, null);

    return (
        <Container className='my-4'>
            <Row>
                <Col xs="11">
                    <div className='d-flex align-items-start text-danger'>
                        <PanelTitle title="Error Log" icon={faBomb} />
                        <Badge className='mx-1' bg="danger" pill>
                            {errorList.length}
                        </Badge>
                    </div>
                </Col>
                <Col xs='1'>
                    <ExpandBtn expand={expand} onClick={_ => setExpand(!expand)} color='danger' />
                </Col>
            </Row>
            <ListGroup as='ul' className={`shadow ${!expand ? 'log' : ''}`}>
                {errorList}
            </ListGroup>
        </Container>
    );
}

export default ErrorPanel;