import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import LoadingComponent from '../components/commons/LoadingComponent';
import Main from '../components/commons/Main';

function HomeContainer(props) {
    return (
        <>
            {
                props.user.isFetching
                    ?
                    <LoadingComponent />
                    :
                    <></>

            }
            <Main />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
