import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import BookDetail from '../../containers/BookDetail'


function AdminWelcome() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <BookDetail/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default AdminWelcome;