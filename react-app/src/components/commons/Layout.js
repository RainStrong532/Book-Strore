import React from 'react';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

function Layout({ children }) {
    return (
        <>
        <div id="wrapper">
            <Header />
            <Main />
            {
                children
            }
            <Footer/>
        </div>
        <Menu/>
        </>
    )
}

export default Layout;