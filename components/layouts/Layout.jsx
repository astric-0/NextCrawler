import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <Container fluid className='layout-container'>
            { children }
        </Container>
    );
}

export default Layout;