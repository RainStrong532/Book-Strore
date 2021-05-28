import React from 'react';
import { Container } from 'react-bootstrap';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent';

function ForgotPasswordContainer() {
    return(
        <Container className="d-flex justify-content-center">
            <ForgotPasswordComponent/>
        </Container>
    )
}

export default ForgotPasswordContainer;