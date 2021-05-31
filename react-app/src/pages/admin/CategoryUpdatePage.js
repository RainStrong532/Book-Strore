import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import UpdateCategory from '../../containers/CategoryUpdate'


function UpdateCategoryPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <UpdateCategory/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default UpdateCategoryPage;