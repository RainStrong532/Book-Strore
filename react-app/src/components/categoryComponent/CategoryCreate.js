import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";

function CategoryCreate({ createCategory }) {
    const history = useHistory();
    const [category, setCategory] = useState({
        category_id: null,
        category_name: "",
        description: "",
    });

    const getDataFromLocalStorage = () => {
        const categoryData = localStorage.getItem(`category`);

        if (categoryData) {
            setCategory(categoryData ? JSON.parse(categoryData) : { ...category });
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
            <header className="d-flex justify-content-between p-4 border border-dark border-left-0 border-right-0 border-top-0">
                <div className="left d-flex">
                    <div className="back mr-3" style={{ cursor: "pointer" }}
                        onClick={() => { history.goBack() }}
                    >
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <p className="title" style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "context-menu" }}>
                        Thêm mới thể loại
                </p>
                </div>

                <div className="right">
                    <Button
                        variant="success"
                        className="mx-2"
                        title={category.category_name.length > 0 ? "Tạo mới" : "Phải có tên thể loại"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                            if (createCategory) {
                                createCategory(category);
                            }
                        }}
                        disabled={category.category_name.length === 0}
                    >
                        <i className="fas fa-save mr-2"></i>
                        Tạo mới
                    </Button>
                </div>
            </header>

            <div className="info-section m-3" style={{ fontWeight: "bold" }}>
                <div className="row">
                    <div className="col-6">
                        <Form>
                            <Form.Group className="mb-3" controlId="category_name">
                                <Form.Label>Tên thể loại* {`${category.category_name.length===0 ? '(Không được rỗng)' : ''}`}</Form.Label>
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
        </div>
    )
}

export default CategoryCreate;