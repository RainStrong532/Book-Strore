import React from 'react';

function Header() {
    return (
        <>
            <header id="header">
                <div className="inner">
                    <a href="index.html" className="logo">
                        <span className="fa fa-book"></span> <span className="title">Book Online Store Website</span>
                    </a>
                    <nav>
                        <ul>
                            <li><a href="#menu">Menu</a></li>
                        </ul>
                    </nav>

                </div>
            </header>

            <nav id="menu">
						<h2>Menu</h2>
						<ul>
							<li><a href="index.html" className="active">Home</a></li>

							<li><a href="products.html">Products</a></li>

							<li><a href="checkout.html">Checkout</a></li>

							<li>
								<a href="#" className="dropdown-toggle">About</a>

								<ul>
									<li><a href="about.html">About Us</a></li>
									<li><a href="blog.html">Blog</a></li>
									<li><a href="testimonials.html">Testimonials</a></li>
									<li><a href="terms.html">Terms</a></li>
								</ul>
							</li>

							<li><a href="contact.html">Contact Us</a></li>
						</ul>
					</nav>
        </>
    )
}

export default Header;