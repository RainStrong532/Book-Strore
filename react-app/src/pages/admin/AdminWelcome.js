import React from 'react';
import Layout from '../../components/commons/Layout';
import { AuthProvider, ProtectRoute } from '../../contexts/UserContext';

function AdminWelcome() {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Layout>
                    <div className="container" style={{ height: "100vh" }}>
                        <h1 className="text-center mt-5" style={{ fontWeight: "bold" }}>Trang admin</h1>
                    </div>
                </Layout>
            </ProtectRoute>
        </AuthProvider>
    )
}

export default AdminWelcome;