import React from 'react';
import Layout from '../../components/commons/Layout';
import HomeContainer from '../../containers/HomeContainer';
import { AuthProvider, ProtectRoute } from "../../contexts/UserContext";

function HomePage(props) {
    return (
        <>
            <AuthProvider>
                <ProtectRoute>
                    <Layout>
                        <HomeContainer {...props} />
                    </Layout>
                </ProtectRoute>
            </AuthProvider>
        </>
    )
}

export default HomePage;