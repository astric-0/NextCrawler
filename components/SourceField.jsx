import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SourceField = ({ type, md, label, onChange, value }) => {
    return (
        <Form.Group as={Col} md={md}>
            <Form.Label>{ label }*</Form.Label>
            <Form.Control 
                required 
                type={type} 
                value={value} 
                onChange={onChange} 
            />
        </Form.Group>
    );
}

SourceField.defaultProps = {
    type: "text",
    label: "label",
    md: 4,
    onChange: _ => {},
    defaultValue: ""
}

export default SourceField;