import React from 'react';
import VerifyContainer from '../../containers/VerifyContainer';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';

function VerifyPage(props) {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <VerifyContainer {...props} />
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default VerifyPage;