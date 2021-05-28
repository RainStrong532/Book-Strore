import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';
import HomeContainer from '../../containers/AdminHome'


function AdminWelcome() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <HomeContainer/>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default AdminWelcome;