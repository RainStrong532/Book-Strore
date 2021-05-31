import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import UpdateBook from '../../containers/UpdateBook'


function UpdateBookPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <UpdateBook/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default UpdateBookPage;