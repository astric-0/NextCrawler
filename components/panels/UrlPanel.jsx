import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container, ListGroup, Badge, Row, Col, Button, } from 'react-bootstrap';
import { faNoteSticky, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@/context/AppContext';
import { PanelTitle, ExpandBtn, PageNumberList } from '@/components';

const LogItem = ({ index, log }) => {
    const { urlId, status, time, failed, url } = log;
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
            
            <Badge bg="dark" className='mx-1'>
                {time}
            </Badge>
        </ListGroup.Item>
    );
}

const UrlPanel = _ => {
    const { urlLog, crawler } = useContext(AppContext);
    let crawlerBatch = (crawler.variants?.batch ?? 1) - 1;

    const [expand, setExpand] = useState(false);
    const [currentBatch, setCurrentBatch] = useState(crawlerBatch);
    const [logList, setLogList] = useState([]);
    const ref = useRef(null);
    const [latest, setLatest] = useState(true);
    
    const makeLog = batchNo => {
        const logs = urlLog[batchNo];
        if (logs) {
            const list = logs?.map((log, index) => <LogItem key={log.url} index={index} log={log} />);        
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
        crawlerBatch = (crawler.variants?.batch ?? 1) - 1;
    }

    const checkRefresh = _ => {
        return latest || crawlerBatch <= 10;
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
                        <Badge className='mx-1' bg="info" pill>
                            Batch: {currentBatch ?? 'Null'}
                        </Badge>
                        <Badge className='mx-1' bg="primary" pill>
                            Depth: {urlLog[currentBatch]?.[0]?.depth ?? -1 }
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
                refresh={_ => crawlerBatch}
                setCurrent={val => { setLatest(false); setCurrentBatch(val); makeLog(val); }}
                checkRefresh={checkRefresh}
            >
                <div className='d-flex align-items-start'>
                    <Button variant='outline-success' active={latest} onClick={toggleLatest} title='Click to Lock/Unlock On Latest' >
                        <FontAwesomeIcon icon={latest ? faLock : faLockOpen} />
                    </Button>
                    <Badge className='mx-1' bg="success" title='Latest Batch' pill>
                        {crawlerBatch}
                    </Badge>
                </div>
            </PageNumberList>

        </Container>
    );
}

export default UrlPanel;