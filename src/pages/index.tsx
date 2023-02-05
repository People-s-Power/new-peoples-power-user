/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import FrontLayout from "layout/FrontLayout";
import React, { useEffect, useState } from "react";
import CampComp from "../components/CampComp"
import CreatePost from "../components/modals/CreatePost"
import CreateAdvert from "../components/modals/CreateAdvert"
import CreateEvent from "../components/modals/CreateEvent"
import StartPetition from "../components/modals/StartPetition"
import EventsCard from "components/EventsCard";
import { GET_PETITION } from "apollo/queries/petitionQuery";
import { GET_POSTS } from "apollo/queries/postQuery";
import { GET_EVENTS } from "apollo/queries/eventQuery";
import { GET_ALL, GET_ALL_USERS, FOLLOW } from "apollo/queries/generalQuery";
import Link from "next/link";
import { GET_ORGANIZATIONS, GET_ORGANIZATION } from "apollo/queries/orgQuery";
import router, { useRouter } from "next/router";
import FollowSlides from "components/camp-slider/FollowSlides";

import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";

import { apollo } from "apollo";
import { useQuery } from "@apollo/client";
import { IUser, IOrg } from "types/Applicant.types";
import PetitionComp from "components/PetitionCard";
import AdvertsComp from "components/AdvertsCard";
import Updates from "components/updates";
import PostActionCard from "components/PostActionCard";
import FindExpartModal from "components/modals/FindExpartModal";

const HomePage = () => {
	const author = useRecoilValue(UserAtom);
	const [openPost, setOpenPost] = useState(false);
	const [openAd, setOpenAd] = useState(false);
	const [openEvent, setOpenEvent] = useState(false);
	const [openPetition, setOpenPetition] = useState(false);
	const [users, setUsers] = useState<IUser[]>([])
	const handelClick = () => setOpenPost(!openPost);
	const handelPetition = () => setOpenPetition(!openPetition);
	const handelAdClick = () => setOpenAd(!openAd);
	const handelEventClick = () => setOpenEvent(!openEvent);
	const [following, setFollow] = useState(false)
	const [all, setAll] = useState<any>([])
	const [type, setType] = useState("")
	const [orgs, setOrgs] = useState<IOrg[]>([])
	const [orgId, setOrgId] = useState("")

	const [openFindExpart, setOpenFindExpart] = useState(false);

	const handelOpenFindExpart = () => setOpenFindExpart(!openFindExpart);


	useQuery(GET_ORGANIZATIONS, {
		variables: { ID: author?.id },
		client: apollo,
		onCompleted: (data) => {
			// console.log(data.getUserOrganizations)
			setOrgs(data.getUserOrganizations)
		},
		onError: (err) => {
			// console.log(err)
		},
	});
	const { refetch } = useQuery(GET_ORGANIZATION, {
		variables: { ID: orgId },
		client: apollo,
		onCompleted: (data) => {
			setOrgs([...orgs, data.getOrganzation])
		},
		onError: (err) => {
			console.log(err)
		},
	});

	function isValidUrl(string: any) {
		try {
			new URL(string);
			return true;
		} catch (err) {
			return false;
		}
	}
	const singleOrg = (id: string) => {
		localStorage.setItem("page", `${id}`)
		router.push(`/org?page=${id}`)
	}

	useEffect(() => {
		if (!author) {
			window.location.href = `/home`
		}
		async function getData() {
			axios.get(`/user/single/${author?.id}`)
				.then(function (response) {
					// console.log(response.data.user.orgOperating)
					response.data.user.orgOperating.map((operating: any) => {
						setOrgId(operating)
						refetch()
					})
				})
			try {
				const { data } = await axios.post(SERVER_URL + '/graphql', {
					query: print(GET_ALL),
					variables: {
						authorId: author?.id
					}
				})
				// console.log(data.data.timeline)
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
			} catch (err) {
				console.log(err)
			}
		}


		if (all[0] === undefined) {
			getData()
		}
	})

	// useQuery(GET_ALL, {
	// 	client: apollo,
	// 	onCompleted: (data) => {
	// 		// console.log(data)
	// 		let general = [...data.general.adverts, ...data.general.events, ...data.general.petitions, ...data.general.posts, ...data.general.victories,]
	// 		const randomize = (values: any) => {
	// 			let index = values.length, randomIndex;
	// 			while (index != 0) {
	// 				randomIndex = Math.floor(Math.random() * index);
	// 				index--;
	// 				[values[index], values[randomIndex]] = [
	// 					values[randomIndex], values[index]];
	// 			}
	// 			return values;
	// 		}
	// 		randomize(general)
	// 		setAll(general)
	// 		// console.log(general)
	// 	},
	// 	onError: (err) => console.log(err),
	// });


	// useQuery(GET_PETITION, {
	// 	client: apollo,
	// 	onCompleted: (data) => {
	// 		console.log(data)
	// 	},
	// 	onError: (err) => console.log(err),
	// });
	// useQuery(GET_POSTS, {
	// 	client: apollo,
	// 	onCompleted: (data) => {
	// 		console.log(data)
	// 	},
	// 	onError: (err) => console.log(err),
	// });
	// useQuery(GET_EVENTS, {
	// 	client: apollo,
	// 	onCompleted: (data) => {
	// 		console.log(data)
	// 	},
	// 	onError: (err) => console.log(err),
	// });

	const follow = async (user: any) => {
		try {
			const { data } = await axios.post(SERVER_URL + '/graphql', {
				query: print(FOLLOW),
				variables: {
					followerId: author.id, followId: user.id,
				}
			})
			console.log(data)
			toast.success("Followed!")
			setFollow(true)
		} catch (error) {
			console.log(error);
			toast.warn("Oops an error occoured!")
		}
	}


	useQuery(GET_ALL_USERS, {
		client: apollo,
		onCompleted: (data) => {
			console.log(data)
			setUsers(data.getUsers)
		},
		onError: (err) => console.log(err),
	});
	return (
		<FrontLayout showFooter={false}>
			<main className="flex mx-20">
				<aside className="w-[20%] text-center fixed bg-white left-20">
					<div className="bg-warning w-full h-10"></div>
					<div className="p-2 relative -top-6 border-b border-gray-200">
						<img src={author?.image} className="w-[80px] mx-auto left-0 right-0 rounded-full h-[80px] " alt="" />
						<div className="text-base font-light">{author?.name}</div>
						<div className="text-xs px-3">{author?.description?.substring(0, 100) + '...'}</div>
					</div>
					<div className="border-b border-gray-200 px-3">
						<div className="flex justify-between my-2">
							<div className="text-sm my-auto">Petitions</div>
							<div onClick={() => handelPetition()} className="text-center cursor-pointer">
								<div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
								<span className="text-xs text-center">create</span>
							</div>
						</div>
						<div className="flex justify-between my-2">
							<div className="text-sm my-auto">Event</div>
							<div onClick={() => handelEventClick()} className="text-center cursor-pointer">
								<div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
								<span className="text-xs text-center">create</span>
							</div>
						</div>
						<div className="flex justify-between my-2">
							<div className="text-sm my-auto">Organization</div>
							<Link href={'/org/create'}>
								<div className="text-center cursor-pointer">
									<div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
									<span className="text-xs text-center">create</span>
								</div>
							</Link>
						</div>
						<div>
							{orgs.map((org, i) => (
								<div key={i} className="flex cursor-pointer my-2" onClick={() => singleOrg(org?._id)}>
									{isValidUrl(org?.image) ? (
										<img className="w-8 h-8 rounded-full" src={org?.image} alt="" />
									) : (
										<img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
									)}
									<p className="pl-2 mt-2 text-sm">{org?.name}</p>
								</div>
							))}
						</div>
					</div>
				</aside>
				<section className="w-full shadow-sm w-[50%] mx-auto">
					<PostActionCard authorImage={author?.image} handelOpenFindExpart={handelOpenFindExpart} handelClick={handelClick} handelEventClick={handelEventClick} handelPetition={handelPetition} />
					<div>
						{
							all.map((single: any, index: number) => {
								// setType(single.__typename)
								switch (single.__typename) {
									case 'Advert':
										return (<div key={index} >
											<AdvertsComp advert={single} />
										</div>
										)
									case 'Event':
										return (<div key={index} >
											<EventsCard event={single} />
										</div>
										)
									case 'Petition':
										return (<div key={index} >
											<PetitionComp petition={single} />
										</div>
										)
									case 'Victory':
										return (<div key={index} >
											victories
										</div>
										)
									case 'Post':
										return (<div key={index} >
											<CampComp post={single} />
										</div>
										)
									case 'Update':
										return (<div key={index} >
											<Updates updates={single} />
										</div>
										)
									case 'Follow':
										return (<div key={index} >
											<FollowSlides />
										</div>
										)
								}
							})
						}
						{/* <CampComp /> */}
					</div>
				</section>
				<aside className="w-[20%] p-2 fixed bg-white right-20">
					<div className="text-sm">
						Grow your feed by following persons and organizations that interest you
					</div>
					{users.slice(0, 3).map((user, index) => (
						<div key={index} className="flex justify-between my-4">
							<img src={user.image} className="w-12 m-2 h-12 rounded-full" alt="" />
							<div className="w-[80%]">
								<div className="text-base font-light">{user.name} </div>
								{/* <div className="text-xs">Joshua who you followed
									started following King Erics</div> */}
								<div className="flex cursor-pointer justify-between px-4 py-1 text-xs border border-black w-[60%] mt-2 rounded-md">
									<div className="text-lg">+</div>
									<div className="my-auto text-sm" onClick={() => follow(user)}>Follow</div>
								</div>
							</div>
						</div>
					))}
					<Link href="/connection">
						<div className="text-sm text-warning cursor-pointer">view who you followed is following</div>
					</Link>
					<div className="p-2">
						{/* <div className="my-3 text-sm">
							Grow your feed by following
							persons and pages that
							interest you
						</div> */}
						<div className="my-3 text-sm">
							Following someone or a
							page allows you to see the
							persons interest, campaign
						</div>
						<div className="my-3 text-sm">
							You can reach a larger
							audience by allowing others
							to follow your activity and
							read what you are sharing
						</div>
					</div>
				</aside>
				<StartPetition open={openPetition} handelClick={handelPetition} orgs={orgs} data={null} />
				<CreatePost open={openPost} handelClick={handelClick} handelPetition={handelPetition} post={null} orgs={orgs} />
				<FindExpartModal author={author} open={openFindExpart} handelClose={() => setOpenFindExpart(false)} />

				{/* <CreateEvent open={openEvent} handelClick={handelEventClick} />
				<CreateAdvert open={openAd} handelClick={handelAdClick} /> */}
				<ToastContainer />
			</main >
		</FrontLayout >
	)
}

export default HomePage;