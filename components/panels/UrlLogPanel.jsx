import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container, ListGroup, Badge, Row, Col, } from 'react-bootstrap';
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

const UrlLogPanel = _ => {
    const { urlLog } = useContext(AppContext);
    const [expand, setExpand] = useState(false);
    const [urlLogKeys, setUrlLogKeys] = useState(Object.keys(urlLog) ?? []);
    const [current, setCurrent] = useState(~~(urlLogKeys.length - 1 / 10));    
    const ref = useRef(null);
    const { length } = urlLogKeys;

    const start = length - 1;
    const end = length - 10;
    let logList = [], i, url;
    for (let i = start; i > 0 && i > end; i--) {
        url = urlLogKeys[i];
        logList.push(<LogItem key={i} index={i} url={url} info={urlLog[url]} />);
    }

    useEffect(_ => {
        setCurrent(~~(length/10));        
    }, [urlLogKeys]);

    useEffect(_ => {
        if (i > 0) {
            ref.current?.scrollIntoView({
                behaviour: 'smooth',
                block: 'end'
            });
        }
        const newKeys = Object.keys(urlLog);
        if (newKeys.length != urlLogKeys.length)
            setUrlLogKeys(newKeys);
    }, [urlLog]);

    return (
        <Container className='my-4'>
            <Row className='text-success'>
                <Col>
                    <div className='d-flex align-items-start'>
                        <PanelTitle title='Url Logs' icon={faNoteSticky} />
                        <Badge className='mx-1' bg="success" pill>
                            {length}
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
                start={0} 
                end={length} 
                steps={10} 
                max={10}
                current={current} 
                setCurrent={setCurrent} 
            />
        </Container>
    );
}

export default UrlLogPanel;