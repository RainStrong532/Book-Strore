import React, { useEffect, useState } from 'react';
import LoadingComponent from '../components/commons/LoadingComponent';
import Main from '../components/commons/Main';
import HomeComponent from '../components/HomeComponent.js';
import fetchApi from '../services/fetchApi';
import * as urls from '../services/url';

function HomeContainer() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListBook = async () => {
        setLoading(true);
        try {
            const url = new URL(urls.BOOK_URL);
            url.searchParams.set('page_size', 6);
            url.searchParams.set('order_by', 'book_name');

            const res = await fetchApi('GET', url);
            if (res.success === 1) {
                setBooks([...res.data]);
            }
        } catch (err) {
            alert(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getListBook();
    }, [])
    return (
        <>
            {loading && <LoadingComponent />}
            <Main />
            <HomeComponent books={books} />
        </>
    );
}

export default HomeContainer;
