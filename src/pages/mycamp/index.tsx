import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { MY_PETITION } from "apollo/queries/petitionQuery";
import { UserAtom } from "atoms/UserAtom";
import Slider from "components/camp-slider/Slider";
import CampaignTable from "components/campaign-comp/CampaignTable";
import { Wrapper } from "components/styled/style";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import authGuard from "hooks/authGuard";
import FrontLayout from "layout/FrontLayout";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import router, { useRouter } from "next/router";
import axios from 'axios';
import { GET_ALL, GET_ALL_USERS, FOLLOW } from "apollo/queries/generalQuery";

import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';
dayjs.extend(relativeTime);

const MyCamp: NextPage = (): JSX.Element => {
	const author = useRecoilValue(UserAtom);
	const [all, setAll] = useState<any>([])
	const { query } = useRouter();
	const [loading, setLoading] = useState(true)
	// const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		console.log(author)
		async function getData() {
			try {
				const { data } = await axios.post(SERVER_URL + '/graphql', {
					query: print(GET_ALL),
					variables: {
						authorId: author.id
					}
				})
				console.log(data.data.timeline)
				let general = [...data.data.timeline.adverts, {
					"__typename": 'Follow'
				}, ...data.data.timeline.updates, {
					"__typename": 'Follow'
				}, ...data.data.timeline.events, {
					"__typename": 'Follow'
				}, ...data.data.timeline.petitions, {
					"__typename": 'Follow'
				}, ...data.data.timeline.posts, {
					"__typename": 'Follow'
				}, ...data.data.timeline.victories, {
					"__typename": 'Follow'
				}]
				const randomize = (values: any) => {
					let index = values.length, randomIndex;
					while (index != 0) {
						randomIndex = Math.floor(Math.random() * index);
						index--;
						[values[index], values[randomIndex]] = [
							values[randomIndex], values[index]];
					}
					return values;
				}
				randomize(general)
				setAll(general)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}
	}, [])
	return (
		<FrontLayout showFooter={false}>
			<>
				<Head>
					<title>{`PEOPLE'S POWER`} || My campaign</title>
				</Head>
				<Wrapper className="my-camp bg-white ">
					<div className="container">
						{/* <h1 className="text-secondary pt-2 mb-3 fs-3 fw-bold">
							My Campaigns
						</h1>
						<p className="fs-4 fst-italic">Welcome {user?.firstName} !</p>
						<Link href="/startcamp">
							<a className="btn btn-warning rounded-pill px-4">
								<i className="fas fa-plus text-light me-2"></i> Create Campaign
							</a>
						</Link> */}
						<div className="mt-4 ">
							{loading ? (
								<p>Loading...</p>
							) : all?.length ? (
								<div>
									{/* <div className="slide-sec mb-3">
										<Slider />
									</div> */}
								</div>
							) : (
								<p className="text-center">Start by creating a new campaign</p>
							)}
							{all?.length > 0 && (
								<div>
									<h3 className="fs-4 fw-bold text-center">Check Campaign Progress</h3>
									<div className="d-flex py-3 flex-column flex-md-row">
										<div className="flex-fill overflow-auto">
											{/* <CampaignTable campaigns={all} /> */}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</Wrapper>
			</>
		</FrontLayout>
	);
};

export default authGuard(MyCamp);