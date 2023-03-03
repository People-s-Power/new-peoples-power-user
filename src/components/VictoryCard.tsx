import React, { useState } from "react"
import { Dropdown } from "rsuite"
import ReactTimeAgo from "react-time-ago"
import CreatePost from "./modals/CreatePost"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SHARE, LIKE } from "apollo/queries/generalQuery"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"

const CampComp = ({ post }: { post: any }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const handelClick = () => setOpenPost(!openPost)
	const [openPost, setOpenPost] = useState(false)

	const share = async () => {
		try {
			const { data } = await axios.post("share", {
				body: "share",
				author: author.id,
				itemId: post._id,
			})
			console.log(data)
			toast.success("Victory has been shared")
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
			toast.success("Victory liked successfully")
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
						<div className="text-base">Celebrated this victory/testimony</div>
					</div>
				</div>
			</div>
			<div className="text-sm p-2 leading-loose">{post.body}</div>
			<div className="p-2">
				<img src={post.image} className="w-full h-80 rounded-md object-cover" alt="" />
			</div>
			<div className="text-sm leading-loose p-2">
				Congratulations to all who supported this campaign, on getting a massive victory. Our petition has just won. Lets keep making the change that we need.
			</div>
			<div className="pt-3 flex justify-between">
				<div className="flex" onClick={() => like()}>
					<img className="w-8 h-8" src="/images/home/icons/ant-design_like-outlined.svg" alt="" />
					<div className={liked(author.id, post.likes) ? "text-warning text-sm my-auto ml-2" : "text-sm my-auto ml-2"}>{post.likes?.length} likes</div>
				</div>
				<div className="flex">
					<img className="w-8 h-8" src="/images/home/icons/akar-icons_chat-bubble.svg" alt="" />
					<div className="text-sm my-auto ml-2">{post.comments?.length} Comments</div>
				</div>
				<div className="flex" onClick={() => share()}>
					<img className="w-8 h-8" src="/images/home/icons/clarity_share-line.svg" alt="" />
					<div className="text-sm my-auto ml-2">{post.shares} Shares</div>
				</div>
				{post.author?._id === author?.id ? (
					<Dropdown placement="leftStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
						<Dropdown.Item onClick={handelClick}>Edit</Dropdown.Item>
					</Dropdown>
				) : null}
			</div>
			<CreatePost open={openPost} handelClick={handelClick} post={post} handelPetition={handelClick} orgs={null} />
			<ToastContainer />
		</div>
	)
}

export default CampComp
