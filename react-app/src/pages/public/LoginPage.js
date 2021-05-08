import React from 'react';
import LoginContainer from '../../containers/LoginContainer';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from "../../contexts/UserContext";

function LoginPage(props) {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <LoginContainer {...props} />
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default LoginPage;