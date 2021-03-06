import React from 'react';
import { Container } from 'react-bootstrap';
import HomeComponent from '../components/TabComponent'

function HomeContainer() {
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            <h1 className="text-center py-2 pt-4 fw-bold" style={{ fontWeight: "bold" }}>Hệ thống quản lý</h1>
            <HomeComponent/>
        </Container>
    );
}

export default HomeContainer;
