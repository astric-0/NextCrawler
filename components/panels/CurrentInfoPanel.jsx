import React, { useContext } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import AppContext from '@/context/AppContext';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { PanelTitle } from '@/components';
const keyNames = [
    { key: 'depth', name: 'Current Depth', variant: 'primary' },
    { key: 'remaining', name: 'Remaining URLs in Current Depth', variant: 'primary' },
    { key: 'collected', name: 'URLs Collected for Next Depth', variant: 'success' },
    { key: 'processed', name: 'Total Processed URLs', variant: 'dark' },
];

const CurrentInfoPanel = _ => {
    const { currentInfo } = useContext(AppContext);

    const info = keyNames.map(item => {
        const { key, name, variant } = item;
        return (
            <Col key={ key } className='my-2' md="12" lg="3">
                <Container className='rounded'>
                    <Button className='shadow w-100' variant={ variant } size="lg">{currentInfo[key]}</Button>
                    <label className={ 'text-' + variant }>{ name }</label>
                </Container>
            </Col>
        )
    });

    return (
        <Container className='my-3 text-primary'>
            <PanelTitle title="Current Info" icon={ faCircleInfo }/>       
            <Row className='mt-3'>
                { info }
            </Row>
        </Container>
    );
}

export default CurrentInfoPanel;