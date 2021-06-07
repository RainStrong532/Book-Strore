import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import fetchApi from '../services/fetchApi'
import * as urls from '../services/url';
import LoadingComponent from './commons/LoadingComponent';
import Filter from './commons/Filter'
import ImageHolder from './commons/ImageHolder';
import ImagePicker from './commons/ImagePicker';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Cookies from 'js-cookie'


function BookUpdate({ updateBook, saveToLocalStorage }) {
    const history = useHistory();
    const [book, setBook] = useState({
        book_id: -1,
        book_name: "",
        description: "",
        price: 0,
        quantity: 0,
        discount: 0,
        publish_year: 0,
        amount: 0, 
    });
    const [discount, setDiscount] = useState(0);
    const [images, setImages] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [authorOptions, setAuhtorOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

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
            if (!res.success) {
                alert(res.message);
                history.push("/admin/managements/books")
            } else {
                setBook({ ...book, ...res.data });
                setImages(res.data.images || []);
                setCategories([...res.data.categories]);
                setAuthors([...res.data.authors]);
            }
        } catch (err) {
            alert(err.message);
            history.push("/admin/managements/books")
        }
        setIsLoading(false);
    }

    const filterOptions = (options, data, fieldCheck) => {
        let ops = [];
        ops = options.filter(item => {
            if (data) {
                if (!item.id || !item.name) return false;
                let res = data.find(c => c[fieldCheck]===item.id);
                return (res === undefined)
            }
            return true;
        })
        return ops
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

    const addCategory = (id) => {
        if (id===-1 || !Number.isInteger(parseInt(id))) {
            filterOptions(categoryOptions, categories, 'category_id');
            return;
        }
        if (id < -1) {
            return;
        }
        let category = categoryOptions.find(c => c.id===id);
        category.category_id = category.id;
        delete category.id;
        category.category_name = category.name;
        delete category.name;
        setCategories([...categories, category]);

        let options = categoryOptions.filter(a => a.id !== id);
        setCategoryOptions([...options]);
        setIsLoading(false);
    }

    const addAuthor = (id) => {
        if (id===-1 || !Number.isInteger(parseInt(id))) {
            filterOptions(authorOptions, authors, 'author_id');
            return;
        }
        if (id < -1) {
            return;
        }
        let author = authorOptions.find(c => c.id===id);
        author.author_id = author.id;
        delete author.id;
        author.author_name = author.name;
        delete author.name;
        setAuthors([...authors, author]);

        let options = authorOptions.filter(a => a.id !== id);
        setAuhtorOptions([...options]);
    }

    const deleteAuthor = (id) => {
        let ats = authors.filter(c => c.author_id !== id);
        let author = authors.find(c => c.author_id===id);
        setAuthors([...ats]);
        let options = authorOptions;
        options.push({ id: author.author_id, name: author.author_name })
        setAuhtorOptions(options);
    }

    const deleteCategory = (id) => {
        let cts = categories.filter(c => c.category_id !== id);
        let category = categories.find(c => c.category_id===id);
        setCategories([...cts]);
        let options = categoryOptions;
        options.push({ id: category.category_id, name: category.category_name })
        setCategoryOptions(options);
    }

    const getListAuthors = async function () {
        setIsLoading(true);
        try {
            const url = new URL(urls.AUTHOR_URL);

            url.searchParams.set('limit', 100);
            const res = await fetchApi('GET', url);
            if (res.success===1) {
                let options = [];
                options = res.data.map((item) => {
                    let option = {};
                    for (const key in item) {
                        if (Object.hasOwnProperty.call(item, key)) {
                            if (key.endsWith('id') && key !== 'parent_id') {
                                option.id = item[key];
                            } else if (key.endsWith('name')) {
                                option.name = item[key];
                            }
                        }
                    }
                    return option;
                })
                let ops = filterOptions(options, authors, 'author_id');
                setAuhtorOptions(ops);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const getListCategories = async function () {
        setIsLoading(true);
        try {
            const url = new URL(urls.CATEGORY_URL);
            url.searchParams.set('limit', 100);

            const res = await fetchApi('GET', url);
            if (res.success===1) {
                let options = [];
                options = res.data.map((item) => {
                    let option = {};
                    for (const key in item) {
                        if (Object.hasOwnProperty.call(item, key)) {
                            if (key.endsWith('id') && key !== 'parent_id') {
                                option.id = item[key];
                            } else if (key.endsWith('name')) {
                                option.name = item[key];
                            }
                        }
                    }
                    return option;
                })
                let ops = filterOptions(options, categories, 'category_id');
                setCategoryOptions(ops);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const handleGoToAddAuthor = () => {
        saveToLocalStorage(book, images, authors, categories);
        alert("Sau khi thêm mới hay load lại trang để cập nhật");
        const win = window.open("/admin/managements/books/authors/add", "_blank");
        win.focus();
    }

    const handleGoToAddCategory = () => {
        saveToLocalStorage(book, images, authors, categories);
        alert("Sau khi thêm mới hay load lại trang để cập nhật");
        const win = window.open("/admin/managements/books/categories/add", "_blank");
        win.focus();
    }

    const getDataFromLocalStorage = (id) => {
        const bookData = localStorage.getItem(`book-${id}`);
        const authorsData = localStorage.getItem(`authors-${id}`);
        const categoriesData = localStorage.getItem(`categories-${id}`);
        const imagesData = localStorage.getItem(`images-${id}`);

        if (bookData || imagesData || authorsData || categoriesData) {
            setImages(imagesData ? JSON.parse(imagesData) : [...images]);
            setBook(bookData ? JSON.parse(bookData) : { ...book });
            setAuthors(authorsData ? JSON.parse(authorsData) : [...authors]);
            setCategories(categoriesData ? JSON.parse(categoriesData) : [...categories]);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        getListAuthors();
        getListCategories();

        const pathName = history.location.pathname;
        let p = pathName.split('/');
        let id = p[p.length - 1];
        id = parseInt(id);
        if (Number.isInteger(id)) {
            if (!getDataFromLocalStorage(id)) {
                getBook(id);
            }
        } else {
            history.push("/404")
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        let ops = [];
        ops = filterOptions(categoryOptions, categories, 'category_id');
        setCategoryOptions(ops);

        let ops2 = [];
        ops2 = filterOptions(authorOptions, authors, 'author_id');
        setAuhtorOptions(ops2);
    }, [categories, authors])// eslint-disable-line react-hooks/exhaustive-deps

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
                        Cập nhật sách
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
                        title={book.book_name.length > 0 ? "Cập nhật" : "Phải có tên sách"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                            if (updateBook) {
                                updateBook({ ...book, quantity: parseInt(book.quantity || 0) + book.amount }, images, authors, categories);
                            }
                        }}
                        disabled={book.book_name.length === 0}
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
                            <Form.Group className="mb-3" controlId="book_name">
                                <Form.Label>Tên sách* {`${book.book_name.length===0 ? '(Không được rỗng)' : ''}`}</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nhập tên sách"
                                    value={book.book_name}
                                    onChange={(e) => {
                                        setBook({ ...book, book_name: e.target.value });
                                    }}
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_price">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nhập giá"
                                    type="number"
                                    value={(book.price).toString()}
                                    onChange={(e) => {
                                        setBook({ ...book, price: parseInt(e.target.value) });
                                    }}
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_quantity">
                                <div className="d-flex justify-content-between">
                                    <div className="col-6 p-0">
                                        <Form.Label>Số lượng</Form.Label>
                                        <p className="form-control bg-light">{parseInt(book.quantity || 0) + parseInt(book.amount)}</p>
                                    </div>

                                    <div className="col-5 p-0">
                                        <Form.Label>Thêm/Giảm</Form.Label>
                                        <Form.Control className="form-control bg-light" placeholder="Nhập số lượng"
                                            type="number"
                                            value={(book.amount || 0).toString()}
                                            onChange={(e) => {
                                                setBook({ ...book, amount: parseInt(e.target.value) });
                                            }}
                                            min={-parseInt(book.quantity)}
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" rows={3} className="form-control bg-light"
                                    value={book.description}
                                    onChange={(e) => {
                                        setBook({ ...book, description: e.target.value });
                                    }}
                                    placeholder="Mô tả"
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_authors">
                                <Form.Label>Chọn tác giả</Form.Label>
                                <div className="d-flex flex-wrap">
                                    <Filter
                                        options={authorOptions}
                                        placeholder={`Chọn tác giả`}
                                        className="mb-3"
                                        onChange={addAuthor}
                                        lastOption={"Thêm mới tác giả"}
                                        onLastOption={handleGoToAddAuthor}
                                    />

                                    <Form.Label className="w-100" style={{ display: "block" }}>Danh sách tác giả:</Form.Label>
                                    {
                                        authors
                                            ?
                                            authors.length > 0
                                                ?
                                                authors.map((item, index) => {
                                                    return (
                                                        <p key={index} className="form-control mx-2 bg-light col-6" style={{ position: "relative" }}>
                                                            {item.author_name}
                                                            <i className="fas fa-times"
                                                                style={{ color: "#888", position: "absolute", right: "1rem", top: "12px", cursor: "pointer" }}
                                                                title="Xóa"
                                                                onClick={() => { deleteAuthor(item.author_id) }}
                                                            ></i>
                                                        </p>
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
                                <Form.Control className="form-control bg-light" placeholder="Nhập năm xuất bản"
                                    type="number"
                                    value={(book.publish_year || 0).toString()}
                                    onChange={(e) => {
                                        setBook({ ...book, publish_year: parseInt(e.target.value) });
                                    }}
                                    min={0}
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_discount">
                                <Form.Label>Khuyễn mãi(%)</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nhập %"
                                    type="number"
                                    value={discount}
                                    onChange={(e) => {
                                        setDiscount(parseFloat(e.target.value))
                                        setBook({ ...book, discount: parseFloat(e.target.value) / 100 });
                                    }}
                                    min={0}
                                    max={100}
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_categories">
                                <Form.Label>Chọn thể loại</Form.Label>
                                <div className="d-flex flex-wrap">
                                    <Filter
                                        options={categoryOptions}
                                        placeholder={`Chọn thể loại`}
                                        className="mb-3"
                                        onChange={addCategory}
                                        lastOption={"Thêm mới thể loại"}
                                        onLastOption={handleGoToAddCategory}
                                    />

                                    <Form.Label className="w-100" style={{ display: "block" }}>Danh sách thể loại:</Form.Label>
                                    {
                                        categories
                                            ?
                                            categories.length > 0
                                                ?
                                                categories.map((item, index) => {
                                                    return (
                                                        <p key={index} className="form-control mx-2 bg-light col-6 position-relative">
                                                            {item.category_name}
                                                            <i
                                                                className="fas fa-times"
                                                                style={{ color: "#888", position: "absolute", right: "1rem", top: "12px", cursor: "pointer" }}
                                                                title="Xóa"
                                                                onClick={() => {
                                                                    deleteCategory(item.category_id);
                                                                }}
                                                            ></i>
                                                        </p>
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

export default BookUpdate;