import React, { useState, useEffect, useRef } from "react"
import FrontLayout from "layout/FrontLayout"
import { SERVER_URL } from "utils/constants"
import { io } from "socket.io-client"
import ReactTimeAgo from "react-time-ago"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import router, { useRouter } from "next/router"
import { Dropdown } from "rsuite"
import Link from "next/link"
import { Popover, Whisper } from "rsuite"
import { GET_ORGANIZATIONS, GET_ORGANIZATION } from "apollo/queries/orgQuery"
import { Loader } from "rsuite"
import { apollo } from "apollo"
import { useQuery } from "@apollo/client"
// import { print } from "graphql"
import axios from "axios"
import { socket } from "pages/_app"

const messages = () => {
	const user = useRecoilValue(UserAtom)
	const [message, setMessage] = useState<any>("")
	const [messages, setMessages] = useState<any>(null)
	const [active, setActive] = useState<any>(user)
	const [show, setShow] = useState(null)
	const { query } = useRouter()
	const [rating, setRating] = useState<any>(0)
	const [star, setStar] = useState<any>(false)
	const [orgs, setOrgs] = useState<any>(null)
	const [orgId, setOrgId] = useState("")
	const uploadRef = useRef<HTMLInputElement>(null)
	const [filesPreview, setFilePreview] = useState<any>([])
	const [loading, setLoading] = useState(false)
	const bottomRef = useRef(null);

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (filesPreview.length < 1) {
			const files = e.target.files
			const reader = new FileReader()

			if (files && files.length > 0) {
				reader.readAsDataURL(files[0])
				reader.onloadend = () => {
					if (reader.result) {
						setFilePreview([...filesPreview, reader.result as string])
					}
				}
			}
		}
	}
	// const socket = io(SERVER_URL, {
	// 	query: {
	// 		user_id: user?.id,
	// 	},
	// })

	useQuery(GET_ORGANIZATIONS, {
		variables: { ID: user?.id },
		client: apollo,
		onCompleted: (data) => {
			// console.log(data.getUserOrganizations)
			setOrgs(data.getUserOrganizations)
		},
		onError: (err) => {
			// console.log(err)
		},
	})

	const { refetch } = useQuery(GET_ORGANIZATION, {
		variables: { ID: orgId },
		client: apollo,
		onCompleted: (data) => {
			setOrgs([...orgs, data.getOrganzation])
		},
		onError: (err) => {
			console.log(err.message)
		},
	})
	const getSingle = () => {
		try {
			axios.get(`/user/single/${user?.id}`).then(function (response) {
				// console.log(response.data.user.orgOperating)
				response.data.user.orgOperating.map((operating: any) => {
					setOrgId(operating)
					refetch()
				})
			})
		} catch (error) {
			console.log(error)
		}
	}
	const sendFile = (id) => {
		if (filesPreview.length > 0) {
			setLoading(true)
			const payload = {
				to: id,
				from: active.id || active._id,
				type: "file",
				file: filesPreview[0],
				dmType: active?.__typename === undefined ? "consumer-to-consumer" : "consumer-to-org",
			}
			socket.emit("send_dm", payload, (response) => {
				console.log(response)
				setFilePreview([])
				setShow(response)
				setLoading(false)
				if (query.page !== undefined) {
					router.push("/messages")
				}
			})
		}
	}
	const sendDm = (id) => {
		if (message !== "") {
			setLoading(true)
			const payload = {
				to: id,
				from: active.id || active._id,
				type: "text",
				text: message,
				dmType: active?.__typename === undefined ? "consumer-to-consumer" : "consumer-to-org",
			}
			socket.emit("send_dm", payload, (response) => {
				setMessage("")
				setShow(response)
				setLoading(false)
				if (query.page !== undefined) {
					router.push("/messages")
				}
			})
		}
	}
	useEffect(() => {
		setActive(user)
		getSingle()
	}, [user])

	useEffect(() => {
		if (socket.connected) {
			socket.emit("get_dms", active?.id || active?._id, (response) => {
				setMessages(response.reverse())
				console.log(response)
			})
		}
	}, [show, active])

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [show])

	const blockUser = (id) => {
		socket.emit(
			"block_message",
			{
				participants: [active.id || active._id, id],
			},
			(response) => console.log("block_message:", response)
		)
	}

	const resolve = (id) => {
		if (star === false) {
			setStar(true)
			return
		}
		socket.emit(
			"send_reviews",
			{
				authorId: active.id,
				messageId: id, // message id,
				rating: rating,
			},
			(response) => {
				console.log("send_reviews:", response)
			}
		)
		setStar(false)
	}
	const speaker = (
		<Popover>
			<div onClick={() => setActive(user)} className="flex m-1 cursor-pointer">
				<img src={user?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
				<div className="text-sm my-auto">{user?.name}</div>
			</div>
			{orgs !== null
				? orgs.map((org: any, index: number) => (
					<div
						onClick={() => {
							setActive(org)
						}}
						key={index}
						className="flex m-1 cursor-pointer"
					>
						<img src={org?.image} className="w-8 h-8 rounded-full mr-4" alt="" />
						<div className="text-sm my-auto">{org?.name}</div>
					</div>
				))
				: null}
		</Popover>
	)

	return (
		<FrontLayout showFooter={false}>
			<div className="flex px-32">
				<div className="w-[40%] overflow-y-auto h-full">
					<div className="text-lg p-3">Messages</div>
					{orgs && (
						<div className="my-2 bg-warning p-2 rounded-md">
							<Whisper placement="bottom" trigger="click" speaker={speaker}>
								<div className="flex justify-between ">
									<div className="flex cursor-pointer">
										<img src={active?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
										<div className="text-sm my-auto">{active?.name}</div>
									</div>
									<div className="my-auto">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#ffffff" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
											<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
										</svg>
									</div>
								</div>
							</Whisper>
						</div>
					)}
					{messages &&
						messages.map((item, index) => (
							<div key={index} onClick={() => setShow(item)} className="flex p-3 hover:bg-gray-100 cursor-pointer">
								<img src={item.users[0]._id !== active?.id || active._id ? item.users[0].image : item.users[1].image} className="w-10 h-10 rounded-full" alt="" />
								<div className="w-2/3 ml-4">
									<div className="text-base font-bold">{item.users[0]._id !== active?.id || active._id ? item.users[0].name : item.users[1].name}</div>
									<div className="text-sm">{item.messages[item.messages.length - 1].text?.substring(0, 50)} {item.messages[item.messages.length - 1].file ? "file" : ""}</div>
								</div>
								<div className="w-32 text-xs ml-auto">
									<ReactTimeAgo date={new Date(item.updatedAt)} />
								</div>
							</div>
						))}
				</div>
				<div className="w-[45%] shadow-md fixed right-32 h-full">
					{show === null ? (
						<div className="text-center text-sm"></div>
					) : (
						<div className="h-[60%] overflow-y-auto">
							<div className="p-2 text-center text-xs text-gray-400 border-b border-gray-200">
								<ReactTimeAgo date={new Date(show?.createdAt)} />
							</div>
							<div className="p-3">
								<div className="flex mb-3">
									<img src={show.users[0]._id !== active?.id || active._id ? show.users[0].image : show.users[1].image} className="w-12 h-12 rounded-full" alt="" />
									<div className="ml-4 my-auto">
										<div className="text-sm">{show.users[0]._id !== active?.id || active._id ? show.users[0].name : show.users[1].name}</div>
										<div className="text-xs">
											<ReactTimeAgo date={new Date(show.updatedAt)} />
										</div>
									</div>
								</div>
								{show.messages.map((item, index) =>
									item.from === active?.id || active._id ? (
										<div key={index} className="text-xs my-2 p-1 bg-gray-200 w-1/2 ml-auto rounded-md">
											{item.text}
											<img src={item?.file} alt="" />
										</div>
									) : (
										<div key={index} className="text-xs my-2">
											{item.text}
											<img src={item?.file} alt="" />
										</div>
									)
								)}
								<div ref={bottomRef} />
							</div>
						</div>
					)}
					{
						show?.blocked !== true ? (show !== null || query.page !== undefined ? (
							<div className="fixed bottom-0 w-[45%] bg-white ">
								<div className="flex relative">
									<textarea
										onChange={(e) => setMessage(e.target.value)}
										className="w-full h-32 text-sm p-2 border border-white"
										placeholder="Write a message"
										value={message}
									></textarea>
									<Dropdown placement="topStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
										{show?.type === "customer-org" && (
											<Dropdown.Item>
												<span onClick={() => resolve(active.id || active._id)}>Resolve</span>
											</Dropdown.Item>
										)}
										<Dropdown.Item>Make a Testimony</Dropdown.Item>
										<Link href={`/report?page=${show?.participants[0] || query.page}`}>
											<Dropdown.Item>Report User/Ad</Dropdown.Item>
										</Link>
										<Dropdown.Item>
											<span onClick={() => blockUser(show?.participants[0] || query.page)}>Block User</span>
										</Dropdown.Item>
									</Dropdown>
									{star === true && (
										<div className="absolute z-10 top-0 left-0 w-full bg-white h-full text-center">
											<p className="text-xl">Rate the performance of this Organization</p>
											<div className="flex my-2 justify-center cursor-pointer">
												<div onClick={() => setRating(1)} className="mx-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill={rating >= 1 ? "#F7A607" : "#D9D9D9"}
														className="bi bi-star-fill"
														viewBox="0 0 16 16"
													>
														<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
													</svg>
												</div>
												<div onClick={() => setRating(2)} className="mx-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill={rating >= 2 ? "#F7A607" : "#D9D9D9"}
														className="bi bi-star-fill"
														viewBox="0 0 16 16"
													>
														<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
													</svg>
												</div>
												<div onClick={() => setRating(3)} className="mx-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill={rating >= 3 ? "#F7A607" : "#D9D9D9"}
														className="bi bi-star-fill"
														viewBox="0 0 16 16"
													>
														<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
													</svg>
												</div>
												<div onClick={() => setRating(4)} className="mx-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill={rating >= 4 ? "#F7A607" : "#D9D9D9"}
														className="bi bi-star-fill"
														viewBox="0 0 16 16"
													>
														<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
													</svg>
												</div>
												<div onClick={() => setRating(5)} className="mx-2">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill={rating >= 5 ? "#F7A607" : "#D9D9D9"}
														className="bi bi-star-fill"
														viewBox="0 0 16 16"
													>
														<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
													</svg>
												</div>
											</div>
											<p className="text-xm">“ Give reasons why you are rating “</p>
											<div onClick={() => resolve(show.id)} className="text-sm text-warning cursor-pointer px-3 float-right mb-10">
												Send
											</div>
										</div>
									)}
								</div>
								{star === false ? (
									<div className="flex justify-between border-t border-gray-200 p-3">
										<div className="flex w-20 justify-between">
											<img onClick={() => uploadRef.current?.click()} className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
											<img onClick={() => uploadRef.current?.click()} className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/charm_camera-video.svg" alt="" />
											<img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/bi_file-earmark-arrow-down.svg" alt="" />
										</div>
										<input type="file" ref={uploadRef} className="d-none" onChange={handleImage} />
										<div className="flex">
											{filesPreview.map((file, index) => (
												<div key={index} className="relative w-20 h-20 mx-1">
													<img src={file} className="w-12 h-12" alt="" />
												</div>
											))}
										</div>
										{
											filesPreview.length >= 1 ? (
												<div onClick={() => sendFile(show?.participants[0] || query.page)} className="text-sm text-warning cursor-pointer">
													{loading ? <Loader /> : "Send"}
												</div>) : (
												<div onClick={() => sendDm(show?.participants[0] || query.page)} className="text-sm text-warning cursor-pointer">
													{loading ? <Loader /> : "Send"}
												</div>
											)
										}
										{/* <div onClick={() => sendDm(show?.participants[0] || query.page)} className="text-sm text-warning cursor-pointer">
											Send
										</div> */}
									</div>
								) : null}
							</div>
						) : <div className="p-4 text-center">
							<img className="w-40 mx-auto h-40" src="/images/lolo.jpeg" alt="" />
							<h5 className="my-4">Chat with your connections.</h5>
							<p>Go to My Connections and followers or following to send message.</p>
							<Link href={'/connection?page=followers'}>
								<button className="bg-warning px-4 text-white p-2 my-4 rounded-sm">connections</button>
							</Link>
						</div>) : <div className="text-center text-gray-400">You have been blocked this user</div>
					}
				</div>
			</div>
		</FrontLayout>
	)
}

export default messages
