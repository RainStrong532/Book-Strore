import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import AuthorUpdate from '../../containers/AuthorUpdate'


function UpdateAuthorPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <AuthorUpdate/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default UpdateAuthorPage;