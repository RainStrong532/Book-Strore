import React/*, { useEffect }*/ from 'react';
import Main from '../components/commons/Main';
import HomeComponent from '../components/HomeComponent.js';

function HomeContainer(props) {
    return (
        <>
            <Main />
            <HomeComponent/>
        </>
    );
}

export default HomeContainer;
