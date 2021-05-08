import React from 'react';
import { AuthProvider, ProtectRoute } from "../../contexts/UserContext";

function PrivatePage() {
    return (
        <>
            <AuthProvider>
                <ProtectRoute>
                    <p>Private route</p>
                </ProtectRoute>
            </AuthProvider>
        </>
    )
}

export default PrivatePage;