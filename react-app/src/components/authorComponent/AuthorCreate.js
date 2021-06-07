import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import ImageHolder from '../commons/ImageHolder';
import ImagePicker from '../commons/ImagePicker';
import fetchApi from '../../services/fetchApi'
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';

function AuhtorCreate({ createAuthor }) {
    const history = useHistory();
    const [auhtor, setAuhtor] = useState({
        author_id: null,
        author_name: "",
        description: "",
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const getDataFromLocalStorage = () => {
        const auhtorData = localStorage.getItem(`auhtor`);
        const imagesData = localStorage.getItem('author-images');

        if (auhtorData || imagesData) {
            setAuhtor(auhtorData ? JSON.parse(auhtorData) : { ...auhtor });
            setImages(imagesData ? JSON.parse(imagesData) : [...images]);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        getDataFromLocalStorage();
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
                        Thêm mới tác giả
                </p>
                </div>

                <div className="right">
                    <Button
                        variant="success"
                        className="mx-2"
                        title={auhtor.author_name.length > 0 ? "Tạo mới" : "Phải có tên tác giả"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                            if (createAuthor) {
                                createAuthor({...auhtor}, [...images]);
                            }
                        }}
                        disabled={auhtor.author_name.length === 0}
                    >
                        <i className="fas fa-save mr-2"></i>
                        Tạo mới
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
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Tên tác giả* {`${auhtor.author_name.length===0 ? '(Không được rỗng)' : ''}`}</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nhập tên thể loại"
                                    value={auhtor.author_name}
                                    onChange={(e) => {
                                        setAuhtor({ ...auhtor, author_name: e.target.value });
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
                                    value={auhtor.description}
                                    onChange={(e) => {
                                        setAuhtor({ ...auhtor, description: e.target.value });
                                    }}
                                    placeholder="Mô tả"
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuhtorCreate;