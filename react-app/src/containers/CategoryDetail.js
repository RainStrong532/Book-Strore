import React from 'react';
import { Container } from 'react-bootstrap';
import CategoryDetail from '../components/categoryComponent/CategoryDetail'

function HomeContainer() {
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            <CategoryDetail/>
        </Container>
    );
}

export default HomeContainer;