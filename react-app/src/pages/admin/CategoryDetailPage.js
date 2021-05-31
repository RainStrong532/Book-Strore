import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import CategoryDetail from '../../containers/CategoryDetail'


function CategoryDetailPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <CategoryDetail/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default CategoryDetailPage;