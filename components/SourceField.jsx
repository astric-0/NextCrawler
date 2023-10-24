import React from 'react';
import { Form, Col } from 'react-bootstrap';

const SourceField = ({ type, xs, label, onChange, value }) => {
    return (
        <Form.Group as={Col} xs={xs} className="mt-3">
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
    xs: 12,
    onChange: _ => {},
    defaultValue: ""
}

export default SourceField;