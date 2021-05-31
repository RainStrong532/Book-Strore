import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import AuthorDetail from '../../containers/AuthorDetail'


function AuthorDetailPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <AuthorDetail/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default AuthorDetailPage;