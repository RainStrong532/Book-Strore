import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Chat from '../components/chat/Chat'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import { useHistory } from 'react-router';


function AuthorUpdate() {
    const history = useHistory();

    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            <Chat/>
        </Container>
    );
}

export default AuthorUpdate;