import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';

function Footer() {
	const auth = useAuth();
	const history = useHistory();
	const goToBoxChat = () => {
		history.push(`/chats/conversation/${auth.user.account_id}`);
	}
	return (
		<>
			<footer id="footer">
				<div className="inner">
					<section className="section">
						<ul className="ul">
							<li><Link to="/" style={{ color: "#585858" }}>Trang chủ</Link></li>
							<li><Link to="/about" style={{ color: "#585858" }}>Về chúng tôi</Link></li>
							<li><Link to="/products" style={{ color: "#585858" }}>Sản phẩm</Link></li>
							{/* <li><Link to="/products">Sản phẩm</Link></li> */}
						</ul>
					</section>
					<section className="section">
						<h2 className="h2-1">Contact Info</h2>

						<ul className="ul alt">
							<li><span className="fa fa-envelope"></span> <a href="/#">contact@company.com</a></li>
							<li><span className="fa fa-phone"></span> +1 333 4040 5566 </li>
							<li><span className="fa fa-map-pin"></span> 212 Barrington Court New York, ABC 10001 United States of America</li>
						</ul>

						<h2 className="h2-1">Follow Us</h2>

						<ul className="ul icons">
							<li><a href="/#" className="icon style2 fa-twitter" title="Twitter"> </a></li>
							<li><a href="/#" className="icon style2 fa-facebook" title="Facebook"> </a></li>
							<li><a href="/#" className="icon style2 fa-instagram" title="Instagram"> </a></li>
							<li><a href="/#" className="icon style2 fa-linkedin" title="Linkedin"> </a></li>
						</ul>
					</section>

					<ul className="ul copyright">
						<li>Copyright © 2020 Company Name </li>
					</ul>
				</div>

				{
					(auth.user && auth.user.roles.length == 1)
						?
						<div title="Nhắn tin với chúng tôi" className="chat-icon position-fixed d-flex justify-content-center align-items-center"
							style={{ bottom: "2rem", right: "2rem", width: "4rem", height: "4rem", borderRadius: "50%", backgroundColor: "#FFF", boxShadow: "1px 1px 4px #999", cursor: "pointer", zIndex:"9999"}}
							onClick={goToBoxChat}
							>
							<i className="fas fa-comment-dots" style={{ color: "#339af0", fontSize: "1.5rem" }}></i>
						</div>
						:
						<></>
				}
			</footer>
		</>
	)
}

export default Footer;