/* eslint-disable no-var */
import { useQuery } from "@apollo/client";
import { apollo } from "apollo";
import {
	GET_CAMPAIGN,
	GET_CAMPAIGNS,
	GET_ENDORSEMENTS_BY_CAMPAIGN,
} from "apollo/queries/campaignQuery";
import axios from "axios";
import { UserAtom } from "atoms/UserAtom";
import LoginModal from "components/auth/login/modal/LoginModal";
import { CampaignShareMenuList } from "components/campaign-comp/CampaignTable";
import EndorseCampaignComp from "components/campaign-comp/EndorseCampaignComp";
import Endorsements from "components/campaign-comp/Endorsements";
import FrontLayout from "layout/FrontLayout";
import {
	GetStaticPaths,
	GetStaticPathsResult,
	GetStaticProps,
	NextPage,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import React, { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICampaign, IEndorsement } from "types/Applicant.types";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { SINGLE_PETITION } from "apollo/queries/petitionQuery";

// const io = socket(SERVER_URL, {
// 	extraHeaders: {
// 		authorization: Cookies.get("token") || "",
// 	},
// });

export interface Update {
	body: string;
}

const SingleCampaignPage = (): JSX.Element => {
	// console.log(camp)
	const [endorsements, setEndorsements] = useState<IEndorsement[]>([]);
	const [isLiked, setIsLiked] = useState(false);
	const [showEndorsement, setShowEndorsement] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const { query } = useRouter();
	const user = useRecoilValue(UserAtom);
	const [update, setUpdate] = useState<Update[]>([])

	const [camp, setCamp] = useState<any>([]);

	useQuery(GET_ENDORSEMENTS_BY_CAMPAIGN, {
		client: apollo,
		variables: { petition_id: camp?.id },
		onCompleted: (data) => {
			setEndorsements(data.getEndorsementsByPetition);
			// console.log(data.getEndorsementsByCampaign)
		},
		onError: (err) => console.log(err),
	});

	useQuery(SINGLE_PETITION, {
		client: apollo,
		variables: { slug: query.slug },
		onCompleted: (data) => {
			console.log(data)
			setCamp(data.getPetition)
		},
		onError: (err) => console.log(err),
	});

	const handleLike = async () => {
		// io.emit("likeCampaign", { id: camp?.id });
		console.log("handlike");
	};

	const viewCamp = async () => {
		if (!user) return
		const data = {
			userId: user?.id
		}
		const res = await axios.put(`/campaign/viewCamp/${camp?.id}`, data)
		// console.log(res)
	}

	useEffect(() => {
		// console.log(query.slug)
		axios.get(`/campaign/update/${camp?.id}`)
			.then(function (response) {
				// console.log(response);
				setUpdate(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})

		if (camp?.likes?.includes(user?.id)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
		viewCamp()
	}, [camp, user]);

	function isValidUrl(string: any) {
		try {
			new URL(string);
			return true;
		} catch (err) {
			return false;
		}
	}

	let target = 2000;

	// useEffect(() => {
	// 	const test = async () => {
	// 		const { data } = await axios.get(`/campaign/session/${camp?.id}`);
	// 		console.log(data);
	// 	};
	// 	test();
	// 	// io.on("likeCampaign", (data) => setIsLiked(data));
	// }, []);

	return (
		<Fragment>
			<Head>
				<title>Campaign || {camp?.title}</title>
				<meta name="description" content={camp?.body} />
			</Head>
			<FrontLayout>
				<Wrapper className="single-camp py-4 ">
					<LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
					<div className="container inner py-2">
						<div className="">
							<main className="single-camp-wrap px-2 d-flex flex-column flex-md-row align-items-sm-start justify-content-sm-between">
								<div className="sec-1 pl-5 mb-5 left w-[50%]">
									<div className="top">
										<h1 className="m-0 p-0 text-warning fw-bold mb-3 fs-4">
											Explore Campaign
										</h1>
										<img
											src={camp?.image}
											alt={camp?.title}
											loading="lazy"
											className="camp-image mb-0"
										/>
										<div className="d-flex  share-like align-items-center">
											<a
												className={`btn rounded-circle me-5 like-btn 
                   								 ${isLiked ? "bg-sky text-primary" : "text-muted"}`}
												onClick={() => {
													user?.id !== camp?.authorId && handleLike();
												}}
											>
												<i className="fas fa-thumbs-up small"></i>
											</a>
											<CampaignShareMenuList camp={camp}>
												<button className="btn p-0 px-0">
													<i className="fas fa-share small text-muted"></i>
												</button>
											</CampaignShareMenuList>
										</div>
									</div>
									<h3 className="mb-0 p-0 fw-bold m-0 capitalize">{camp?.title}</h3>
									<div className="m-0 mt-2 fw-bold flex">
										{isValidUrl(camp?.authorImg) ? (
											<img className="w-8 h-8 rounded-full" src={camp?.authorImg} alt="" />
										) : (
											<img className="w-8 h-8 opacity-50" src="/images/user.png" alt="" />
										)}
										<p className="ml-3">
											{`${camp?.authorName}`} launched this campaign to {camp?.target}
										</p>
									</div>
									<div className="fs-5 my-3">{camp?.body}</div>
									<Link href={`/report?page=${camp?.slug}`}>
										<div className="text-red-500 cursor-pointer">Report Abuse</div>
									</Link>
									{update.length >= 1 ? (
										<div className="bg-gray-50 p-3 mt-5">
											<div className="text-xl font-bold my-2">CAMPAIGN UPDATE</div>
											{update.map((item, i) => (
												<div className="text-lg my-1" key={i}>{item.body}</div>
											))}
										</div>
									) : (null)}
									{/* {user?.id === camp?.author?.id && camp?.promoted !== true ? (
										<button
											onClick={() =>
												router.push(`/promote?slug=${query?.slug}&view=true`)
											} className="btn m-0 my-4 btn-warning text-white fw-bold px-4 py-2 rounded-pill"
										>
											Promote Campaign
										</button>
									) : (<div></div>)}
									{!user && (
										<button
											className="btn m-0 my-4 btn-warning text-white fw-bold px-4 py-2 rounded-pill"
											onClick={() => setShowLogin(true)}
										>
											Endorse campaign
										</button>
									)} */}
									{/* {showEndorsement && <EndorseCampaignComp camp={camp} />} */}
								</div>

								<aside className="sec-2 align-items-center flex-column d-flex right">
									<div>
										<p className="mt-0 font-bold text-xl">
											{Number(endorsements?.length) + 1} {Number(endorsements?.length) + 1 <= 1 ? "has" : "have"} endorsed this campaign, Lets get it to {" "}
											{Number(endorsements?.length) >= target ? " " + target + 100 : target}
										</p>
										<div className="h-4 mt-2 relative max-w-xl rounded-full overflow-hidden w-full">
											<div className="w-full h-full bg-gray-200 absolute"></div>
											<div id="bar" className={'h-full bg-warning relative w-4'}
												style={{
													width: Number(endorsements?.length) < 150
														? + 10 + 'px'
														: (Number(endorsements?.length) >= 300 ? + 500 + 'px' : + 50 + 'px')
												}} ></div>
										</div>
									</div>

									{endorsements?.length ? (
										<p className="mb-4 bg-sky ps-1 py-2 fs-5 text-center rounded text-muted w-100 fw-bold">
											Endorsements
										</p>
									) : (
										camp?.authorId === user?.id ? null : (
											<div className="px-3">
												<p className="py-2 fs-5 text-center rounded text-muted w-100 px-2">
													Be the first to endorse this campaign
												</p>
											</div>
										)
									)}
									<div className="mb-3 w-100">
										{endorsements?.map((endorsement, i) => (
											<Endorsements endorsement={endorsement} key={i} />
										))}
									</div>
									{camp?.authorId === user?.id ? null : (endorsements.length >= 1 ? (
										endorsements.map((endorse, i) => (
											user?.id === endorse.author.id ? (
												<div key={i}>
													<div>Thank you {user.firstName} for endorsing this campaign. Let's now make this campaign get to other supporters on Peoples Power by promoting it.</div>
													<Link href={`/promote?slug=${camp.slug}`}>
														<a className="btn btn-warning btn-sm  rounded-pill px-3 fw-bold my-3 text-center mx-auto">
															Promote Campaign
														</a>
													</Link>
												</div>) : (null
												// endorsements.map((endorse) => {
												// endorse.id === user?.id ? (
												// 	<div>
												// 		<Link href={`/promote?slug=${camp.slug}`}>
												// 			<a className="btn btn-warning btn-sm  rounded-pill px-3 fw-bold">
												// 				Promote
												// 			</a>
												// 		</Link>
												// 	</div>) : (
												// 	<div>
												// 		<EndorseCampaignComp camp={camp} />
												// 	</div>)
												// })
												// <EndorseCampaignComp camp={camp} />
											)
										))) : (
										<div>
											<EndorseCampaignComp camp={camp} />
										</div>
									))}
									{/* {endorsements && endorsements?.length > 5 && (
										<button className="btn btn-warning text-white fw-bold w-100 py-2">
											More reasons for endorsing
										</button>
									)} */}
								</aside>
							</main>
						</div>
					</div>
				</Wrapper>
			</FrontLayout>
		</Fragment>
	);
};

export default SingleCampaignPage;

const Wrapper = styled.div`
	.camp-image {
		width: 100%;
		max-height: 30rem;
		object-fit: cover;
	}
	.mde-textarea-wrapper {
		.mde-text {
			background-color: inherit;
			border: 0;
			outline: 0;
			-webkit-box-shadow: 0;
			-moz-box-shadow: 0;
			box-shadow: 0;
			resize: none;
		}
	}
	#text{
		display: none;
	}
`;
