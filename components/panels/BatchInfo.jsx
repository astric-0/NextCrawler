import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Container, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { faLayerGroup, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn } from '@/components';

const BatchInfo = _ => {
    const { batchInfo: { batch, urls } } = useContext(AppContext);
    const [expand, setExpand] = useState(false);
    const urlsList = urls.map(url => (
        <ListGroup.Item as='li'>
            <Row>
                <Col xs="1">
                    <Link href={url} legacyBehavior>
                        <a target='_blank' rel='noopener noreferrer'>
                            <FontAwesomeIcon icon={faLink} className='text-info' />
                        </a>
                    </Link>
                </Col>
                <Col xs="11" className='text-break'>{url}</Col>
            </Row>
        </ListGroup.Item>
    ));

    return (
        <Container className='my-3'>
            <Row className='text-info'>
                <Col xs="11">
                    <div className='d-flex align-items-start'>
                        <PanelTitle title='Batch Info' icon={faLayerGroup} />
                        <Badge className='mx-1' bg="info" pill>
                            {batch}
                        </Badge>
                        <Badge className='mx-1' bg="info" pill>
                            Requests: {urls.length}
                        </Badge>
                    </div>
                </Col>
                <Col>                    
                    <ExpandBtn onClick={_ => setExpand(!expand)} expand={expand} color='info' />
                </Col>
            </Row>
            <ListGroup as='ul' className={'shadow ' + (!expand ? ' batch-list' : '')}>
                {urlsList}
            </ListGroup>
        </Container>
    );
}

export default BatchInfo;