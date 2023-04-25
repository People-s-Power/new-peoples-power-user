import { apollo } from "apollo"
// import {
// 	getStrapiLawyers,
// 	getStrapiReps,
// 	getStrapiSingleCampaign,
// 	getStrapiTestimonies,
// } from "apollo/actions/strapiAction";
import { GET_CAMPAIGNS } from "apollo/queries/campaignQuery"
// import CampaignBanner from "components/campaign-comp/CampaignBanner";
import CampCard from "components/home/CampCard"
// import LegalReprensentatives from "components/home/Representatives";
import Indexsvg from "components/icon/Indexsvg"
import Slider from "components/Slider"
import TeamSlide from "components/camp-slider/team-slider"
import gql from "graphql-tag"
import FrontLayout from "layout/FrontLayout"
import { NextPage } from "next"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"
import { Zoom } from "react-reveal"
import styled from "styled-components"
import SliderTwo from "react-slick"
import CampaignSlider from "../components/camp-slider/Slider"
import { useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { GET_ACTIVE_PETITION, GET_PETITION } from "apollo/queries/petitionQuery"

import { ICampaign, Strapi_Testimony } from "types/Applicant.types"

const testimonies: Strapi_Testimony[] | null = [
	{
		id: "88uiwhkjhwjknmd",
		author: "Anitha John",
		company: "MJS Berhad",
		job_position: "",
		body: "I am very excited about this platform that can really protect and preserve every individual's humanity and ensure that every citizen can live a life of dignity and a life that is worthy of a human being.",
		image: "anitha.jpg",
	},
	{
		id: "88uiwhkjhwjknmd",
		author: "Roselyn Marshall",
		job_position: "",
		company: "Legal Connect",
		body: "I am sure the common citizen will now have hope. Thanks to the inventor of this wonder tools for social activism. I just can’t wait to have my campaign running and start galvanizing for individual support. With this I can now impact my local community.",
		image: "rosy.jpg",
	},
	{
		id: "88uiwhkjhwjknmd",
		author: "G.B Evans",
		company: "",
		job_position: "",
		body: "What an awesome technology. Big thanks to the CEO and before I die in silence it is high time I start voicing out the political challenges bedeviling my community. The underdevelopment, lack of basic amenities and the high level of criminality. I am pretty sure that with this platform I can win supporters who will join voices with me to campaign against these challenges. Kudos to People Power Technology.",
		image: "john.jpg",
	},
]

const HomePage = () => {
	const [campaigns, setCamp] = useState([])

	useQuery(GET_PETITION, {
		client: apollo,
		onCompleted: (data) => {
			console.log(data)
			setCamp(data.getPetitions)
		},
		onError: (err) => console.log(err),
	})

	const user = useRecoilValue(UserAtom)

	// useEffect(() => {
	// 	if (user !== null) {
	// 		window.location.href = `/`
	// 	}
	// })

	// useQuery(GET_CAMPAIGNS, {
	// 	client: apollo,
	// 	onCompleted: (data) => {
	// 		// setCampaigns(data.myCampaign)
	// 		console.log(data)
	// 	},
	// 	onError: (e) => console.log(e),
	// });

	return (
		<FrontLayout>
			<Wrapper>
				<section className="index">
					<div className="container m-c _index d-flex py-3 flex-column-reverse flex-md-row align-items-md-center">
						<div className="_index-txt">
							<h1 className="  mb-3">
								The <span className=" fw-700 fs-48">World’s Technology</span> For <span className="fw-700 fs-48">Social</span> Change.{" "}
								{/* <span className="fw-700 fs-48">Criminal</span> &{" "}
								<span className="fw-700 fs-48">Social Injustice</span> */}
							</h1>
							<p className="mb-5 fs-16">
								There are so much to talk about: Social policy, Government decisions, Politics, Environment, Empowerment, Development, Crime, Human Right etc.
							</p>
							<div className="btn-holder d-flex flex-wrap" style={{ gap: "1rem" }}>
								<Link href="/auth?mode=signup">
									<a className="btn btn-warning btn-lg rounded-pill px-4 py-2 text-light font-weight-bolder fs-20 ">Join Now</a>
								</Link>
								<Link href="/about">
									<button className="btn btn-lg border-warning font-weight-bold text-warning py-2 px-4 rounded-pill fs-20">Learn More</button>
								</Link>
							</div>
						</div>
						<div className="lg:block hidden">
							<Zoom>
								<div className="_index-img">
									<Indexsvg />
								</div>
							</Zoom>
						</div>
					</div>
					{/* <ApolloProvider client={apollo}> */}
					<div className="w-[90%] mx-auto">
						<CampaignSlider />
					</div>
					{/* </ApolloProvider> */}

					{/* {campaigns.some((c) => c.promoted) && (
					<section className="running-camp mb-5">
						<p
							className="container fw-500 fs-18 mb-3 fs-2 "
							style={{ color: "#00401C" }}
						>
							Promoted Campaigns
						</p>
						<div className="py-2">
							<SliderTwo  {...settings}>
								{campaigns
									?.filter((c) => c.promoted)
									?.map((camp, i) => (
										<div className="mx-3">
											<img
												src={camp?.image}
												alt=""
												key={i}
												width="90%"
											/>
										</div>
									))}
							</SliderTwo>
						</div>
					</section>
				)} */}
					<div className="second-row  d-flex align-items justify-content-evenly">
						{secondRowContent?.map((e, i) => (
							<SecondRowComp {...e} key={i} />
						))}
					</div>
				</section>
				<section className="camp-cards py-5">
					<div className="_camp-cards container">
						<p className="text-center fw-bold mb-5 fs-2"> Campaigns</p>
						<main>
							<div className="campaign-list">
								{campaigns?.length >= 1 ? campaigns?.slice(0, 6).map((camp, i) => <CampCard camp={camp} key={i} />) : <div></div>}
							</div>
							{campaigns && campaigns?.length > 6 && (
								<div className="d-flex justify-content-center mt-3">
									<Link href="/campaigns">
										<a className="btn border-warning text-warning font-weight-bolder px-4 py-2 rounded-pill">View More</a>
									</Link>
								</div>
							)}
						</main>
					</div>
				</section>

				<section className="community-saying">
					<div className="py-10 w-2/3 mx-auto text-center">
						<div className="lg:text-3xl text-xl font-bold">
							Leave the complexity of writing, designing, editing and organizing your campaigns and other administration to us
						</div>
						<div>
							<TeamSlide />
						</div>
						<div className="text-base">
							With our team of professionals, journalists, content writers, designers and social skilled workers, you can leave with us the complexity of
							writing, designing, editing and organizing your campaigns and other administration.
						</div>
					</div>
				</section>
				<section>
					<div className="lg:flex my-10">
						<div className="lg:w-1/2">
							<img src="/images/camp9.svg" className="lg:w-5/6 w-full mx-auto" alt="" />
						</div>
						<div className="lg:w-1/2 my-auto lg:p-0 p-5">
							<div className="lg:text-3xl text-xl font-bold">Subscribe for our Human Right Applications and Proceedings</div>
							<div className="text-lg">
								Our Human Right Application is built and automated to address all forms of human right abuse and with thousands of our Human Right Lawyers and
								Social Skilled workers across the globe, you can now be able to influence policy makers and compel those in power to respect human right and
								administer justice through Human Right Proceedings.
							</div>
						</div>
					</div>
				</section>
				<section className="py-5 community-saying">
					<div className="_community-saying container">
						<p className="text-center mb-5 fs-1 fw-bold">What the community says</p>
						<div className="container">
							<Slider testimonies={testimonies} />
						</div>
					</div>
				</section>
			</Wrapper>
		</FrontLayout>
	)
}

export default HomePage

const SecondRowComp = ({ img, text1, text2, link }: { img: string; text1: string; text2: string; link?: string }): JSX.Element => {
	return (
		<div className="arrow second-row-cards">
			<div className="container _second-row-cards  d-flex flex-column flex-md-row align-items-center">
				<div>
					<img src={`/images/${img}`} alt="" />
				</div>
				<Link href={link || "/"}>
					<div className="c-pointer d-flex flex-column align-items-md-start align-items-center">
						<span className="">{text1}</span>
						<b className="fs-5">{text2}</b>
					</div>
				</Link>
			</div>
		</div>
	)
}

const secondRowContent = [
	// {
	// 	img: "hands.svg",
	// 	text1: "Download",
	// 	text2: "Our Mobile App",
	// 	link: "https://play.google.com/store/apps/details?id=com.gappsy.dashboard.www.android606daa4127835&hl=en",
	// },
	{
		img: "donor.svg",
		text1: "Suscribe",
		text2: "Human Right Application",
		link: "https://teams.peoplespow.com/",
	},
	{
		img: "Bulls eye.svg",
		text1: "Become",
		text2: "A Staff",
		link: "/about#career",
	},
]

const Wrapper = styled.div`
	.c-pointer {
		cursor: pointer;
	}
	.campaign-list {
		display: grid;
		gap: 1.5rem;

		@media screen and (min-width: 920px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and(min-width:768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		.card {
			.card-image {
				width: 100%;
				height: 13rem;
				object-fit: cover;
			}
			transition: all 0.5s ease-in-out;
			&:hover {
				transform: scale(1.1, 1.1);
				box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
			}
		}
	}
	.orange {
		width: 100%;
		.btn {
			border: 3px solid orange;
		}
	}
`
