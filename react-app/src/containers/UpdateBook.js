import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import BookForm from '../components/BookForm'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import LoadingComponent from '../components/commons/LoadingComponent';
import { useHistory } from 'react-router';


function UpdateBook() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const saveToLocalStorage = (book, images, authors, categories)=>{
        localStorage.setItem(`book-${book.book_id}`, JSON.stringify(book));
        localStorage.setItem(`authors-${book.book_id}`, JSON.stringify(authors));
        localStorage.setItem(`categories-${book.book_id}`, JSON.stringify(categories));
        localStorage.setItem(`images-${book.book_id}`, JSON.stringify(images));
    }

    const deleteFromLocalStorage = (id)=>{
        localStorage.removeItem(`book-${id}`);
        localStorage.removeItem(`authors-${id}`);
        localStorage.removeItem(`categories-${id}`);
        localStorage.removeItem(`images-${id}`);
    }

    const saveBook = async (book, images, authors, categories) => {
        setLoading(true);
        if (authors.length === 0 || !authors) {
            alert("Yêu câu thông tin tác giả");
            setLoading(false);
            return;
        }
        if (categories.length === 0 || !categories) {
            alert("Yêu câu thông tin thể loại");
            setLoading(false);
            return;
        }
        try {
            const token = Cookies.get('token');
            const res= await fetchApi('PUT', `${urls.BOOK_URL}/${book.book_id}`, book, token);
            if (res.success === 0) {
                alert(res.message);
            } else {
                if (images && images.length > 0) {
                    saveImages(images, book.book_id);
                }

                saveAuthors(authors, book.book_id);

                saveCategories(categories, book.book_id);

                deleteFromLocalStorage(book.book_id);
                alert("Cập nhật sách thành công");
                history.push("/admin/managements/books");

            }
        } catch (err) {
            saveToLocalStorage(book, images, authors, categories);
            alert(err.message);
        }
        setLoading(false);
    }

    const saveImages = async (images, book_id) => {
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('POST', `${urls.BOOK_URL}/${book_id}/images`, { images: images }, token);
            if (res.success === 0) {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const saveAuthors = async (authors, book_id) => {
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('POST', `${urls.BOOK_URL}/${book_id}/authors`, { authors: authors }, token);
            if (res.success === 0) {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const saveCategories = async (categories, book_id) => {
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('POST', `${urls.BOOK_URL}/${book_id}/categories`, { categories: categories }, token);
            if (res.success === 0) {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const updateBook = (book, images, authors, categories) => {
        saveBook(book, images, authors, categories);
    }
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            {loading && <LoadingComponent/>}
            <BookForm
                updateBook={updateBook}
                saveToLocalStorage={saveToLocalStorage}
            />
        </Container>
    );
}

export default UpdateBook;