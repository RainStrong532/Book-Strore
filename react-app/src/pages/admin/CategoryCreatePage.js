import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import CategoryCreate from '../../containers/CategoryCreate'


function CreateCategoryPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <CategoryCreate/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default CreateCategoryPage;