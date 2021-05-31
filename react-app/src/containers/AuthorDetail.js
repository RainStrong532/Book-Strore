import React from 'react';
import { Container } from 'react-bootstrap';
import AuthorDetail from '../components/authorComponent/AuthorDetail'

function HomeContainer() {
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            <AuthorDetail/>
        </Container>
    );
}

export default HomeContainer;