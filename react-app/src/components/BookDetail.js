import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageViewerCustom from './commons/ImageViewer';
import { useHistory } from "react-router";
import fetchApi from '../services/fetchApi'
import * as urls from '../services/url';
import LoadingComponent from './commons/LoadingComponent';
import Cookies from 'js-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom';

function BookDetail() {
    const history = useHistory();
    const [book, setBook] = useState({
        book_id: null,
        book_name: "",
        description: "",
        price: 0,
        quantity: 0,
        discount: 0,
        publish_year: 0
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const toggleDelete = () => {
        setModal(!modal);
    }

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('DELETE', `${urls.BOOK_URL}/${book.book_id}`, null, token);
            if (res.success===0) {
                alert(res.message);
            } else {
                alert("Xóa sách thành công");
                history.push('/admin/managements/books');
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const getBook = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetchApi('GET', `${urls.BOOK_URL}/${id}`);
            if (res.success === 1) {
                setBook(res.data);
                setImages(res.data.images.map(image => image.url));
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
        const pathName = history.location.pathname;
        let p = pathName.split('/');
        let id = p[p.length - 1];
        id = parseInt(id);
        if (Number.isInteger(id)) {
            getBook(id);
        } else {
            history.push("/404")
        }
    }, [history])
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
                        Chi tiết sách
                </p>
                </div>

                <div className="right">
                    <Button variant="warning" className="mx-2" title="Chỉnh sửa"
                        onClick={() => history.push(`/admin/managements/books/update/${book.book_id}`)}
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

            <div className="image-section border border-dark border-left-0 border-right-0 border-top-0">
                <p className="title px-4 pt-3"
                    style={{ fontWeight: "bold" }}
                >
                    Hình ảnh
                </p>
                <ImageViewerCustom
                    images={images}
                />
            </div>

            <div className="info-section m-3" style={{ fontWeight: "bold" }}>
                <div className="row">
                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Tên sách</Form.Label>
                                <p className="form-control bg-light">{book.book_name}</p>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Giá</Form.Label>
                                <p className="form-control bg-light">{`${book.price} VNĐ`}</p>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Số lượng</Form.Label>
                                <p className="form-control bg-light">{book.quantity}</p>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Mô tả</Form.Label>
                                <p className="form-control bg-light" style={{ minHeight: "100px", height: "auto" }}>{book.description || ""}</p>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Danh sách tác giả</Form.Label>
                                <div className="d-flex flex-wrap">
                                    {
                                        book.authors
                                            ?
                                            book.authors.length > 0
                                                ?
                                                book.authors.map((item, index) => {
                                                    return (
                                                        <Link to={`/admin/managements/books/authors/${item.author_id}`}
                                                            key={index}
                                                            className="form-control m-2 bg-light col-6"
                                                            style={{ cursor: "pointer", textDecoration: "none" }}
                                                        >
                                                            {item.author_name}
                                                        </Link>
                                                    )
                                                })
                                                :
                                                <p style={{ fontWeight: "normal" }} className="form-control">Chưa có tác giả</p>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="publish_year">
                                <Form.Label>Năm xuất bản</Form.Label>
                                <p className="form-control bg-light">{book.publish_year || 0}</p>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Khuyễn mãi</Form.Label>
                                <p className="form-control bg-light">{`${book.discount * 100}%`}</p>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Danh sách thể loại</Form.Label>
                                <div className="d-flex flex-wrap">
                                    {
                                        book.categories
                                            ?
                                            book.categories.length > 0
                                                ?
                                                book.categories.map((item, index) => {
                                                    return (
                                                        <Link to={`/admin/managements/books/categories/${item.category_id}`} key={index} className="form-control m-2 bg-light col-6"
                                                            style={{ cursor: "pointer", textDecoration: "none" }}
                                                        >
                                                            {item.category_name}
                                                        </Link>
                                                    )
                                                })
                                                :
                                                <p style={{ fontWeight: "normal" }} className="form-control">Chưa có thể loại</p>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
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

export default BookDetail;