import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { MY_PETITION } from "apollo/queries/petitionQuery"
import { UserAtom } from "atoms/UserAtom"
import Slider from "components/camp-slider/Slider"
import CampaignTable from "components/campaign-comp/CampaignTable"
import { Wrapper } from "components/styled/style"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import authGuard from "hooks/authGuard"
import FrontLayout from "layout/FrontLayout"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRecoilValue } from "recoil"
import { ICampaign } from "types/Applicant.types"
import { apollo } from "apollo"
import { MY_EVENT } from "apollo/queries/eventQuery"
import { GET_USER_POSTS } from "apollo/queries/postQuery"
import { MY_ADVERTS } from "apollo/queries/advertsQuery"
import router, { useRouter } from "next/router"
import axios from "axios"

import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
dayjs.extend(relativeTime)

const MyCamp: NextPage = (): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const [petition, setPetition] = useState([])
	const [post, setPost] = useState([])
	const [events, setEvents] = useState([])
	const [adverts, setAdverts] = useState([])
	const { query } = useRouter()
	const [campaigns, setCampaigns] = useState([])

	// const loading = true;
	const getGeneral = () => {
		let general = [...petition, ...post, ...adverts, ...events]
		const randomize = (values: any) => {
			let index = values.length,
				randomIndex
			while (index != 0) {
				randomIndex = Math.floor(Math.random() * index)
				index--
				;[values[index], values[randomIndex]] = [values[randomIndex], values[index]]
			}
			return values
		}
		randomize(general)
		setCampaigns(general)
		// console.log(all)
	}

	useQuery(MY_PETITION, {
		client: apollo,
		onCompleted: (data) => {
			setPetition(data.myPetition)
			console.log(data)
			getGeneral()
		},
		onError: (e) => console.log(e),
	})
	useQuery(MY_ADVERTS, {
		client: apollo,
		variables: { authorId: author?.id },
		onCompleted: (data) => {
			console.log(data)
			setAdverts(data.myAdverts)
			getGeneral()
		},
		onError: (err) => {},
	})
	useQuery(GET_USER_POSTS, {
		client: apollo,
		onCompleted: (data) => {
			// console.log(data)
			setPost(data.myPosts)
			getGeneral()
		},
		onError: (err) => {},
	})

	const getEvent = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(MY_EVENT),
				variables: {
					authorId: author?.id,
					page: 1,
				},
			})
			console.log(data)
			setEvents(data.myEvents)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getEvent()
		getGeneral()
	}, [adverts, petition, post, events, author])
	return (
		<FrontLayout showFooter={false}>
			<>
				<Head>
					<title>{`THE PLAINT`} || My campaign</title>
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
							{campaigns.length > 0 ? (
								<div>
									<h3 className="fs-4 fw-bold text-center">Check Campaign Progress</h3>
									<div className="d-flex py-3 flex-column flex-md-row">
										<div className="flex-fill overflow-auto">
											<CampaignTable campaigns={campaigns} />
										</div>
									</div>
								</div>
							) : (
								<p>Loading...</p>
							)}
						</div>
					</div>
				</Wrapper>
			</>
		</FrontLayout>
	)
}

export default authGuard(MyCamp)
