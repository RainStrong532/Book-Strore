import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CategoryForm from '../components/categoryComponent/CategoryForm'
import Cookies from 'js-cookie';
import * as urls from '../services/url';
import fetchApi from '../services/fetchApi'
import LoadingComponent from '../components/commons/LoadingComponent';
import { useHistory } from 'react-router';


function CategoryUpdate() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const saveToLocalStorage = (category)=>{
        localStorage.setItem(`category-${category.book_id}`, JSON.stringify(category));
    }

    const deleteFromLocalStorage = (id)=>{
        localStorage.removeItem(`category-${id}`);
    }

    const saveCategory = async (category) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const res= await fetchApi('PUT', `${urls.CATEGORY_URL}/${category.category_id}`, category, token);
            if (res.success === 0) {
                alert(res.message);
            } else {
                deleteFromLocalStorage(category.category_id);
                alert("Cập nhật thể loại thành công");
                history.push("/admin/managements/books");

            }
        } catch (err) {
            saveToLocalStorage(category);
            alert(err.message);
        }
        setLoading(false);
    }
    const updateCategory = (category) => {
        saveCategory(category);
    }
    return (
        <Container style={{ background: "#FFF", borderRadius: "8px" }} className="my-3 pb-3 d-flex flex-column">
            {loading && <LoadingComponent/>}
            <CategoryForm
                updateCategory={updateCategory}
            />
        </Container>
    );
}

export default CategoryUpdate;