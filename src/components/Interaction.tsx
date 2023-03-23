import React, { useState, useEffect } from "react"
import { Dropdown } from "rsuite"
import ReactTimeAgo from "react-time-ago"
import CreatePost from "./modals/CreatePost"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LIKE, COMMENT } from "apollo/queries/generalQuery"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { Loader } from "rsuite"
import { DELETE_POST } from "apollo/queries/postQuery"
import { GET_ORGANIZATIONS, GET_ORGANIZATION } from "apollo/queries/orgQuery"
import { useQuery } from "@apollo/client"
import { apollo } from "apollo"
import { IOrg } from "types/Applicant.types"
import ShareModal from "./modals/ShareModal"
import Link from "next/link"
import CreateAdvert from "./modals/CreateAdvert"
import CreateEvent from "./modals/CreateEvent"
import AddUpdates from "./modals/AddUpdates"
import StartPetition from "./modals/StartPetition"
import CreateVictories from "./modals/CreateVictories"
import { useRouter } from "next/router"
import { DELETE_VICTORIES } from "apollo/queries/victories"

const CampComp = ({ post }: { post: any }): JSX.Element => {
	const router = useRouter()
	const author = useRecoilValue(UserAtom)
	const [openPost, setOpenPost] = useState(false)
	const [openAd, setOpenAd] = useState(false)
	const [openEvent, setOpenEvent] = useState(false)
	const [openPetition, setOpenPetition] = useState(false)

	const handelVictory = () => setOpenVictory(!openVictory)
	const [openVictory, setOpenVictory] = useState(false)
	const handelUpdates = () => setOpenUpdates(!openUpdates)

	const [openUpdates, setOpenUpdates] = useState(false)
	const handelClick = () => setOpenPost(!openPost)
	const handelPetition = () => setOpenPetition(!openPetition)
	const handelAdClick = () => setOpenAd(!openAd)
	const handelEventClick = () => setOpenEvent(!openEvent)

	const [comments, setComments] = useState(false)
	const [liked, setLiked] = useState(false)
	const [likes, setLikes] = useState(post.likes.length)
	const [content, setContent] = useState("")
	const [qty, setQty] = useState(4)
	const [allComment, setAllComment] = useState(post.comments)
	const [loading, setLoading] = useState(false)
	const [orgs, setOrgs] = useState<IOrg[]>([])
	const [open, setOpen] = useState(false)

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
	})

	function isOwner(id) {
		return id === author.id || orgs.some((obj) => obj._id === id)
	}
	author.orgOperating.map((org) => {
		useQuery(GET_ORGANIZATION, {
			variables: { ID: org },
			client: apollo,
			onCompleted: (data) => {
				// console.log(data)
				setOrgs([...orgs, data.getOrganzation])
			},
			onError: (err) => {
				console.log(err.message)
			},
		})
	})
	// }
	useEffect(() => {
		setLiked(post.likes?.some((obj) => obj._id === author.id))
	}, [])

	const like = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(LIKE),
				variables: {
					authorId: author.id,
					itemId: post._id,
				},
			})
			console.log(data)
			setLiked(!liked)
			liked === true ? setLikes(likes - 1) : setLikes(likes + 1)
		} catch (error) {
			console.log(error)
		}
	}
	const promote = (slug) => {
		router.push(`/promote?slug=${slug}`)
	}

	const comment = async (e, id) => {
		if (content.length === 0) return
		if (e.key !== "Enter") return

		try {
			setLoading(true)
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(COMMENT),
				variables: {
					authorId: author.id,
					itemId: id,
					content: content,
				},
			})
			setAllComment([
				{
					author: {
						name: author.name,
						image: author.image,
					},
					content: content,
					date: new Date(),
				},
				...allComment,
			])
			setContent(" ")
			setLoading(false)
			console.log(data)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}
	const deleteVictory = async (id) => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(DELETE_VICTORIES),
				variables: {
					id: id,
				},
			})
			console.log(data)
			toast.success("Victory deleted successfully")
		} catch (error) {
			console.log(error)
			toast.warn("Opps! something occurred")
		}
	}
	const deletePost = async (id) => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(DELETE_POST),
				variables: {
					authorId: id,
					postId: post._id,
				},
			})
			console.log(data)
			toast.success("Post deleted successfully")
		} catch (error) {
			console.log(error)
			toast.warn("Opps! something occurred")
		}
	}

	return (
		<div>
			<div className="pt-3 flex justify-between">
				{liked ? (
					<div className="flex cursor-pointer" onClick={() => like()}>
						<img className="w-8 h-8" src="/images/home/icons/liked.svg" alt="" />
						<div className={"text-warning text-sm my-auto ml-2"}>{likes} likes</div>
					</div>
				) : (
					<div className="flex  cursor-pointer" onClick={() => like()}>
						<img className="w-8 h-8" src="/images/home/icons/ant-design_like-outlined.svg" alt="" />
						<div className={"text-sm my-auto ml-2"}>{likes} likes</div>
					</div>
				)}

				<div className="flex  cursor-pointer" onClick={() => setComments(!comments)}>
					<img className="w-8 h-8" src="/images/home/icons/akar-icons_chat-bubble.svg" alt="" />
					<div className="text-sm my-auto ml-2">{allComment.length} Comments</div>
				</div>
				<div className="flex  cursor-pointer" onClick={() => setOpen(!open)}>
					<img className="w-8 h-8" src="/images/home/icons/clarity_share-line.svg" alt="" />
					<div className="text-sm my-auto ml-2">{post?.shares} Shares</div>
				</div>
				<Dropdown placement="leftStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
					{(() => {
						switch (post.__typename) {
							case "Advert":
								return (
									<div>
										<Link href={`/report?page=${post?._id}`}>
											<Dropdown.Item>Report</Dropdown.Item>
										</Link>
										{isOwner(post.author._id) ? <Dropdown.Item onClick={handelAdClick}>Edit</Dropdown.Item> : null}
									</div>
								)
							case "Event":
								return (
									<div>
										<Link href={`/report?page=${post?._id}`}>
											<Dropdown.Item>Report</Dropdown.Item>
										</Link>
										{isOwner(post.author._id) ? (
											<Dropdown.Item>
												<span onClick={() => promote(post._id)}>Promote</span>{" "}
											</Dropdown.Item>
										) : null}
										{isOwner(post.author._id) ? <Dropdown.Item onClick={handelEventClick}>Edit</Dropdown.Item> : null}
									</div>
								)
							case "Petition":
								return (
									<div>
										<Link href={`/report?page=${post?._id}`}>
											<Dropdown.Item>Report</Dropdown.Item>
										</Link>
										{isOwner(post.author._id) ? (
											<Dropdown.Item>
												<span onClick={() => promote(post.slug)}>Promote</span>
											</Dropdown.Item>
										) : null}
										{isOwner(post.author._id) ? <Dropdown.Item onClick={handelPetition}>Edit</Dropdown.Item> : null}
									</div>
								)
							case "Victory":
								return (
									<div>
										{isOwner(post.author._id) ? <Dropdown.Item onClick={handelVictory}>Edit</Dropdown.Item> : null}{" "}
										{isOwner(post.author._id) ? (
											<Dropdown.Item onClick={() => deleteVictory(post.author._id)}>
												<span className="text-red-500">Delete</span>
											</Dropdown.Item>
										) : null}
									</div>
								)
							case "Post":
								return (
									<div>
										<Link href={`/report?page=${post?._id}`}>
											<Dropdown.Item>Report</Dropdown.Item>
										</Link>
										{isOwner(post.author._id) ? (
											<Dropdown.Item>
												<span onClick={() => promote(post._id)}>Promote</span>
											</Dropdown.Item>
										) : null}{" "}
										{isOwner(post.author._id) ? <Dropdown.Item onClick={handelClick}>Edit</Dropdown.Item> : null}
										{isOwner(post.author._id) ? (
											<Dropdown.Item onClick={() => deletePost(post.author._id)}>
												<span className="text-red-500">Delete</span>
											</Dropdown.Item>
										) : null}
									</div>
								)
							case "Update":
								return (
									<div>
										{isOwner(post.author._id) ? <Dropdown.Item onClick={handelUpdates}>Edit</Dropdown.Item> : null}
										<Link href={`/report?page=${post?._id}`}>
											<Dropdown.Item>Report</Dropdown.Item>
										</Link>
									</div>
								)
							default:
								null
						}
					})()}
				</Dropdown>
			</div>
			{comments === true ? (
				<div>
					<div className="flex border-t border-gray-200 p-2 relative">
						<img src={author.image} className="w-10 h-10 mr-3 rounded-full my-auto" alt="" />
						<input
							type="text"
							value={content}
							onKeyPress={(e) => comment(e, post._id)}
							onChange={(e) => setContent(e.target.value)}
							className="p-2 w-full border border-black text-sm"
							placeholder="Write a comment"
						/>
						<div className="absolute top-4 right-6">
							{loading ? <Loader /> : <img src="./images/send.png" onClick={(e) => comment(e, post._id)} className="w-6 h-6" alt="" />}
						</div>
					</div>
					{allComment.length > 0
						? allComment?.slice(0, qty).map((comment, index) => (
								<div key={index} className="flex p-2">
									<img src={comment.author.image} className="w-10 h-10 mr-3 my-auto rounded-full" alt="" />
									<div className="w-full bg-gray-100 p-2 flex justify-between">
										<div className="">
											<div className="font-bold text-sm mt-1">{comment.author.name}</div>
											<div className="text-xs mt-1">{comment.content}</div>
										</div>
										<div className="text-sm">
											<ReactTimeAgo date={new Date(comment.date)} />{" "}
										</div>
									</div>
								</div>
						  ))
						: null}
					{allComment.length > 4 ? (
						<div onClick={() => setQty(qty + 4)} className="text-base text-warning text-center">
							show more
						</div>
					) : null}
				</div>
			) : null}
			<CreatePost open={openPost} handelClick={handelClick} post={post} handelPetition={handelClick} orgs={null} />
			<StartPetition open={openPetition} handelClick={handelPetition} orgs={orgs} data={post} />
			{/* <FindExpartModal author={author} open={openFindExpart} handelClose={() => setOpenFindExpart(false)} /> */}
			<CreateEvent open={openEvent} handelClick={handelEventClick} event={post} />
			<CreateAdvert open={openAd} handelClick={handelAdClick} advert={post} />
			<AddUpdates open={openUpdates} handelClick={handelUpdates} petition={post} />
			<CreateVictories open={openVictory} handelClick={handelVictory} victory={post} />

			<ToastContainer />
			<ShareModal open={open} handelClick={() => setOpen(!open)} single={post} orgs={orgs} />
		</div>
	)
}

export default CampComp
