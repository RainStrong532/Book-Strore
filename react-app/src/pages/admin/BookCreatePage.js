import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import BookCreate from '../../containers/BookCreate'


function CreateBookPage() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <BookCreate/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default CreateBookPage;