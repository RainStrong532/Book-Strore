import React from 'react';
import ChangePassword from '../../containers/ChangePassword';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';

function ChangePasswordPage(props) {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <ChangePassword {...props} />
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default ChangePasswordPage;