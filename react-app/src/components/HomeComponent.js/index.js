import React from 'react';
import { Container } from 'react-bootstrap';
import BookComponent from '../commons/BookComponent';

function HomeComponent({ books }) {
    return (
        <Container style={{ marginBottom: "2rem" }}>
            <header id="inner">
                <h1>Find your new book!</h1>
                <p>Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit amet nisi euismod sed cursus arcu elementum ipsum arcu vivamus quis venenatis orci lorem ipsum et magna feugiat veroeros aliquam. Lorem ipsum dolor sit amet nullam dolore.</p>
            </header>

            <br />

            <h2 className="h2">Featured Products</h2>
            <section className="tiles">
                {
                    (books && books.length > 0)
                        ?
                        books.map(book => {
                            return (
                                <BookComponent book={book} key={book.book_id}/>
                            )
                        })
                        :
                        <>
                        </>
                }
            </section>
            <p className="text-center"><a href="/products">More Books &nbsp;<i className="fas fa-arrow-right" style={{ fontSize: "0.8rem" }}></i></a></p>
        </Container>
    )
}

export default HomeComponent;