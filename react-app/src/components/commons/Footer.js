import React from 'react';

function Footer() {
    return (
        <>
            <footer id="footer">
						<div className="inner">
							<section className=".section">
								<h2 className="h2-1">Contact Us</h2>
								<form method="post" action="#">
									<div className="fields">
										<div className="field half">
											<input className="input" type="text" name="name" id="name" placeholder="Name" />
										</div>

										<div className="field half">
											<input className="input" type="text" name="email" id="email" placeholder="Email" />
										</div>

										<div className="field">
											<input type="text" name="subject" id="subject" placeholder="Subject" />
										</div>

										<div className="field">
											<textarea className="input" name="message" id="message" rows="3" placeholder="Notes"></textarea>
										</div>

										<div className="field text-right">
											<label>&nbsp;</label>

											<ul className="actions .ul">
												<li><input className="input primary" type="submit" value="Send Message"/></li>
											</ul>
										</div>
									</div>
								</form>
							</section>
							<section className=".section">
								<h2 className="h2-1">Contact Info</h2>

								<ul className="ul alt">
									<li><span className="fa fa-envelope-o"></span> <a href="#">contact@company.com</a></li>
									<li><span className="fa fa-phone"></span> +1 333 4040 5566 </li>
									<li><span className="fa fa-map-pin"></span> 212 Barrington Court New York, ABC 10001 United States of America</li>
								</ul>

								<h2 className="h2-1">Follow Us</h2>

								<ul className="ul icons">
									<li><a href="#" className="icon style2 fa-twitter"><span className="label">Twitter</span></a></li>
									<li><a href="#" className="icon style2 fa-facebook"><span className="label">Facebook</span></a></li>
									<li><a href="#" className="icon style2 fa-instagram"><span className="label">Instagram</span></a></li>
									<li><a href="#" className="icon style2 fa-linkedin"><span className="label">LinkedIn</span></a></li>
								</ul>
							</section>

							<ul className="ul copyright">
								<li>Copyright © 2020 Company Name </li>
								<li>Template by: <a href="https://www.phpjabbers.com/">PHPJabbers.com</a></li>
							</ul>
						</div>
					</footer>
        </>
    )
}

export default Footer;