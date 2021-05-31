import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import BookForm from '../components/BookCreate'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import LoadingComponent from '../components/commons/LoadingComponent';
import { useHistory } from 'react-router';

function BookCreate() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const saveToLocalStorage = (book, images, authors, categories)=>{
        localStorage.setItem('book', JSON.stringify(book));
        localStorage.setItem('authors', JSON.stringify(authors));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('images', JSON.stringify(images));
    }

    const deleteFromLocalStorage = ()=>{
        localStorage.removeItem('book');
        localStorage.removeItem('authors');
        localStorage.removeItem('categories');
        localStorage.removeItem('images');
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
            const res = await fetchApi('POST', `${urls.BOOK_URL}`, book, token);
            if (res.success === 0) {
                alert(res.message);
            } else {
                if (images && images.length > 0) {
                    saveImages(images, res.data.book_id);
                }

                saveAuthors(authors, res.data.book_id);

                saveCategories(categories, res.data.book_id);
                deleteFromLocalStorage();
                alert("Tạo sách thành công");
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

    const createBook = (book, images, authors, categories) => {
        saveBook(book, images, authors, categories);
    }
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            {loading && <LoadingComponent />}
            <BookForm
                createBook={createBook}
                saveToLocalStorage={saveToLocalStorage}
            />
        </Container>
    );
}

export default BookCreate;