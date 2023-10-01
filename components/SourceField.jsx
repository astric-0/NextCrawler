import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SourceField = ({ type, xxl, label, onChange, value }) => {
    return (
        <Form.Group as={Col} md="12" xxl={xxl} className="mt-3">
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
    xxl: 12,
    onChange: _ => {},
    defaultValue: ""
}

export default SourceField;