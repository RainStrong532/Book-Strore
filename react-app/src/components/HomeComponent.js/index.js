import React from 'react';
import { Container } from 'react-bootstrap';
import BookComponent from '../commons/BookComponent';

function HomeComponent() {
    return (
        <Container style={{marginBottom: "2rem"}}>
            <header id="inner">
                <h1>Find your new book!</h1>
                <p>Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit amet nisi euismod sed cursus arcu elementum ipsum arcu vivamus quis venenatis orci lorem ipsum et magna feugiat veroeros aliquam. Lorem ipsum dolor sit amet nullam dolore.</p>
            </header>

            <br />

            <h2 className="h2">Featured Products</h2>
            <section className="tiles">
                <BookComponent />
                <BookComponent />
                <BookComponent />
                <BookComponent />
                <BookComponent />
                <BookComponent />
            </section>
            <p className="text-center"><a href="/products">More Books &nbsp;<i className="fa fa-long-arrow-right"></i></a></p>
        </Container>
    )
}

export default HomeComponent;