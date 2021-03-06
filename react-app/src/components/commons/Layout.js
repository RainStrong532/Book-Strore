import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Menu from './Menu';

function Layout({ children }) {
    return (
        <>
            <div id="wrapper" style={{background: "#eee"}}>
                <Header/>
                {
                    children
                }
                <Footer />
            </div>
            <Menu />
        </>
    )
}

export default Layout;