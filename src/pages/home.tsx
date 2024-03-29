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

// import { ICampaign, Strapi_Testimony } from "types/Applicant.types"


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

	return (
		<FrontLayout msg={false}>
			<Wrapper>
				<section className="index">
					<div className="lg:flex lg:mx-32 my-6 p-4">
						<div className="lg:w-1/2 my-auto">
							<div className="mb-3 text-4xl font-thin capitalize">
								<strong className="text-4xl">your No. 1 Technology For</strong> <br /> all your <strong className="text-4xl">complaint</strong>
							</div>
							<p className="mb-5 text-[#666666] lg:w-[80%]">
								What are your personal and Social Complaints? EXPERTHUB is your no. 1 platform for personal and social solution. Post your Complaint for people to get in touch and have your issues resolved.
							</p>
							<div className="btn-holder d-flex flex-wrap" style={{ gap: "1rem" }}>
								<Link href="/?mode=signup">
									<a className="btn btn-warning btn-lg rounded-pill text-xs px-4 py-2 text-light font-weight-bolder fs-20 ">Post your Complaint</a>
								</Link>
								<Link href="/about">
									<button className="btn btn-lg border-warning text-xs font-weight-bold text-warning py-2 px-4 rounded-pill fs-20">Learn More</button>
								</Link>
							</div>
						</div>
						<div className="lg:block  lg:w-1/2">
							<Zoom>
								<div className="">
									<img src="./images/hero.png" className="" alt="" />
								</div>
							</Zoom>
						</div>
					</div>
				</section>
				<section>
					<div className="lg:flex text-white">
						<div className="flex justify-around p-3 bg-[#777777] px-3 lg:w-1/2">
							<img className="w-40 h-40 my-auto" src="./images/world.png" alt="" />
							<div className="text-white my-auto">
								<span className="text-sm text-white">Offer an</span>
								<p className="text-xl text-white">Expert Service</p>
							</div>
						</div>
						{/* <div className="flex justify-around p-3 bg-[#666666] px-3 lg:w-1/2">
							<img src="./images/app.png" className="w-28 h-28 my-auto" alt="" />
							<div className="text-white my-auto">
								<span className="text-sm text-white">Download Our</span>
								<p className="text-xl text-white">Mobile App</p>
							</div>
						</div> */}
						<div className="flex justify-around p-3 bg-[#777777] px-3 lg:w-1/2">
							<div className="text-center my-auto">
								<span className="text-sm text-white">Become a</span>
								<p className="text-xl text-white">Virtual Assistant</p>
							</div>
							<img className="w-28 h-28 my-auto" src="./images/support.png" alt="" />
						</div>
					</div>
				</section>
				<section className="bg-[#F5F6FA] sm:p-3 py-6">
					<div className="lg:w-1/2 mx-auto text-center py-8 ">
						<h3 className="lg:text-3xl text-xl text-[#00401C]">Find An Expert</h3>
						<p className="text-base my-2 text-[#00401C]">Resolve your complaint by getting in touch with experts and professional who will help you with your personal and social issues when you go premium</p>
					</div>
					<div className="flex lg:px-20 justify-around">
						<div className="lg:w-[60%] w-full my-auto"><TeamSlide /></div>
						<div className="lg:block hidden w-[25%]">
							<img src="./images/hero.png" alt="" />
						</div>
					</div>
				</section>
				<section className="py-5">
					<div className=" container">
						<div className="lg:w-1/2 mx-auto text-center sm:p-3 py-8">
							<h3 className="lg:text-3xl text-xl text-[#00401C]">Start a Petition</h3>
							<p className="text-[#00401C] text-base my-2">Starting a Petition allows others to know about the challenges you are facing and offers them the opportunity to take action and ensure your campaign is resolved speedily. </p>
						</div>
						<div>
							<div className="flex justify-between flex-wrap">
								{campaigns?.length >= 1 ? campaigns?.slice(0, 4).map((camp, i) => <CampCard camp={camp} key={i} />) : <div></div>}
							</div>
							<div className="lg:block hidden lg:w-[40%] mx-auto flex py-8 justify-between">
								<Link href="/?mode=signup">
									<a className="btn btn-warning btn-lg rounded-pill px-4  text-xs py-2 text-light font-weight-bolder fs-20 ">Start a Petition</a>
								</Link>
								<Link href="/campaigns">
									<button className="btn btn-lg border-warning font-weight-bold text-xs text-warning py-2 px-4 rounded-pill fs-20">Explore Petition</button>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-[#F5F6FA] py-6">
					<div className="lg:w-1/2 mx-auto text-center sm:p-3 py-8 ">
						<h3 className="lg:text-3xl text-xl text-[#00401C]">Hire a Virtual Assistant</h3>
						<p className="text-base my-2 text-[#00401C]">Leave the complexity of writing, designing, editing and organizing your campaigns and other administration to a  trained professional</p>
					</div>
					<div className="flex lg:px-20 justify-around">
						<div className="lg:w-[60%]  my-auto text-center">
							<div className="lg:block hidden">
								<TeamSlide />
							</div>
							<Link href="/?mode=login">
								<button className="p-3 rounded-full text-warning border border-warning">Hire a Virtual Assistant</button>
							</Link>
						</div>
						<div className="lg:w-[25%]">
							<img src="./images/assistant.png" alt="" />
						</div>
					</div>
				</section>

				<section className="bg-[#E0E0E0] sm:p-3 py-6">
					<div className="lg:w-1/2 mx-auto text-center py-8 ">
						<h3 className="lg:text-3xl text-xl text-[#00401C]">Create Your Organization</h3>
						<p className="text-base my-2 text-[#00401C]"> Create a business page and describe how your product and services can resolve the issues and challenges  your prospective clients face. when you create a page you will be able to showcase Your Skills And expertise and also advertise your brands and services.</p>
					</div>
					<div className="lg:px-20 text-center">
						<div className="lg:w-[60%] mx-auto text-center"><TeamSlide />
						</div>
						<Link href="/?mode=login">
							<button className="p-3 rounded-full sm:w-40 text-warning border border-warning">Create</button>
						</Link>
					</div>
				</section>


				<section className="py-6">
					<div className="lg:w-1/2 mx-auto text-center py-8 sm:px-3">
						<h3 className="lg:text-3xl text-xl text-[#00401C]">Create, Organize and Promote  Your Events</h3>
						<p className="text-base my-2 text-[#00401C]"> start your impactful event and campaigns and let your community Participate in your events. send a reminder to your attendees to save the date in their calendars.</p>
					</div>
					<div className="relative ">
						<img className="w-full sm:h-52" src="/images/event.png" alt="" />
						<div className="absolute lg:top-40 top-4 sm:p-3 w-full">
							<div className="text-[#00401C] lg:text-2xl text-base text-center font-bold lg:w-[40%] mx-auto">
								Reveal the identity of the imposter called <br />
								Mr President
							</div>
							<div className="flex justify-evenly text-center lg:mt-10 mt-2  lg:w-[40%] mx-auto">
								<div className="bg-white p-4 w-28 shadow-md">
									<p className="text-base">-124</p>
									<p className="text-xs">Days</p>
								</div>
								<div className="bg-white p-4 w-28 shadow-md">
									<p className="text-base">04</p>
									<p className="text-xs">Hours</p>
								</div>
								<div className="bg-white p-4 w-28 shadow-md">
									<p className="text-base">00</p>
									<p className="text-xs">Minutes</p>
								</div>
								<div className="bg-white p-4 w-28 shadow-md">
									<p className="text-base">33</p>
									<p className="text-xs">Seconds</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="p-3 bg-[#00401C] w-full"></div>
				{/* <section>
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
				</section> */}
			</Wrapper>
		</FrontLayout>
	)
}

export default HomePage

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
