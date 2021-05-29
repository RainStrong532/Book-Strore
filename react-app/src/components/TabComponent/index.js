import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabLayout from '../commons/TabLayout';
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';
import { useHistory } from 'react-router';

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

    const history = useHistory();

    const handleDetailsBook = (id) => {
        if(Number.isInteger(parseInt(id)))
        history.push(`/admin/managements/books/${id}`)
    }

    const handleUpdateBook = (id) => {
        if(Number.isInteger(parseInt(id)))
        history.push(`/admin/managements/books/update/${id}`)
    }

    const getListBook = async function (data, loading, filter) {
        if(loading !== 1)
        setIsLoading(true);
        try {
            let url = new URL(urls.BOOK_URL);
            if(filter && filter.id != -1){
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
            if (res.success == 1) {
                setListBook(res);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        if(loading !== 1)
        setIsLoading(false);
    }

    const getListAuthors = async function (data, loading) {
        if(loading !== 1)
        setIsLoading(true);
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
            if (res.success == 1) {
                setListAuthor(res);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        if(loading !== 1)
        setIsLoading(false);
    }

    const getListCategories = async function (data, loading) {
        if(loading !== 1)
        setIsLoading(true);
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
            if (res.success == 1) {
                setListCategory(res);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        if(loading !== 1)
        setIsLoading(false);
    }

    useEffect(() => {  
        getListBook();
        getListAuthors();
        getListCategories();
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
                    />
                </Tab>

                <Tab eventKey="categories" title="Thể loại">
                    <TabLayout
                        fields={categoryFields}
                        data={listCategory}
                        getData={getListCategories}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                    />
                </Tab>

                <Tab eventKey="authors" title="Tác giả">
                    <TabLayout
                        fields={authorFields}
                        data={listAuthor}
                        getData={getListAuthors}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                    />
                </Tab>
            </Tabs>
        </>
    );
}