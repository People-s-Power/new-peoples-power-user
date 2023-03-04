import React, { useState } from "react"
import { Dropdown } from "rsuite"
import ReactTimeAgo from "react-time-ago"
import CreatePost from "./modals/CreatePost"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SHARE, LIKE, COMMENT } from "apollo/queries/generalQuery"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"

const CampComp = ({ post }: { post: any }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const handelClick = () => setOpenPost(!openPost)
	const [openPost, setOpenPost] = useState(false)
	const [content, setContent] = useState("")
	const [comments, setComments] = useState(false)

	const share = async () => {
		try {
			const { data } = await axios.post("share", {
				body: "share",
				author: author.id,
				itemId: post._id,
			})
			console.log(data)
			toast.success("Post has been shared")
		} catch (err) {
			console.log(err)
		}
	}

	const like = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(LIKE),
				variables: {
					authorId: author.id,
					itemId: post._id,
				},
			})
			toast.success("Post liked successfully")
			console.log(data)
		} catch (error) {
			console.log(error)
			toast.warn("Oops! Something went wrong")
		}
	}

	const comment = async (id) => {
		if (content.length === 0) return
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(COMMENT),
				variables: {
					authorId: author.id,
					itemId: id,
					content: content,
				},
			})
			toast.success("Comment sent")
			console.log(data)
		} catch (error) {
			console.log(error)
			toast.warn("Oops! Something went wrong")
		}
	}

	function liked(id, array) {
		return array.some((obj) => obj._id === id)
	}

	return (
		<div className="p-3 border-b border-gray-400 my-3">
			<div className="flex justify-between border-b border-gray-200 pb-3">
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={post.author?.image} alt="" />
					<div className="ml-2">
						<div className="text-base font-bold capitalize">
							{post.author?.name} <span className="text-xs">{author?.id === post.author?._id ? ". You" : ""}</span>
						</div>
						<div className="text-base">
							{post.author.name} created this post <ReactTimeAgo date={new Date(post.createdAt.substring(0, 10))} />
						</div>
					</div>
				</div>
			</div>
			<div className="text-sm p-2 leading-loose">{post.body}</div>
			<div className="p-2">
				<img className="w-full h-50 rounded-md" src={post.image[0]} alt="" />
				{author?.id === post.author?._id ? (
					<div className="text-gray-400 p-1">N:B : At least 10 persons must support this post in order to make a petition</div>
				) : null}
				{author?.id === post.author?._id && post.likes >= 10 ? (
					<div>
						<div className="text-gray-400 p-1">
							N:B : With more than 10 persons supporting this camplaint concern we recomend thatyou make this post a petition/campaign for the issues raised to
							be addresed.Making this post a petition will send your campaign to the right person/authority who will address it.
						</div>
						<button className="border border-black p-2">Start Petition</button>
					</div>
				) : null}
				{post.isPetition === true ? (
					<div>
						<div className="text-gray-400 p-1">N:B: There is a petition for this post</div>
						<button className="border border-black p-2">View Petition</button>
					</div>
				) : null}
			</div>
			<div className="pt-3 flex justify-between">
				{/* <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_people-group.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Supports</div>
                </div> */}
				<div className="flex" onClick={() => like()}>
					<img className="w-8 h-8" src="/images/home/icons/ant-design_like-outlined.svg" alt="" />
					<div className={liked(author.id, post.likes) ? "text-warning text-sm my-auto ml-2" : "text-sm my-auto ml-2"}>{post.likes?.length} likes</div>
				</div>
				<div className="flex" onClick={() => setComments(!comments)}>
					<img className="w-8 h-8" src="/images/home/icons/akar-icons_chat-bubble.svg" alt="" />
					<div className="text-sm my-auto ml-2">{post.comments?.length} Comments</div>
				</div>
				<div className="flex" onClick={() => share()}>
					<img className="w-8 h-8" src="/images/home/icons/clarity_share-line.svg" alt="" />
					<div className="text-sm my-auto ml-2">{post.shares} Shares</div>
				</div>
				<Dropdown placement="leftStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
					{/* <Link href={`/promote?slug=${post?.slug}`}>
                        <Dropdown.Item>Promote</Dropdown.Item>
                    </Link> */}
					<Dropdown.Item>Report post</Dropdown.Item>
					{post.author?._id === author?.id ? <Dropdown.Item onClick={handelClick}>Edit</Dropdown.Item> : null}
					<Dropdown.Item>Save</Dropdown.Item>
				</Dropdown>
			</div>
			{comments === true ? (
				<div>
					<div className="flex border-t border-gray-200 p-2 relative">
						<img src={author.image} className="w-10 h-10 mr-3 rounded-full my-auto" alt="" />
						<input type="text" onChange={(e) => setContent(e.target.value)} className="p-2 w-full border border-black text-sm" placeholder="Write a comment" />
						<img src="./images/send.png" onClick={() => comment(post._id)} className="w-6 h-6 absolute top-4 right-6" alt="" />
					</div>
					{post.comments.length > 0
						? post.comments?.map((comment, index) => (
								<div key={index} className="flex p-2">
									<img src={comment.author.image} className="w-10 h-10 mr-3 my-auto rounded-full" alt="" />
									<div className="w-full bg-gray-100 p-2 flex justify-between">
										<div className="">
											<div className="font-bold text-sm mt-1">{comment.author.name}</div>
											<div className="text-xs mt-1">{comment.content}</div>
										</div>
										<div className="text-sm">{/* <ReactTimeAgo date={new Date(comment.date)} /> */}</div>
									</div>
								</div>
						  ))
						: null}
				</div>
			) : null}
			<CreatePost open={openPost} handelClick={handelClick} post={post} handelPetition={handelClick} orgs={null} />
			<ToastContainer />
		</div>
	)
}

export default CampComp
