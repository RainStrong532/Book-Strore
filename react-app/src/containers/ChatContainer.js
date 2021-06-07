import React from 'react';
import { Container } from 'react-bootstrap';
import Chat from '../components/chat/Chat'


function AuthorUpdate() {

    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            <Chat/>
        </Container>
    );
}

export default AuthorUpdate;