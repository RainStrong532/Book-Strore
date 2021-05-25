import React from 'react';
import ProfileContainer from '../../containers/ProfileContainer';
import { AuthProvider, ProtectRoute } from "../../contexts/UserContext";
import Layout from '../../components/commons/Layout';

function ProfilePage(props) {
    return (
        <>
            <AuthProvider>
                <ProtectRoute>
                    <Layout>
                        <ProfileContainer {...props}/>
                    </Layout>
                </ProtectRoute>
            </AuthProvider>
        </>
    )
}

export default ProfilePage;