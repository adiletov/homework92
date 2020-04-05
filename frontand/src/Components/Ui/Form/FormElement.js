import React from 'react';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = ({propertyName, title, error, children, ...props}) => {
    return (
        <FormGroup row>
            <Label sm={2} for={propertyName}>{title}</Label>
            <Col sm={10}>
                <Input
                    name={propertyName} id={propertyName}
                    invalid={!!error}
                    {...props}
                >
                    {children}
                </Input>
                {error && (
                    <FormFeedback>
                        {error}
                    </FormFeedback>
                )}
            </Col>
        </FormGroup>
    );
};

export default FormElement;