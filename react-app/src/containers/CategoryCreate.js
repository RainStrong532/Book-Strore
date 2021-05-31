import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CategoryCreate from '../components/categoryComponent/CategoryCreate'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import LoadingComponent from '../components/commons/LoadingComponent';
import { useHistory } from 'react-router';

function CategoryCreateContainer() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const saveToLocalStorage = (category)=>{
        localStorage.setItem('category', JSON.stringify(category));
    }

    const deleteFromLocalStorage = ()=>{
        localStorage.removeItem('category');
    }

    const saveCategory = async (category) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('POST', `${urls.CATEGORY_URL}`, category, token);
            if (res.success === 0) {
                alert(res.message);
            } else {
                deleteFromLocalStorage();
                alert("Tạo thể loại thành công");
                history.push("/admin/managements/books");

            }
        } catch (err) {
            saveToLocalStorage(category);
            alert(err.message);
        }
        setLoading(false);
    }


    const createCategory = (category) => {
        saveCategory(category);
    }
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            {loading && <LoadingComponent />}
            <CategoryCreate
                createCategory={createCategory}
            />
        </Container>
    );
}

export default CategoryCreateContainer;