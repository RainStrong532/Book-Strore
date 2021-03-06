import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router";
import fetchApi from '../services/fetchApi'
import * as urls from '../services/url';
import LoadingComponent from './commons/LoadingComponent';
import Filter from './commons/Filter'
import ImageHolder from './commons/ImageHolder';
import ImagePicker from './commons/ImagePicker';


function BookCreate({ createBook, saveToLocalStorage }) {
    const history = useHistory();
    const [book, setBook] = useState({
        book_id: -1,
        book_name: "",
        description: "",
        price: 0,
        quantity: 0,
        discount: 0,
        publish_year: 0,
    });
    const [discount, setDiscount] = useState(0);
    const [images, setImages] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [authorOptions, setAuhtorOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const filterOptions = (options, data, fieldCheck) => {
        let ops = [];
        ops = options.filter(item => {
            if (data) {
                if (!item.id || !item.name) return false;
                // eslint-disable-next-line
                let res = data.find(c => c[fieldCheck] == item.id);
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
                alert("Upload ???nh th???t b???i")
            }
        } catch (err) {
            alert(err.message);
        }
        setIsLoading(false);
    }

    const addCategory = (id) => {
        if (id === -1 || !Number.isInteger(parseInt(id))) {
            filterOptions(categoryOptions, categories, 'category_id');
            return;
        }
        if (id < -1) {
            return;
        }
        // eslint-disable-next-line
        let category = categoryOptions.find(c => c.id == id);
        category.category_id = category.id;
        delete category.id;
        category.category_name = category.name;
        delete category.name;
        setCategories([...categories, category]);

        // eslint-disable-next-line
        let options = categoryOptions.filter(a => a.id != id);
        setCategoryOptions([...options]);
        setIsLoading(false);
    }

    const addAuthor = (id) => {
        if (id === -1 || !Number.isInteger(parseInt(id))) {
            filterOptions(authorOptions, authors, 'author_id');
            return;
        }
        if (id < -1) {
            return;
        }
        // eslint-disable-next-line
        let author = authorOptions.find(c => c.id == id);
        author.author_id = author.id;
        delete author.id;
        author.author_name = author.name;
        delete author.name;
        setAuthors([...authors, author]);

        // eslint-disable-next-line
        let options = authorOptions.filter(a => a.id != id);
        setAuhtorOptions([...options]);
    }

    const deleteAuthor = (id) => {
        // eslint-disable-next-line
        let ats = authors.filter(c => c.author_id != id);
        // eslint-disable-next-line
        let author = authors.find(c => c.author_id == id);
        setAuthors([...ats]);
        let options = authorOptions;
        options.push({ id: author.author_id, name: author.author_name })
        setAuhtorOptions(options);
    }

    const deleteCategory = (id) => {
        // eslint-disable-next-line
        let cts = categories.filter(c => c.category_id != id);
        // eslint-disable-next-line
        let category = categories.find(c => c.category_id == id);
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
            if (res.success === 1) {
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
            if (res.success === 1) {
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
        alert("Sau khi th??m m???i hay load l???i trang ????? c???p nh???t");
        const win = window.open("/admin/managements/books/authors/add", "_blank");
        win.focus();
    }

    const handleGoToAddCategory = () => {
        saveToLocalStorage(book, images, authors, categories);
        alert("Sau khi th??m m???i hay load l???i trang ????? c???p nh???t");
        const win = window.open("/admin/managements/books/categories/add", "_blank");
        win.focus();
    }

    const getDataFromLocalStorage = () => {
        const bookData = localStorage.getItem('book');
        const authorsData = localStorage.getItem('authors');
        const categoriesData = localStorage.getItem('categories');
        const imagesData = localStorage.getItem('images');

        setImages(imagesData ? JSON.parse(imagesData) : [...images]);
        setBook(bookData ? JSON.parse(bookData) : { ...book });
        setAuthors(authorsData ? JSON.parse(authorsData) : [...authors]);
        setCategories(categoriesData ? JSON.parse(categoriesData) : [...categories]);
    }

    useEffect(() => {
        getListAuthors();
        getListCategories();

        getDataFromLocalStorage();
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
                        Th??m m???i s??ch
                </p>
                </div>

                <div className="right">
                    <Button
                        variant="success"
                        className="mx-2"
                        title={book.book_name.length > 0 ? "T???o m???i" : "Ph???i c?? t??n s??ch"}
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                            if (createBook) {
                                createBook(book, images, authors, categories);
                            }
                        }}
                        disabled={book.book_name.length === 0}
                    >
                        <i className="fas fa-save mr-2"></i>
                        T???o m???i
                    </Button>
                </div>
            </header>

            <div className="image-section border border-dark border-left-0 border-right-0 border-top-0">
                <p className="title px-4 pt-3"
                    style={{ fontWeight: "bold" }}
                >
                    H??nh ???nh
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
                                <Form.Label>T??n s??ch* {`${book.book_name.length === 0 ? '(Kh??ng ???????c r???ng)' : ''}`}</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nh???p t??n s??ch"
                                    value={book.book_name}
                                    onChange={(e) => {
                                        setBook({ ...book, book_name: e.target.value });
                                    }}
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_price">
                                <Form.Label>Gi??</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nh???p gi??"
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
                                    <div className="col-12 p-0">
                                        <Form.Label>S??? l?????ng</Form.Label>
                                        <Form.Control className="form-control bg-light" placeholder="Nh???p s??? l?????ng"
                                            type="number"
                                            value={book.quantity}
                                            onChange={(e) => {
                                                setBook({ ...book, quantity: e.target.value });
                                            }}
                                            min={0}
                                        />
                                    </div>
                                    {/* <div className="col-6 p-0">
                                        <Form.Label>S??? l?????ng</Form.Label>
                                        <p className="form-control bg-light">{parseInt(book.quantity) + amount}</p>
                                    </div>

                                    <div className="col-5 p-0">
                                        <Form.Label>Th??m/Gi???m</Form.Label>
                                        <Form.Control className="form-control bg-light" placeholder="Nh???p s??? l?????ng"
                                            type="number"
                                            value={(amount || 0).toString()}
                                            onChange={(e) => {
                                                setAmount(parseInt(e.target.value || 0));
                                            }}
                                            min={-parseInt(book.quantity)}
                                        />
                                    </div> */}
                                </div>
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>M?? t???</Form.Label>
                                <Form.Control as="textarea" rows={3} className="form-control bg-light"
                                    value={book.description}
                                    onChange={(e) => {
                                        setBook({ ...book, description: e.target.value });
                                    }}
                                    placeholder="M?? t???"
                                />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3" controlId="book_aauthors">
                                <Form.Label>Ch???n t??c gi???</Form.Label>
                                <div className="d-flex flex-wrap">
                                    <Filter
                                        options={authorOptions}
                                        placeholder={`Ch???n t??c gi???`}
                                        className="mb-3"
                                        onChange={addAuthor}
                                        lastOption={"Th??m m???i t??c gi???"}
                                        onLastOption={handleGoToAddAuthor}
                                    />

                                    <Form.Label className="w-100" style={{ display: "block" }}>Danh s??ch t??c gi???:</Form.Label>
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
                                                                title="X??a"
                                                                onClick={() => { deleteAuthor(item.author_id) }}
                                                            ></i>
                                                        </p>
                                                    )
                                                })
                                                :
                                                <p style={{ fontWeight: "normal" }} className="form-control">Ch??a c?? t??c gi???</p>
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
                                <Form.Label>N??m xu???t b???n</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nh???p n??m xu???t b???n"
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
                                <Form.Label>Khuy???n m??i(%)</Form.Label>
                                <Form.Control className="form-control bg-light" placeholder="Nh???p %"
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
                                <Form.Label>Ch???n th??? lo???i</Form.Label>
                                <div className="d-flex flex-wrap">
                                    <Filter
                                        options={categoryOptions}
                                        placeholder={`Ch???n th??? lo???i`}
                                        className="mb-3"
                                        onChange={addCategory}
                                        lastOption={"Th??m m???i th??? lo???i"}
                                        onLastOption={handleGoToAddCategory}
                                    />

                                    <Form.Label className="w-100" style={{ display: "block" }}>Danh s??ch th??? lo???i:</Form.Label>
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
                                                                title="X??a"
                                                                onClick={() => {
                                                                    deleteCategory(item.category_id);
                                                                }}
                                                            ></i>
                                                        </p>
                                                    )
                                                })
                                                :
                                                <p style={{ fontWeight: "normal" }} className="form-control">Ch??a c?? th??? lo???i</p>
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
        </div>
    )
}

export default BookCreate;