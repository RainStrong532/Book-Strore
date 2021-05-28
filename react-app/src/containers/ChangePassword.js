import React from 'react';
import { Container } from 'react-bootstrap';
import ChangePassword from '../components/ChangePassword';

function ChangePasswordContainer() {
    return(
        <Container className="d-flex justify-content-center">
            <ChangePassword/>
        </Container>
    )
}

export default ChangePasswordContainer;