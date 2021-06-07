import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import fetchApi from '../../services/fetchApi'
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';
import Cookies from 'js-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function CategoryDetailComponent() {
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
            const res = await fetchApi('DELETE', `${urls.CATEGORY_URL}/${category.categoty_id}`, null, token);
            if (res.success===0) {
                alert(res.message);
            } else {
                alert("Xóa thể loại thành công");
                history.push('/admin/managements/books');
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
            if (res.success === 1) {
                setCategory({...res.data});
            } else {
                alert(res.message);
                history.push("/admin/managements/books")
            }
        } catch (e) {
            alert(e.message)
            history.push("/admin/managements/books")
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (!category.categoty_id || category.category_id < 0) {

            const pathName = history.location.pathname;
            let p = pathName.split('/');
            let id = p[p.length - 1];
            id = parseInt(id);
            if (Number.isInteger(id)) {
                getCategory(id);
            } else {
                history.push("/404")
            }
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
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
                        Chi tiết thể loại
                </p>
                </div>

                <div className="right">
                    <Button variant="warning" className="mx-2" title="Chỉnh sửa"
                        onClick={() => history.push(`/admin/managements/books/categories/update/${category.category_id}`)}
                    >
                        <i className="fas fa-edit" style={{ color: "#FFF" }}></i>
                    </Button>
                    <Button variant="danger" className="mx-2" title="Xóa"
                        onClick={toggleDelete}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </div>
            </header>

            <div className="info-section m-3" style={{ fontWeight: "bold" }}>
                <div className="row">
                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="category_name">
                                <Form.Label>Tên thể loại</Form.Label>
                                <p className="form-control bg-light">{category.category_name}</p>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Mô tả</Form.Label>
                                <p className="form-control bg-light" style={{ minHeight: "100px", height: "auto" }}>{category.description || ""}</p>
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

export default CategoryDetailComponent;