import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import fetchApi from '../../services/fetchApi'
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';
import Cookies from 'js-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import ImageViewerCustom from '../commons/ImageViewer';

function AuthorDetailComponent() {
    const history = useHistory();
    const [author, setAuthor] = useState({
        author_id: null,
        author_name: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [images, setImages] = useState([]);

    const toggleDelete = () => {
        setModal(!modal);
    }

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('DELETE', `${urls.AUTHOR_URL}/${author.author_id}`, null, token);
            if (res.success===0) {
                alert(res.message);
            } else {
                alert("Xóa tác giả thành công");
                history.push("/admin/managements/books");
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const getAuthor = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetchApi('GET', `${urls.AUTHOR_URL}/${id}`);
            if (res.success === 1) {
                setAuthor({...res.data});
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
        if (!author.author_id || author.author_id < 0) {

            const pathName = history.location.pathname;
            let p = pathName.split('/');
            let id = p[p.length - 1];
            id = parseInt(id);
            if (Number.isInteger(id)) {
                getAuthor(id);
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
                        Chi tiết tác giả
                </p>
                </div>

                <div className="right">
                    <Button variant="warning" className="mx-2" title="Chỉnh sửa"
                        onClick={() => history.push(`/admin/managements/books/authors/update/${author.author_id}`)}
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
                            <Form.Group className="mb-3" controlId="author_name">
                                <Form.Label>Tên tác giả</Form.Label>
                                <p className="form-control bg-light">{author.author_name}</p>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Mô tả</Form.Label>
                                <p className="form-control bg-light" style={{ minHeight: "100px", height: "auto" }}>{author.description || ""}</p>
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

export default AuthorDetailComponent;