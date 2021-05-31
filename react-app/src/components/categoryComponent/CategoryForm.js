import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import fetchApi from '../../services/fetchApi'
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';
import Cookies from 'js-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'


function CategoryForm({ updateCategory }) {
    const history = useHistory();
    const [category, setCategory] = useState({
        category_id: null,
        category_name: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const toggleDelete = () => {
        setModal(!modal);
    }

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('DELETE', `${urls.CATEGORY_URL}/${category.category_id}`, null, token);
            if (res.success == 0) {
                alert(res.message);
            } else {
                alert("Xóa thể loại thành công");
                history.push('/admin/managements/books/categories');
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }


    const getCategory = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetchApi('GET', `${urls.CATEGORY_URL}/${id}`);
            if (!res.success) {
                alert(res.message);
                history.push("/admin/managements/books")
            } else {
                setCategory({ ...category, ...res.data });
            }
        } catch (err) {
            alert(err.message);
            history.push("/admin/managements/books")
        }
        setIsLoading(false);
    }

    const getDataFromLocalStorage = (id) => {
        const categoryData = localStorage.getItem(`category-${id}`);

        if (categoryData) {
            setCategory(categoryData ? JSON.parse(categoryData) : { ...category });
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        const pathName = history.location.pathname;
        console.log(pathName);
        let p = pathName.split('/');
        let id = p[p.length - 1];
        id = parseInt(id);
        if (Number.isInteger(id)) {
            if (!getDataFromLocalStorage(id)) {
                getCategory(id);
            }
        } else {
            console.log("id not valid");
            history.push("/404")
        }
    }, [])

    return (
        <div className="book-detail">
            {isLoading && <LoadingComponent />}
            <header className="d-flex justify-content-between p-4 border border-dark border-left-0 border-right-0 border-top-0">
                <div className="left d-flex">
                    <div className="back mr-3" style={{ cursor: "pointer" }}
                        onClick={() => { history.goBack() }}
                    >
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <p className="title" style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "context-menu" }}>
                        Cập nhật thể loại
                        </p>
                </div>

                <div className="right">
                    <Button variant="danger"
                        onClick={toggleDelete}
                    >
                        <i className="fas fa-trash mr-2"></i>
                        Xóa
                    </Button>

                    <Button
                        variant="warning"
                        className="mx-2"
                        title={category.category_name.length > 0 ? "Cập nhật" : "Phải có tên ther loại"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                            if (updateCategory) {
                                updateCategory({ ...category });
                            }
                        }}
                        disabled={category.category_name.length === 0}
                    >
                        <i className="fas fa-save mr-2"></i>
                                Cập nhật
                            </Button>
                </div>
            </header>

            <div className="info-section m-3" style={{ fontWeight: "bold" }}>
                <div className="row">
                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="category_name">
                                <Form.Label>Tên thể loại* {`${category.category_name.length == 0 ? '(Không được rỗng)' : ''}`}</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nhập tên thể loại"
                                    value={category.category_name}
                                    onChange={(e) => {
                                        setCategory({ ...category, category_name: e.target.value });
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" rows={3} className="form-control bg-light"
                                    value={category.description}
                                    onChange={(e) => {
                                        setCategory({ ...category, description: e.target.value });
                                    }}
                                    placeholder="Mô tả"
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggleDelete} centered={true}>
                <ModalHeader toggle={toggleDelete}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa?
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => {
                        handleDelete();
                        toggleDelete();
                    }}>Đồng ý</Button>{' '}
                    <Button variant="secondary" onClick={toggleDelete}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CategoryForm;