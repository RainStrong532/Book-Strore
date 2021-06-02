import React from 'react';
import { AuthProvider, ProtectRoute } from "../../contexts/UserContext";
import ChatContainer from '../../containers/ChatContainer'
import Layout from '../../components/commons/Layout';

function PrivatePage() {
    return (
        <>
            <AuthProvider>
                <ProtectRoute>
                    <Layout>
                        <ChatContainer />
                    </Layout>
                </ProtectRoute>
            </AuthProvider>
        </>
    )
}

export default PrivatePage;