import React, { useContext } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { PanelTitle } from '@/components';

const ActiveHostsPanel = _ => {
    const { activeHosts } = useContext(AppContext);    

    const list = Object.keys(activeHosts).map(hostname => (
        <ListGroup.Item
            key={hostname}
            as='li'
            className='d-flex justify-content-between align-items-start'
        >
            <div className="ms-2 me-auto fw-bold">
                {hostname}
            </div>
            <Badge bg="success">
                {activeHosts[hostname]}
            </Badge>                
        </ListGroup.Item>
    ));

    return (
        <Container className='my-3'>
            <PanelTitle title="Active Hosts" icon={faSitemap} />
            <ListGroup as='ol' numbered className='shadow'>
                {list}
            </ListGroup>
        </Container>
    );
}

export default ActiveHostsPanel;