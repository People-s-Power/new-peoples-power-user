import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
const { publicRuntimeConfig } = getConfig();

const Footer = (): JSX.Element => {
	return (
		<footer className="footer text-xs">
			<Wrapper>
				<div className=" mb-4 inner _footer">
					<section className="socials d-flex justify-content-center mb-4 py-3 ">
						<div className="_socials d-flex justify-content-between">
							<a
								href={`https://web.facebook.com/peoplespow`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-facebook"></i>
							</a>
							<a
								href={`https://twitter.com/evans_dule`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-twitter"></i>
							</a>

							<a
								href={`https://www.linkedin.com/company/82634752/`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-linkedin"></i>
							</a>
						</div>
					</section>

					<section className="d-flex justify-between mb-4 footer-list container mt-5">
						<div className="w-20">
							<img src="./images/logo1.jpg" className="rounded-full" alt="" />
						</div>
						<ul className="lg:w-2/3 ">
							{/* <li className="mb-4 fs-4 fw-bold">About us</li> */}
							<li className="text-[#666666]">
								EXPERTHUB is a web-based technology and innovative platform that provides a space for individuals to voice their personal or social issues and connect with experts who can offer relevant solutions. The platform creates a forum where people can freely discuss their concerns and feel heard.
								One of the main benefits of EXPERTHUB is that it is open to anyone, regardless of their geographical location or financial background This means that even those who lack easy access to professional help or...<br />
								<Link href="/about">
									<a className="text-center text-warning">Learn More</a>
								</Link>
							</li>
						</ul>
						{/* <div className="d-flex footer-list_links"> */}
						<ul className="lg:w-80">
							<li className="mb-4 fs-4 fw-bold">Quick Links </li>
							<li className="nav-item ">
								<Link href="/terms">
									<a className="nav-link">Terms and conditions</a>
								</Link>
							</li>
							<li className="nav-item ">
								<Link href="/privacy">
									<a className="nav-link">Privacy Policy</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="https://portal.edfhr.org">
									<a className="nav-link">ED Foundation</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/reps">
									<a className="nav-link">Our Team</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href="/about#career">
									<a className="nav-link">Career</a>
								</Link>
							</li>
						</ul>

						<ul className="lg:w-80">
							<li className="fs-4 mb-4 fw-bold ">Contact info</li>
							<li className=" ">
								<i className="fas fa-history"></i> Monday to Friday 24hours
							</li>
							{/* <li className=" ">
									<i className="fas fa-envelope"></i> support@edfhr.org
								</li>
								<li className="  ">
									<i className="fas fa-phone-alt"></i> +234810 763 9372
								</li>
								<li className=" ">
									<i className="fas fa-map-marker-alt"></i>163A Okporo Rd,
									Rumuodara 500102, Port Harcourt
								</li> */}
							{/* <Link href="/contact">
								<button className="btn btn-warning px-4 fw-bold my-3 text-light rounded-pill">
									Get in Touch
									<i className="fas fa-long-arrow-alt-right ms-2"></i>
								</button>
							</Link> */}
						</ul>

						{/* </div> */}
					</section>
					{/* <div className="container">
						<hr className="mb-4" />
						<div className="d-flex justify-content-end mb-2 py-1">
							
						</div>
					</div> */}
				</div>

				<div className="copyright py-4 d-flex flex-wrap text-light justify-content-center">
					<Link href="/terms">
						<a>Terms and condition &nbsp;</a>
					</Link>
					|
					<Link href="/privacy">
						<a>&nbsp;Privacy Policy&nbsp;</a>
					</Link>
					|
					<Link href="/">
						<a>
							&nbsp; &copy;{new Date().getFullYear()} {`EXPERTHUB`}, All rights
							reserved.
						</a>
					</Link>
				</div>
			</Wrapper>
		</footer>
	);
};

export default Footer;

const Wrapper = styled.footer`
	.nav-item {
		margin-bottom: 0;
		.nav-link {
			margin-bottom: 0;
		}
	}
`;
