import React from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';

const PanelBar = _ => {
    return (
        <Nav variant='tabs' defaultActiveKey={'/'}>
            <Nav.Item>
                <Link className='nav-link' href='/'>Home</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className='nav-link' href='/logs/urls'>Url Logs</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className='nav-link' href='/logs/errors'>Error Logs</Link>
            </Nav.Item>
        </Nav>
    );
}

export default PanelBar;