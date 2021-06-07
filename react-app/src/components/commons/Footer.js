import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<>
			<footer id="footer">
				<div className="inner">
					<section className="section">
						<ul className="ul">
							<li><Link to="/" style={{    color: "#585858"}}>Trang chủ</Link></li>
							<li><Link to="/about" style={{    color: "#585858"}}>Về chúng tôi</Link></li>
							<li><Link to="/products" style={{    color: "#585858"}}>Sản phẩm</Link></li>
							{/* <li><Link to="/products">Sản phẩm</Link></li> */}
						</ul>
					</section>
					<section className="section">
						<h2 className="h2-1">Contact Info</h2>

						<ul className="ul alt">
							<li><span className="fa fa-envelope"></span> <a href="#">contact@company.com</a></li>
							<li><span className="fa fa-phone"></span> +1 333 4040 5566 </li>
							<li><span className="fa fa-map-pin"></span> 212 Barrington Court New York, ABC 10001 United States of America</li>
						</ul>

						<h2 className="h2-1">Follow Us</h2>

						<ul className="ul icons">
							<li><a href="#" className="icon style2 fa-twitter" title="Twitter"></a></li>
							<li><a href="#" className="icon style2 fa-facebook" title="Facebook"></a></li>
							<li><a href="#" className="icon style2 fa-instagram" title="Instagram"></a></li>
							<li><a href="#" className="icon style2 fa-linkedin" title="Linkedin"></a></li>
						</ul>
					</section>

					<ul className="ul copyright">
						<li>Copyright © 2020 Company Name </li>
					</ul>
				</div>
			</footer>
		</>
	)
}

export default Footer;