import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
    return (
        <Container fluid className='vh-100'>
            { children }
        </Container>
    );
}

export default Layout;