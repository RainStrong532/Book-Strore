import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import fetchApi from '../../services/fetchApi'
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';
import Cookies from 'js-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import ImageHolder from '../commons/ImageHolder';
import ImagePicker from '../commons/ImagePicker';


function AuthorForm({ updateAuthor }) {
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
                history.push('/admin/managements/books');
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
            if (!res.success) {
                alert(res.message);
                history.push("/admin/managements/books")
            } else {
                setAuthor({ ...author, ...res.data });
                setImages(res.data.images || []);
            }
        } catch (err) {
            alert(err.message);
            history.push("/admin/managements/books")
        }
        setIsLoading(false);
    }

    const getDataFromLocalStorage = (id) => {
        const authorData = localStorage.getItem(`author-${id}`);
        const imagesData = localStorage.getItem(`author-images-${id}`);


        if (authorData || imagesData) {
            setAuthor(authorData ? JSON.parse(authorData) : { ...author });
            return true;
        } else {
            return false;
        }
    }

    const deleteImage = async (image) => {
        setIsLoading(true);
        let imgs = images.filter(img => img.image_id !== image.image_id);
        setImages([...imgs]);
        setIsLoading(false);
    }

    const addImage = async (image) => {
        setIsLoading(true);
        try {
            const res = await fetchApi("POST", urls.IMAGES_URL + "/upload", { image: image });
            if (res) {
                let imgs = images;
                imgs.push({ url: res.url, image_id: res.image_id });
                setImages([...imgs]);
            } else {
                alert("Upload ảnh thất bại")
            }
        } catch (err) {
            alert(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const pathName = history.location.pathname;
        let p = pathName.split('/');
        let id = p[p.length - 1];
        id = parseInt(id);
        if (Number.isInteger(id)) {
            if (!getDataFromLocalStorage(id)) {
                getAuthor(id);
            }
        } else {
            history.push("/404")
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
                        Cập nhật tác giả
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
                        title={author.author_name.length > 0 ? "Cập nhật" : "Phải có tên ther loại"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                            if (updateAuthor) {
                                updateAuthor({ ...author }, [...images]);
                            }
                        }}
                        disabled={author.author_name.length === 0}
                    >
                        <i className="fas fa-save mr-2"></i>
                                Cập nhật
                            </Button>
                </div>
            </header>

            <div className="image-section border border-dark border-left-0 border-right-0 border-top-0">
                <p className="title px-4 pt-3"
                    style={{ fontWeight: "bold" }}
                >
                    Hình ảnh
                        </p>
                <div className="row" style={{ padding: "0rem 5rem", paddingBottom: "2rem" }}>

                    {
                        images.map(image => {
                            return (
                                <ImageHolder
                                    key={image.image_id}
                                    data={image}
                                    onDelete={deleteImage}
                                />
                            )
                        })
                    }

                    <ImagePicker
                        setImage={addImage}
                    />
                </div>
            </div>

            <div className="info-section m-3" style={{ fontWeight: "bold" }}>
                <div className="row">
                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="author_name">
                                <Form.Label>Tên tác giả* {`${author.author_name.length===0 ? '(Không được rỗng)' : ''}`}</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nhập tên thể loại"
                                    value={author.author_name}
                                    onChange={(e) => {
                                        setAuthor({ ...author, author_name: e.target.value });
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
                                    value={author.description}
                                    onChange={(e) => {
                                        setAuthor({ ...author, description: e.target.value });
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

export default AuthorForm;