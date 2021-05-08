import React from 'react';
import LoginComponent from '../components/LoginComponent';

function LoginContainer(props) {
    return (
        <>
            <LoginComponent {...props} />
        </>
    );
}


export default LoginContainer;