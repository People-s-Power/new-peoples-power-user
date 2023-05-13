import { apolloStrapi } from "apollo";
import { GET_STRAPI_ABOUT } from "apollo/queries/strapiQuery";
import FrontLayout from "layout/FrontLayout";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Strapi_About } from "types/Applicant.types";

interface IProps {
	about: Strapi_About;
}
const AboutPage: NextPage<IProps> = ({ about }: IProps): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>About</title>
			</Head>
					<FrontLayout showFooter={false}>

				<div className="about-wrap">
					<div className="who-we-are py-5">
						<div className="container _who-we-are mb-4">
							<h1 className="text-secondary  fs-1 fw-bold">Who we are</h1>

							{/* <iframe  width="100%" height="900" src="https://docs.google.com/document/d/e/2PACX-1vRx89kPjOl5zLjSUopJKxZocFUoVbBS1DwOhUSC_Hu1lPTZkU1lYUt3MFp8AVyX-PqzIvlsYEk4l-pY/pub?embedded=true"></iframe> */}

							THE PLAINT is a web-based technology that converts citizens’ complaints into a petition and campaign which wins. When citizens are not happy with government policies, and other social challenges which amongst others include Health, Politics, Environment, Development, Government policies, Employment, Criminal Justice and Human Right, they voice out their challenges either through a post or petition and make their complaints to the attention of other citizens and organizations with similar interests to TAKE ACTION and cause a change. With the Citizens’ support, the complaint is petitioned to the appropriate persons, organizations and authorities who will resolve it.
							<br />
							<br />
							The platform inspires one, group or organizations to cause a change in their local communities by airing their voices and start a campaign for the change that they want.

							<br />
							<br />
							With thousands of professionals, virtual assistants, journalists, content writers, designers and social skilled workers using this technology, you can now leave the hassle of writing, designing, editing and organizing your campaigns and other administration with a Virtual Assistant. Citizen Plaint handles your campaigns, contents, designs, updates and other administrations while you focus on building strong and physical campaigns with momentum.

							<br />
							<br />
							Citizen Plaint also helps you grow your followers and supporters through active campaigns and digital marketing.

							<br />
							<br />
							…the Citizen’ Voice
						</div>
					</div>
					{/* ---------------------------------------------- */}
					<div className="our-mission d-flex flex-column justify-content-center">
						<div className="container _our-mission">
							<div className="row mb-4 mission-wrap row-cols-1 row-cols-md-3 g-4">
								<div className="col mb-4 mission-card">
									<div className="card _mission-card ">
										<div className="py-3">
											<img
												src="/images/campaign.svg"
												alt=""
												className="rounded-pill mx-auto d-block"
												width="190"
												height="190"
											/>
										</div>
										<div className="card-body  mission-title">
											<p className="card-title _mission-title text-center text-warning fs-4 fw-bold">
												We Inspire
											</p>
											<p className="card-text text-center ">
												We inspire people to cause a change in their local
												communities by influencing policy makers.
											</p>
										</div>
									</div>
								</div>
								<div className="col mb-4 mission-card">
									<div className="card _mission-card ">
										<div className=" py-3">
											<img
												src="/images/rehabilitate.svg"
												alt=""
												className="rounded-pill mx-auto d-block"
												width="190"
												height="190"
											/>
										</div>
										<div className="card-body  mission-title">
											<p className="card-title _mission-title text-center text-warning fs-4 fw-bold">
												We Campaign
											</p>
											<p className="card-text text-center ">
												We encourage one or group to launch a campaign for the
												change they want be it Social policy, Government
												policies, Environment, Empowerment, Health, Criminal
												justice and of course Human Right.
											</p>
										</div>
									</div>
								</div>
								<div className="col mb-4 mission-card">
									<div className="card _mission-card ">
										<div className="py-3">
											<img
												src="/images/educate.svg"
												alt=""
												className="rounded-pill mx-auto d-block"
												width="190"
												height="190"
											/>
										</div>
										<div className="card-body  mission-title">
											<p className="card-title _mission-title text-center text-warning fs-4 fw-bold">
												We Advocate
											</p>
											<p className="card-text text-center ">
												With our Human Right gladiators we defend people whose
												fundamental rights have been infringed.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="our-vision py-5">
						<div className="_our-vision container">
							<div
								className="vision-goal mb-5 flex-column flex-sm-row align-items-sm-center text-white d-flex"
								style={{ gap: "1rem" }}
							>
								<div className="vision bg-secondary rounded-3 py-5  text-justify ">
									<div className="container">
										<h3 className=" text-center fw-bold  mb-3 ">Our Vision</h3>
										<p className=" text-center">{about?.vision}</p>
									</div>
								</div>
								<div className="goal bg-secondary rounded-3 py-5">
									<div className="container">
										<h3 className=" fw-bold text-center mb-3">Our Goal</h3>
										<p className=" text-center">{about?.goal}</p>
									</div>
								</div>
							</div>
							<div className="what-we-do d-flex flex-column flex-sm-row  mb-5 ">
								<div>
									<div className="what-we-do-txt bg-light h-100 d-flex align-items-center px-4 py-1">
										<div className="">
											<h3 className="mb-5 text-secondary fw-bold">
												WHY WE DO WHAT WE DO
											</h3>
											<ReactMarkdown className="lh-lg">
												{about?.what_we_do}
											</ReactMarkdown>
										</div>
									</div>
								</div>
								<img
									src={about?.what_we_do_image?.url}
									alt=""
									className="what-we-do-img"
								/>
							</div>
						</div>
					</div> */}



					<section id="career" className="mb-8 mt-20">
						<div className="what-we-do-txt bg-light h-100 px-4 py-3 my-2 lg:mx-32">
							<div className=" text-secondary fw-bold text-4xl my-2">Join our team</div>
							<div className="text-base">If you’re passionate and ready to dive in, we’d love to meet you.</div>
						</div>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Content Writer
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as content writer.
										</h4>
										<p className="mb-4">
											Our virtual assistants (journalists, content writers, designers and social skilled workers) handles the hassle of writing, designing, editing and organizing campaigns and other administrations for the different service providers and other users on a remuneration while allowing the organization to focus on other physical activities that will grow their company.

											As a virtual Assistant, you are also to help organizations grow their followers and supporters through active campaigns and digital marketing.
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Journalist
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as Journalist.
										</h4>
										<p className="mb-4">
											Our virtual assistants (journalists, content writers, designers and social skilled workers) handles the hassle of writing, designing, editing and organizing campaigns and other administrations for the different service providers and other users on a remuneration while allowing the organization to focus on other physical activities that will grow their company.

											As a virtual Assistant, you are also to help organizations grow their followers and supporters through active campaigns and digital marketing.
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Designer
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as Designer.
										</h4>
										<p className="mb-4">
											Our virtual assistants (journalists, content writers, designers and social skilled workers) handles the hassle of writing, designing, editing and organizing campaigns and other administrations for the different service providers and other users on a remuneration while allowing the organization to focus on other physical activities that will grow their company.

											As a virtual Assistant, you are also to help organizations grow their followers and supporters through active campaigns and digital marketing.
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										News Editor
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as News Editor.
										</h4>
										<p className="mb-4">
											Our virtual assistants (journalists, content writers, designers and social skilled workers) handles the hassle of writing, designing, editing and organizing campaigns and other administrations for the different service providers and other users on a remuneration while allowing the organization to focus on other physical activities that will grow their company.

											As a virtual Assistant, you are also to help organizations grow their followers and supporters through active campaigns and digital marketing.
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Rep
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as a Rep.
										</h4>
										<p className="mb-4">
											Our virtual assistants (journalists, content writers, designers and social skilled workers) handles the hassle of writing, designing, editing and organizing campaigns and other administrations for the different service providers and other users on a remuneration while allowing the organization to focus on other physical activities that will grow their company.

											As a virtual Assistant, you are also to help organizations grow their followers and supporters through active campaigns and digital marketing.
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Rights Advocate
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as a Rights Advocate.
										</h4>
										<p className="mb-4">
											lorem
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Lawyers
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as a Lawyers.
										</h4>
										<p className="mb-4">
											lorem
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
						<details className="mb-3 lg:w-1/2 mx-auto">
							<summary className="header summary bg-light rounded-top rounded-0 rounded-3 py-2 align-items-center px-1 d-flex justify-content-between">
								<div>
									<p className="text-secondary fw-bold mb-1 p-0 fs-5">
										Volunteers
									</p>
								</div>
								<i className="fas fa-chevron-down fa-rotate-180 me-1 fa-2x text-secondary"></i>
							</summary>
							<div className="content-body animate__animated animate__fadeIn bg-white rounded-bottom py-2">
								<div className="container">
									<div className="w-75">
										<h4 className="mb-3 p-0 text-muted fw-bold">
											Apply to work with us as a Volunteer.
										</h4>
										<p className="mb-4">
											Our virtual assistants (journalists, content writers, designers and social skilled workers) handles the hassle of writing, designing, editing and organizing campaigns and other administrations for the different service providers and other users on a remuneration while allowing the organization to focus on other physical activities that will grow their company.

											As a virtual Assistant, you are also to help organizations grow their followers and supporters through active campaigns and digital marketing.
										</p>
										<a href="https://teamapp-6jfl6.ondigitalocean.app/" target="_blank">
											<button className="btn btn-warning text-white px-4 py-2 rounded-pill fw-bold">
												Apply Now
											</button>
										</a>
									</div>
								</div>
							</div>
						</details>
					</section>

					{/* ------------------------------  */}
					{/* <div className="last-layer py-5">
						<div className="container _last-layer">
							<img
								src="/images/begging-bridge-with-person-who-handed-bread_1150-22948.png"
								alt=""
								className="d-block w-100 mb-5"
								style={{ transform: "translateY(-20%)" }}
							/>
							<div className="bottom-card py-4 d-flex justify-content-center">
								<div className="_bottom-card">
									<div className="position-relative mb-3 img mx-auto rounded-circle">
										<img
											src="/images/Rectangle.png"
											alt=""
											className=" position-absolute"
										/>
									</div>
									<p className="text-center mb-3">
										“every criminal career began with a loss of self-respect.
										When man could no longer trust himself, only then did he
										become a real threat to the society”
									</p>
									<blockquote className="text-center fs-5 text-warning fw-bold">
										- L. Ron Hubbard
									</blockquote>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</FrontLayout>
		</Fragment>
	);
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_ABOUT,
		});
		const about = data?.about;

		return {
			props: {
				about,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				about: null,
			},
		};
	}
};
