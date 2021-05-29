import React from 'react';
import { Container } from 'react-bootstrap';
import BookDetail from '../components/BookDetail'

function HomeContainer() {
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            <BookDetail/>
        </Container>
    );
}

export default HomeContainer;