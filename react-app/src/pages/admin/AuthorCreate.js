import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import AuthorCreate from '../../containers/AuthorCreate'


function CreateAuthorPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <AuthorCreate/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default CreateAuthorPage;