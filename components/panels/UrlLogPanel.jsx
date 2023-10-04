import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container, ListGroup, Badge, Row, Col, } from 'react-bootstrap';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn, PageNumberList } from '@/components';

const LogItem = ({ url, info }) => {
    const { depth, batch, urlId, status, time, failed } = info;
    return (
        <ListGroup.Item
            as="li"
            variant={failed ? 'danger' : 'success'}
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div>
                    <span className='fw-bold text-break'>[{urlId}]</span>&nbsp;{url}
                </div>
                <span className={`${failed == true ? 'text-danger' : 'text-success'}`}>{status}</span>
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
    const [expand, setExpand] = useState(false);
    const ref = useRef(null);

    //let logList = [], i = 0;
    // for (let url in urlLog)
    //     logList.push(<LogItem key={i++} url={url} info={urlLog[url]} />);

    const urlLogKeys = Object.keys(urlLog);
    const { length } = urlLogKeys;
    const end = length - 10;
    let logList = [], i, url;
    for (i = length - 1; i > 0 && i > end; i--) {
        url = urlLogKeys[i];
        logList.push(<LogItem key={i} url={url} info={urlLog[url]} />);
    }

    useEffect(_ => {
        if (i > 0) {
            ref.current?.scrollIntoView({
                behaviour: 'smooth',
                block: 'end'
            });
        }
    }, [urlLog]);

    return (
        <Container className='my-4'>
            <Row className='text-success'>
                <Col xs="4">
                    <div className='d-flex align-items-start'>
                        <PanelTitle title='Url Logs' icon={faNoteSticky} />
                        <Badge className='mx-1' bg="success" pill>
                            {Object.keys(urlLog).length}
                        </Badge>
                    </div>
                </Col>
                <Col xs='7'>
                    <PageNumberList variant='success' start={0} end={length} steps={10} current={0} max={10} />
                </Col>
                <Col>
                    <ExpandBtn onClick={_ => setExpand(!expand)} expand={expand} color='success' />
                </Col>
            </Row>
            <ListGroup as='ul' className={`shadow ${!expand ? 'log' : ''}`}>
                <ListGroup.Item className='p-0 m-0' ref={ref}></ListGroup.Item>
                {logList}
            </ListGroup>
        </Container>
    );
}

export default UrlLogPanel;