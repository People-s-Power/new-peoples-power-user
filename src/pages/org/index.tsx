/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from "react"
import FrontLayout from "layout/FrontLayout"
import Head from "next/head"
import { useQuery } from "@apollo/client"
import { MY_CAMPAIGN } from "apollo/queries/campaignQuery"
import { apollo } from "apollo"
import { useState } from "react"
import { ICampaign, IUser, IOrg } from "types/Applicant.types"
import Link from "next/link"
import axios from "axios"
import { sassNull } from "sass"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import Slider from "../../components/camp-slider/Slider"
import router, { useRouter } from "next/router"
import { GET_ORGANIZATION, GET_ORGANIZATIONS } from "apollo/queries/orgQuery"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SERVER_URL } from "utils/constants"
import { MY_ADVERTS } from "apollo/queries/advertsQuery"

import CreatePost from "../../components/modals/CreatePost"
import CreateAdvert from "../../components/modals/CreateAdvert"
import CreateEvent from "../../components/modals/CreateEvent"
import StartPetition from "../../components/modals/StartPetition"

import { GET_ALL, GET_ALL_USERS, FOLLOW } from "apollo/queries/generalQuery"

import AdvertsComp from "components/AdvertsCard"
import PetitionComp from "components/PetitionCard"
import EventsCard from "components/EventsCard"
import CampComp from "components/CampComp"
import { print } from "graphql"
import PostActionCard from "components/PostActionCard"
import { Dropdown } from "rsuite"

const org = () => {
	const [campaigns, setCampaigns] = useState<ICampaign[]>([])
	const [user, setUser] = useState<IUser>()
	const [orgs, setOrgs] = useState<IOrg[]>([])
	const { query } = useRouter()
	const author = useRecoilValue(UserAtom)
	const [product, setProduct] = useState(false)
	const [organization, setOrganization] = useState(false)
	const [img, setImg] = useState("")
	const uploadRef = useRef<HTMLInputElement>(null)
	const [following, setFollow] = useState(false)
	const [adverts, setAdverts] = useState<any>([])

	const [openPost, setOpenPost] = useState(false)
	const [openAd, setOpenAd] = useState(false)
	const [openEvent, setOpenEvent] = useState(false)
	const [openPetition, setOpenPetition] = useState(false)
	const [all, setAll] = useState<any>([])

	const handelClick = () => setOpenPost(!openPost)
	const handelPetition = () => setOpenPetition(!openPetition)
	const handelAdClick = () => setOpenAd(!openAd)
	const handelEventClick = () => setOpenEvent(!openEvent)

	const [openFindExpart, setOpenFindExpart] = useState(false)

	const handelOpenFindExpart = () => setOpenFindExpart(!openFindExpart)

	let page: any
	if (typeof window !== "undefined") {
		page = localStorage.getItem("page")
	}
	function isValidUrl(string: any) {
		try {
			new URL(string)
			return true
		} catch (err) {
			return false
		}
	}

	useQuery(GET_ORGANIZATION, {
		variables: { ID: query.page },
		client: apollo,
		onCompleted: (data) => {
			// console.log(data.getOrganzation)
			setUser(data.getOrganzation)
			user?.followers.map((single: any) => {
				if (single === user.id) {
					setFollow(true)
				} else {
					setFollow(false)
				}
			})
			localStorage.setItem("operator", JSON.stringify(data.getOrganzation.operators))
		},
		onError: (err) => console.log(err),
	})

	useQuery(GET_ORGANIZATIONS, {
		variables: { ID: author?.id },
		client: apollo,
		onCompleted: (data) => {
			// console.log(data)
			setOrgs(data.getUserOrganizations)
		},
		onError: (err) => console.log(err),
	})

	useQuery(MY_ADVERTS, {
		client: apollo,
		variables: { authorId: query?.page },
		onCompleted: (data) => {
			console.log(data)
			setAdverts(data.myAdverts)
		},
		onError: (err) => {},
	})

	async function getData() {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(GET_ALL),
				variables: {
					authorId: query.page,
				},
			})
			console.log(data.data.timeline)
			let general = [
				...data.data.timeline.adverts,
				{
					__typename: "Follow",
				},
				...data.data.timeline.updates,
				{
					__typename: "Follow",
				},
				...data.data.timeline.events,
				{
					__typename: "Follow",
				},
				...data.data.timeline.petitions,
				{
					__typename: "Follow",
				},
				...data.data.timeline.posts,
				{
					__typename: "Follow",
				},
				...data.data.timeline.victories,
				{
					__typename: "Follow",
				},
			]
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
			setAll(general)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getData()
		axios
			.get(`/campaign/orgcampaign/${page}`)
			.then(function (response) {
				// console.log(response)
				setCampaigns(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})

		if (all[0] === undefined) {
			getData()
		}
	}, [])

	const follow = () => {
		axios
			.post("/user/follow", {
				userId: page,
			})
			.then(function (response) {
				toast.success("Followed!")
				setFollow(true)
			})
			.catch(function (error) {
				console.log(error)
				toast.warn("Oops an error occoured!")
			})
	}
	const unFollow = () => {
		axios
			.put("/user/follow", {
				userId: page,
			})
			.then(function (response) {
				toast.success("Unfollowed!")
				setFollow(true)
			})
			.catch(function (error) {
				console.log(error)
				toast.warn("Oops an error occoured!")
			})
	}

	const singleOrg = (id: string) => {
		// axios.get(`/orgs/${id}`)
		//     .then(function (response) {
		//         console.log(response)
		//         setUser(response.data)
		router.push(`/org?page=${id}`)
		localStorage.setItem("page", `${id}`)
		//         setOrganization(true)
		//     })
		//     .catch(function (error) {
		//         console.log(error);
		//     })
	}

	const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		const reader = new FileReader()
		if (files && files.length > 0) {
			reader.readAsDataURL(files[0])
			reader.onloadend = () => {
				if (reader.result) {
					setImg(reader.result as any)
				}
			}
		}
	}

	const uploadFileToServer = async () => {
		if (!img) {
			uploadRef.current?.click()
		} else {
			try {
				// setLoading(true);
				const { data } = await axios.post(`/organization/uploadimg/${query.page}`, { image: img })
				toast("Image uploaded successfully")
				setImg("")
			} catch (error) {
				console.log(error)
			} finally {
				// setLoading(false);
			}
		}
	}

	return (
		<FrontLayout showFooter={true}>
			<>
				<Head>
					<title>
						{`CITIZEN PLAINT`} || {user?.name}{" "}
					</title>
				</Head>
				<div className="lg:mx-32">
					<div className="rounded-md bg-gray-100">
						<div className="relative ">
							<div>
								<img className="w-full h-52" src="https://source.unsplash.com/random/800x400?nature" alt="" />
							</div>
							<div className="edit-sec relative left-10 -top-20">
								<div className="py-3 mb-4 d-flex">
									<div className="pro-img-wrap rounded-circle position-relative">
										<input type="file" ref={uploadRef} onChange={handleImg} />
										<button className="btn p-0 z-50" onClick={uploadFileToServer}>
											<i
												className={`fas fs-5 d-flex align-items-center justify-content-center  rounded-circle  text-secondary ${
													img ? "fa-save" : "fa-pencil-alt"
												}`}
											></i>
										</button>

										<div className="pro-img position-relative rounded-circle">
											<img src={img || user?.image || "/images/user.png"} alt="" className="position-absolute" />
										</div>
									</div>
								</div>
								<div className="">
									<div className="flex justify-between">
										<div className="flex flex-column justify-center">
											<div className="flex">
												<div className="text-xl font-bold ">{user?.name}</div>
												<div className="text-xs text-gray-900 flex my-auto ml-6">
													{user?.followers.length} Followers
													<div className="text-xs text-gray-900 ml-2">Following {user?.following.length}</div>
												</div>
											</div>
											<div className="text-sm font-thin w-96">{user?.description.substring(0, 100) + "..."}</div>
											<div className="pt-1 text-sm">
												{" "}
												{user?.city}, {user?.country}
											</div>
										</div>
										<div className="font-black text-lg mr-32">
											<Link href={`/org/update?page=${user?._id}`}>
												<button className="bg-transparent p-2 text-warning">
													{" "}
													<span>&#x270E;</span> Edit
												</button>
											</Link>
										</div>
									</div>
									{/* {
                                        user?.author === author?.id ? (
                                            <div className="font-black text-lg">
                                                <Link href={'/org/update'}>
                                                    <button className="bg-transparent p-2 text-warning"> <span>&#x270E;</span> Edit</button>
                                                </Link>
                                            </div>
                                        ) : (
                                            following === true ? (
                                                <div>
                                                    <button onClick={() => unFollow()} className="bg-transparent p-2 text-warning">Unfollow</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button onClick={() => follow()} className="bg-transparent p-2 text-warning"> <span>&#10010;</span> Follow</button>
                                                </div>
                                            )
                                        )
                                    } */}
								</div>
							</div>
						</div>

						{/* {author?.id === query.page ? (
                            <div className="text-center font-black text-lg">
                                <Link href="/mycamp">
                                    <button className=" bg-transparent p-2 w-44 text-warning">Dashboard</button>
                                </Link>
                                <button className=" bg-transparent p-2 w-44 text-warning" onClick={() => setProduct(!product)}> Products</button>
                                <Link href={'/about'}>
                                    <button className=" bg-transparent p-2 w-44 text-warning"> Careers</button>
                                </Link>
                            </div>
                        ) : (<div></div>)} */}
					</div>
					{/* <Slider /> */}
					{/* <div className="text-center text-lg p-3">
                        <Link href={`/startcamp`}>
                            <button className="bg-gray-200 w-44 p-2 rounded-full"> Start Campaign...</button>
                        </Link>
                    </div> */}
					<div className="lg:flex mt-3">
						<div className="lg:w-96 mt-3 h-80 lg:mr-4 rounded-md bg-gray-50">
							{user?.author === author?.id ? (
								<div className=" text-base p-3">
									<Link href={`/addadmin?page=${query.page}`}>
										<button className="bg-transparent text-warning">Admin</button>
									</Link>
									{/* <div className="flex cursor-pointer my-2" onClick={() => { router.push(`/user?page=${author?.id}`), setOrganization(false) }}>
                                        {user?.image === "Upload org Image" ? (
                                            <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                        ) : (
                                            <img className="w-8 h-8 rounded-full" src={author?.image} alt="" />
                                        )}
                                        <p className="pl-2 mt-2 capitalize">{author?.name}</p>
                                    </div> */}
									<div className="my-2">
										<Link href="/mycamp">
											<button className="bg-transparent">Dashboard</button>
										</Link>
									</div>
									<div className="my-2">
										<button className=" bg-transparent" onClick={() => setProduct(!product)}>
											{" "}
											Products
										</button>
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
							) : null}
						</div>
						{product ? (
							<div className="w-full rounded-md mt-3">
								<div className="bg-transparent cursor-pointer w-36 my-2 mx-auto flex justify-between" onClick={() => handelAdClick()}>
									<div className="text-center my-auto">
										<div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
										{/* <div className="text-xs">  create </div> */}
									</div>
									<div className="my-auto text-sm">Create Product</div>
								</div>
								<div>
									{adverts.map((advert: any) => (
										<div key={advert.caption} className="p-3 border-b border-gray-400 my-3">
											<div>{advert.caption}</div>
											<div className="py-2">
												<img className="w-full h-80 object-cover rounded-md" src={advert.image} alt="" />
											</div>
											<div className="text-sm py-2 leading-loose">{advert.message}</div>
											<div className="pt-3 flex justify-between">
												<div className="w-2/3">{advert.email}</div>
												<div>
													<button className="p-2 bg-warning ">Sign up</button>
												</div>
												<Dropdown placement="leftStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
													<Dropdown.Item>Advertise</Dropdown.Item>
													<Dropdown.Item>Edit</Dropdown.Item>
												</Dropdown>
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							<div className="w-full">
								<PostActionCard
									authorImage={author?.image}
									handelOpenFindExpart={handelOpenFindExpart}
									handelClick={handelClick}
									handelEventClick={handelEventClick}
									handelPetition={handelPetition}
								/>

								{all.length === 0 ? <div className="text-center">You dont have any campaign at the moment</div> : <></>}
								{all[0] !== undefined
									? all.map((single: any, index: number) => {
											// setType(single.__typename)
											switch (single.__typename) {
												case "Advert":
													return (
														<div>
															<AdvertsComp advert={single} key={index} />
														</div>
													)
												case "Event":
													return (
														<div>
															<EventsCard key={index} event={single} />
														</div>
													)
												case "Petition":
													return (
														<div>
															<PetitionComp petition={single} key={index} />
														</div>
													)
												case "Victory":
													return <div>victories</div>
												case "Post":
													return (
														<div>
															<CampComp key={index} post={single} />
														</div>
													)
											}
									  })
									: null}
							</div>
						)}
					</div>
				</div>
				<CreatePost open={openPost} handelPetition={handelPetition} handelClick={handelClick} post={null} orgs={orgs} />
				<CreateEvent open={openEvent} handelClick={handelEventClick} event={null} />
				<CreateAdvert open={openAd} handelClick={handelAdClick} advert={null} />
				<StartPetition open={openPetition} handelClick={handelPetition} data={null} orgs={orgs} />
				<ToastContainer />
			</>
		</FrontLayout>
	)
}

export default org
