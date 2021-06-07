import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabLayout from '../commons/TabLayout';
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';
import { useHistory } from 'react-router';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import Cookies from 'js-cookie'

const bookFields = [
    {
        name: "#",
        key: "id"
    },
    {
        name: "Tên sách",
        key: "book_name",
        sortable: true
    },
    {
        name: "Mô tả",
        key: "description",
        sortable: true
    },
    {
        name: "Năm xuất bản",
        key: "publish_year",
        sortable: true
    },
    {
        name: "Giá",
        key: "price",
        sortable: true
    },
    {
        name: "Số lượng",
        key: "quantity",
        sortable: true
    }];

const authorFields = [
    {
        name: "#",
        key: "id"
    },
    {
        name: "Tên tác giả",
        key: "author_name",
        sortable: true
    },
    {
        name: "Mô tả",
        key: "description",
        sortable: true
    }
];

const categoryFields = [
    {
        name: "#",
        key: "id"
    },
    {
        name: "Tên thể loại",
        key: "category_name",
        sortable: true
    },
    {
        name: "Mô tả",
        key: "description",
        sortable: true
    }
];

export default function ControlledTabs() {
    const [key, setKey] = useState('books');
    const [listBook, setListBook] = useState({ total: 0, data: [] });
    const [listCategory, setListCategory] = useState({ total: 0, data: [] });
    const [listAuthor, setListAuthor] = useState({ total: 0, data: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState(null);
    const [filter, setFilter] = useState(null);

    const [ready, setReady] = useState(false);


    const toggleDelete = () => {
        setModal(!modal);
    }

    const onDelete = (data) => {
        setItem({ ...item, ...data });
        console.log("data:", data, item);
        toggleDelete();
    }

    const deleleItem = async () => {
        console.log(item, "item");
        for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
                console.log("key: ", key);
                if (key === 'book_id') {
                    deleteBook();
                    break;
                } else if (key === 'author_id') {
                    deleteAuthor();
                    break;
                } else if (key === 'category_id') {
                    deleteCategory();
                    break;
                }
            }
        }
    }

    const deleteCategory = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('DELETE', `${urls.CATEGORY_URL}/${item.category_id}`, null, token);
            if (res.success===0) {
                alert(res.message);
            } else {
                let categories = listCategory.data;
                categories = categories.filter(category => category.category_id !== item.category_id);
                setListCategory({...listCategory, data: [...categories]});
                alert("Xóa thể loại thành công");
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const deleteAuthor = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('DELETE', `${urls.AUTHOR_URL}/${item.author_id}`, null, token);
            if (res.success===0) {
                alert(res.message);
            } else {
                let authors = listAuthor.data;
                authors = authors.filter(author => author.author_id !== item.author_id);
                setListAuthor({...listAuthor, data: [...authors]});
                alert("Xóa tác giả thành công");
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const deleteBook = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('DELETE', `${urls.BOOK_URL}/${item.book_id}`, null, token);
            if (res.success===0) {
                alert(res.message);
            } else {
                let books = listBook.data;
                books = books.filter(book => book.book_id !== item.book_id);
                setListBook({...listBook, data: [...books]});
                alert("Xóa sách thành công");
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const history = useHistory();

    const handleDetailsBook = (id) => {
        if (Number.isInteger(parseInt(id)))
            history.push(`/admin/managements/books/${id}`)
    }

    const handleDetailsCategory = (id) => {
        if (Number.isInteger(parseInt(id)))
            history.push(`/admin/managements/books/categories/${id}`)
    }

    const handleDetailsAuthor = (id) => {
        if (Number.isInteger(parseInt(id)))
            history.push(`/admin/managements/books/authors/${id}`)
    }

    const handleUpdateBook = (id) => {
        if (Number.isInteger(parseInt(id)))
            history.push(`/admin/managements/books/update/${id}`)
    }

    const handleUpdateCategory = (id) => {
        if (Number.isInteger(parseInt(id)))
            history.push(`/admin/managements/books/categories/update/${id}`)
    }

    const handleUpdateAuthors = (id) => {
        if (Number.isInteger(parseInt(id)))
            history.push(`/admin/managements/books/authors/update/${id}`)
    }

    const getListBook = async function (data, loading) {
        if (loading !== 1){
            setIsLoading(true);
        }
        try {
            let url = new URL(urls.BOOK_URL);
            if (filter && filter.id !== -1) {
                url = new URL(`${urls.BOOK_URL}/${filter.name}/${filter.id}`);
            }
            if (data) {
                for (const key in data) {
                    if (data[key]) {
                        url.searchParams.set(key, data[key]);
                    }
                }
            }
            const res = await fetchApi('GET', url);
            if (res.success===1) {
                setListBook(res);
                setReady(true);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        if (loading !== 1){
            setIsLoading(false);
        }
    }

    const getListAuthors = async function (data, loading) {
        if (loading !== 1){
            setIsLoading(true);
        }
        try {
            const url = new URL(urls.AUTHOR_URL);
            if (data) {
                for (const key in data) {
                    if (data[key]) {
                        url.searchParams.set(key, data[key]);
                    }
                }
            }
            const res = await fetchApi('GET', url);
            if (res.success===1) {
                setListAuthor(res);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        if (loading !== 1){
            setIsLoading(false);
        }
    }

    const getListCategories = async function (data, loading) {
        if (loading !== 1){
            setIsLoading(true);
        }
        try {
            const url = new URL(urls.CATEGORY_URL);
            if (data) {
                for (const key in data) {
                    if (data[key]) {
                        url.searchParams.set(key, data[key]);
                    }
                }
            }
            const res = await fetchApi('GET', url);
            if (res.success===1) {
                setListCategory(res);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        if (loading !== 1){
            setIsLoading(false);
        }
    }

    useEffect(() => {  
        getListAuthors(null, 1);
        getListCategories(null, 1);
        getListBook();
    }, [])

    return (
        <>
            {
                isLoading && <LoadingComponent />
            }
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 d-flex"
            >
                <Tab eventKey="books" title="Sách">
                    <TabLayout
                        fields={bookFields}
                        data={listBook}
                        getData={getListBook}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        listFilters={[listCategory.data, listAuthor.data]}
                        ids={["categories", "authors"]}
                        placeholders={["Chọn thể loại", "Chọn tác giả"]}
                        handleDetails={handleDetailsBook}
                        handleUpdate={handleUpdateBook}
                        onAddButton={() => history.push("/admin/managements/books/add")}
                        onDelete={onDelete}
                        ready={ready}
                        filter={filter}
                        setFilter={setFilter}
                    />
                </Tab>

                <Tab eventKey="categories" title="Thể loại">
                    <TabLayout
                        fields={categoryFields}
                        data={listCategory}
                        getData={getListCategories}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        onDelete={onDelete}
                        onAddButton={() => history.push("/admin/managements/books/categories/add")}
                        handleDetails={handleDetailsCategory}
                        handleUpdate={handleUpdateCategory}
                        ready={ready}
                    />
                </Tab>

                <Tab eventKey="authors" title="Tác giả">
                    <TabLayout
                        fields={authorFields}
                        data={listAuthor}
                        getData={getListAuthors}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        onDelete={onDelete}
                        onAddButton={() => history.push("/admin/managements/books/authors/add")}
                        handleDetails={handleDetailsAuthor}
                        handleUpdate={handleUpdateAuthors}
                        ready={ready}
                    />
                </Tab>
            </Tabs>

            <Modal isOpen={modal} toggle={toggleDelete} centered={true}>
                <ModalHeader toggle={toggleDelete}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        deleleItem();
                        toggleDelete();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}