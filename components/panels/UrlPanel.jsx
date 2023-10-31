import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container, ListGroup, Badge, Row, Col, Button, } from 'react-bootstrap';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn, PageNumberList } from '@/components';

const LogItem = ({ index, url, info }) => {
    const { depth, batch, urlId, status, time, failed } = info;
    return (
        <ListGroup.Item
            as="li"
            variant={failed ? 'danger' : 'success'}
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div>
                    <span className='text-dark'>[{index}]</span>&nbsp;
                    <span className='fw-bold'>[{urlId}]</span>&nbsp;
                    <span className='text-break'>{url}</span>
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

const UrlPanel = _ => {
    const { urlLog, crawler } = useContext(AppContext);
    const crawlerBatch = (crawler.variants?.batch ?? 1) - 1;

    const [expand, setExpand] = useState(false);
    const [currentBatch, setCurrentBatch] = useState(crawlerBatch);
    const [logList, setLogList] = useState([]);
    const ref = useRef(null);
    const [latest, setLatest] = useState(true);
    
    const makeLog = batchNo => {
        const logs = urlLog[batchNo];
        if (logs) {
            const list = logs?.map((log, index) => {
                const { url: key } = log;
                return (<LogItem key={key} index={index} url={key} info={log} />);
            });
            //setCurrentBatch(crawlerBatch);
            setLogList(list);
        }
    }
    useEffect(_ => {
        makeLog(crawlerBatch);
        setCurrentBatch(crawlerBatch);
    }, []);

    useEffect(_ => {
        if (currentBatch != crawlerBatch && latest) {            
            makeLog(crawlerBatch);
            setCurrentBatch(crawlerBatch);
        }
    }, [crawler.variants?.batch]);   
    
    const toggleLatest = _ => {
        setLatest(!latest);
        if (latest) {
            makeLog(crawlerBatch);
            setCurrentBatch(crawlerBatch);
        }
    }

    return (
        <Container className='my-4'>
            <Row className='text-success'>
                <Col>
                    <div className='d-flex align-items-start'>
                        <PanelTitle title='Url Logs' icon={faNoteSticky} />
                        <Badge className='mx-1' bg="success" pill>
                            {logList.length}
                        </Badge>
                    </div>
                </Col>
               
                <Col xs='1'>
                    <ExpandBtn onClick={_ => setExpand(!expand)} expand={expand} color='success' />
                </Col>
            </Row>
            <ListGroup as='ul' className={`shadow ${!expand ? 'log' : ''}`}>
                <ListGroup.Item className='p-0 m-0' ref={ref}></ListGroup.Item>
                {logList}
            </ListGroup>

            <PageNumberList 
                variant='success' 
                end={crawlerBatch} 
                current={currentBatch}
                refresh={_ => logList}
                setCurrent={val => { console.log(val); setCurrentBatch(val); makeLog(val); }}
            >
                <Button variant='outline-success' active={latest} onClick={toggleLatest} >Latest</Button>
            </PageNumberList>

        </Container>
    );
}

export default UrlPanel;