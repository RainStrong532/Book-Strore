import React, { useState } from 'react';
import LoadingComponent from '../components/commons/LoadingComponent';
import ProfileComponent from '../components/ProfileComponent';

function ProfileContainer(props) {
    const [loading, setLoading] = useState(false);
    return (
        <>
            {
                loading && <LoadingComponent/>
            }
            <ProfileComponent {...props} loading={loading} setLoading={setLoading}/>
        </>
    );
}


export default ProfileContainer;