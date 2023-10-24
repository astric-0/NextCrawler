import React, { useContext } from 'react';
import { Form, ButtonGroup, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from '@/context/AppContext';
import { getContentModulePacks } from '@/lib/content-modules';

const SourceCMChoice = ({ label, xs }) => {
    const { contentModulePack, setContentModulePack } = useContext(AppContext);

    const moduleBtnList = getContentModulePacks()
        .map((modulePack, index) => {
            const { name, icon } = modulePack;
            return (
                <Button
                    key={index}
                    variant="outline-primary" 
                    onClick={_ => setContentModulePack(modulePack)} 
                    active={contentModulePack.name == name}
                >
                    <FontAwesomeIcon icon={icon} />{' ' + name}
                </Button>
            );
        });

    return (
        <Form.Group>
            <Form.Label as={Col} xs={xs} className="mt-3">{ label }</Form.Label>
            <ButtonGroup className='w-100'>
                {moduleBtnList}
            </ButtonGroup>
        </Form.Group>
    );
}

SourceCMChoice.defaultProps = {
    label: 'Choose Content Module*',
    xs: 12,
}

export default SourceCMChoice;