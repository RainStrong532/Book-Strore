import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AuthorCreate from '../components/authorComponent/AuthorCreate'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import LoadingComponent from '../components/commons/LoadingComponent';
import { useHistory } from 'react-router';

function AuthorCreateContainer() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const saveToLocalStorage = (author, images)=>{
        localStorage.setItem('author', JSON.stringify(author));
        localStorage.setItem('author-images', JSON.stringify(images));
    }

    const deleteFromLocalStorage = ()=>{
        localStorage.removeItem('author');
        localStorage.removeItem('author-images');
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
            const res = await fetchApi('POST', `${urls.AUTHOR_URL}`, author, token);
            if (res.success === 0) {
                alert(res.message);
            } else {
                if (images && images.length > 0) {
                    saveImages(images, res.data.author_id);
                }

                deleteFromLocalStorage();

                alert("Thêm tác giả thành công");
                history.push("/admin/managements/books");

            }
        } catch (err) {
            saveToLocalStorage(author, images);
            alert(err.message);
        }
        setLoading(false);
    }


    const createAuthor = (author, images) => {
        saveAuthor(author, images);
    }
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            {loading && <LoadingComponent />}
            <AuthorCreate
                createAuthor={createAuthor}
            />
        </Container>
    );
}

export default AuthorCreateContainer;