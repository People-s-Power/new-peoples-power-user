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
import Interaction from "./Interaction"

const Victory = ({ post }: { post: any }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const handelClick = () => setOpenPost(!openPost)
	const [openPost, setOpenPost] = useState(false)
	const [content, setContent] = useState("")

	// const share = async () => {
	// 	try {
	// 		const { data } = await axios.post("share", {
	// 			body: "share",
	// 			author: author.id,
	// 			itemId: post._id,
	// 		})
	// 		console.log(data)
	// 		toast.success("Victory has been shared")
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	// const like = async () => {
	// 	try {
	// 		const { data } = await axios.post(SERVER_URL + "/graphql", {
	// 			query: print(LIKE),
	// 			variables: {
	// 				authorId: author.id,
	// 				itemId: post._id,
	// 			},
	// 		})
	// 		toast.success("Victory liked successfully")
	// 		console.log(data)
	// 	} catch (error) {
	// 		console.log(error)
	// 		toast.warn("Oops! Something went wrong")
	// 	}
	// }
	// function liked(id, array) {
	// 	return array.some((obj) => obj._id === id)
	// }
	// const comment = async (id) => {
	// 	if (content.length === 0) return
	// 	try {
	// 		const { data } = await axios.post(SERVER_URL + "/graphql", {
	// 			query: print(COMMENT),
	// 			variables: {
	// 				authorId: author.id,
	// 				itemId: id,
	// 				content: content,
	// 			},
	// 		})
	// 		toast.success("Comment sent")
	// 		console.log(data)
	// 	} catch (error) {
	// 		console.log(error)
	// 		toast.warn("Oops! Something went wrong")
	// 	}
	// }

	return (
		<div className="p-3 border mb-3">
			<div className=" border-b border-gray-200 pb-3">
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={post.author?.image} alt="" />
					<div className="ml-2">
						<div className="text-base font-bold capitalize">
							{post.author?.name} <span className="text-xs">{author?.id === post.author?._id ? ". You" : ""}</span>
						</div>
						<div className="text-base">Shared this victory/testimony</div>
					</div>
				</div>
				<div className="text-sm my-1">{post.author.description}</div>
			</div>
			<div className="text-sm p-2 leading-loose">{post.body}</div>
			<div className="p-2">
				<img src={post?.image} className="w-full h-80 rounded-md object-cover" alt="" />
			</div>
			{/* <div className="text-sm leading-loose p-2">
			</div> */}
			<Interaction post={post} />

			<CreatePost open={openPost} handelClick={handelClick} post={post} handelPetition={handelClick} orgs={null} />
			<ToastContainer />
		</div>
	)
}

export default Victory
