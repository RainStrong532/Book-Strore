import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TabLayout from '../commons/TabLayout';
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import LoadingComponent from '../commons/LoadingComponent';

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
        name: "Tên chủ đề",
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
    const [listBook, setListBook] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listAuthor, setListAuthor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getListBook = async function () {
        setIsLoading(true);
        try {
            const res = await fetchApi('GET', urls.BOOK_URL);
            if (res.success == 1) {
                setListBook(res.data);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
        setIsLoading(false);
    }

    const getListAuthors = async function () {
        setIsLoading(true);
        try {
            const res = await fetchApi('GET', urls.AUTHOR_URL);
            if (res.success == 1) {
                setListAuthor(res.data);
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
            const res = await fetchApi('GET', urls.CATEGORY_URL);
            if (res.success == 1) {
                setListCategory(res.data);
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert(err.message)
        }
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
                    />
                </Tab>

                <Tab eventKey="categories" title="Chủ đề">
                    <TabLayout
                        fields={categoryFields}
                        data={listCategory}
                    />
                </Tab>

                <Tab eventKey="authors" title="Tác giả">
                    <TabLayout
                        fields={authorFields}
                        data={listAuthor}
                    />
                </Tab>
            </Tabs>
        </>
    );
}