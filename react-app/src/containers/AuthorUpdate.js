import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AuthorForm from '../components/authorComponent/AuthorForm'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import LoadingComponent from '../components/commons/LoadingComponent';
import { useHistory } from 'react-router';


function AuthorUpdate() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const saveToLocalStorage = (author, images) => {
        localStorage.setItem('author-' + author.author_id, JSON.stringify(author));
        localStorage.setItem('author-images-' + author.author_id, JSON.stringify(images));
    }

    const deleteFromLocalStorage = (id) => {
        localStorage.removeItem('author-' + id);
        localStorage.removeItem('author-images-' + id);
    }

    const saveImages = async (images, author_id) => {
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('POST', `${urls.AUTHOR_URL}/${author_id}/images`, { images: images }, token);
            if (res.success === 0) {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const saveAuthor = async (author, images) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('PUT', `${urls.AUTHOR_URL}/${author.author_id}`, author, token);
            if (res.success === 0) {
                alert(res.message);
            } else {
                if (images && images.length > 0) {
                    console.log("start save image");
                    saveImages(images, author.author_id);
                }
                deleteFromLocalStorage(author.author_id);
                alert("Cập nhật tác giả thành công");
                history.push("/admin/managements/books");

            }
        } catch (err) {
            saveToLocalStorage(author, images);
            alert(err.message);
        }
        setLoading(false);
    }
    const updateAuthor = (author, images) => {
        saveAuthor(author, images);
    }
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            {loading && <LoadingComponent />}
            <AuthorForm
                updateAuthor={updateAuthor}
            />
        </Container>
    );
}

export default AuthorUpdate;