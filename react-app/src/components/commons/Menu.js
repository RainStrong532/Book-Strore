import React from 'react';

function Menu() {
    return (
        <>
            <nav id="menu" className="nav"><div className="inner">
                <h2 className="h2-1">Menu</h2>
                <ul className="ul">
                    <li><a href="/" className="active">Home</a></li>

                    <li><a href="/products">Products</a></li>

                    <li><a href="/checkout">Checkout</a></li>

                    <li>
                        <a href="#" className="dropdown-toggle">About</a>

                        <ul className="ul">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/blog">Blog</a></li>
                            <li><a href="/testimonials">Testimonials</a></li>
                            <li><a href="/terms">Terms</a></li>
                        </ul>
                    </li>

                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div><a className="close" href="#menu">Close</a></nav>
        </>
    )
}

export default Menu;