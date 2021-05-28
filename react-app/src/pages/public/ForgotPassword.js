import React from 'react';
import ForgotPasswordContainer from '../../containers/ForgotPasswordContainer';
import Layout from '../../components/commons/Layout';

function ForgotPassword(props) {
    return (
        <Layout>
            <ForgotPasswordContainer {...props} />
        </Layout>
    )
}

export default ForgotPassword;