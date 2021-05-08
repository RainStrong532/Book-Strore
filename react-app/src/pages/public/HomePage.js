import React from 'react';
import Layout from '../../components/commons/Layout';
import HomeContainer from '../../containers/HomeContainer';

function HomePage(props) {
    return (
        <>
            <Layout>
                <HomeContainer {...props} />
            </Layout>
        </>
    )
}

export default HomePage;