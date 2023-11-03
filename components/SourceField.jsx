import React from 'react';
import { InputGroup, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SourceField = ({ type, xs, label, onChange, value, icon }) => (
    <Form.Group as={Col} xs={xs} className="mt-3">
        <Form.Label>{ label }*</Form.Label>
        <InputGroup>
            { 
                icon && 
                <InputGroup.Text>
                    <FontAwesomeIcon icon={icon}/>
                </InputGroup.Text>
            }
            <Form.Control 
                required 
                type={type} 
                value={value} 
                onChange={onChange} 
            />
        </InputGroup>
    </Form.Group>
);

SourceField.defaultProps = {
    type: "text",
    label: "label",
    xs: 12,
    onChange: _ => {},
    value: ""
}

export default SourceField;