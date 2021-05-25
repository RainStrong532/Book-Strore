import React from 'react';
import { Container } from 'react-bootstrap';
import VerifyForm from '../components/VerifyComponent/VerifyForm';

function VerifyContainer() {
    return(
        <Container className="d-flex justify-content-center">
            <VerifyForm/>
        </Container>
    )
}

export default VerifyContainer;