import React, { useContext } from 'react';
import { Container, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn } from '@/components';

const LogItem = ({ url, info }) => {
    const { depth, batch, urlId, status, time, failed } = info;
    return (
        <ListGroup.Item
            as="li"
            variant={ failed ? 'danger' : 'success' }
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div>
                    <span className='fw-bold text-break'>[{urlId}]</span>&nbsp;{url}
                </div>
                <span className={`${ failed==true ? 'text-danger' : 'text-success' }`}>{status}</span>
            </div>
            <Badge bg="primary" className='mx-1'>
                Depth: {depth}
            </Badge>
            <Badge bg="dark" className='mx-1'>
                Batch: {batch}
            </Badge>
            <Badge bg="dark" className='mx-1'>
                {time}
            </Badge>
        </ListGroup.Item>
    );
}

const UrlLogPanel = _ => {
    const { urlLog } = useContext(AppContext);
    const expand = false;

    const logList = [];
    let i = 0;
    for (let url in urlLog) {
        logList.push(<LogItem key={i} url={url} info={urlLog[url]} />);
        i++;
    }

    return (
        <Container>
            <Row className='text-success'>
                <Col xs="11">
                    <div className='d-flex align-items-start'>
                        <PanelTitle title='Url Logs' icon={faNoteSticky} />
                        <Badge className='mx-1' bg="success" pill>
                            {Object.keys(urlLog).length}
                        </Badge>
                    </div>
                </Col>
                <Col>
                    <ExpandBtn onClick={_ => (!expand)} expand={expand} color='info' />
                </Col>
            </Row>
            <ListGroup>
                {logList}
            </ListGroup>
        </Container>
    );
}

export default UrlLogPanel;