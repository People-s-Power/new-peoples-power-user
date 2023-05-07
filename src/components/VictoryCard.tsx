import React, { useState } from "react"
import { Dropdown } from "rsuite"
import ReactTimeAgo from "react-time-ago"
import CreatePost from "./modals/CreatePost"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SHARE, LIKE, COMMENT, FOLLOW } from "apollo/queries/generalQuery"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import Interaction from "./Interaction"
import HideComp from "./HideComp"

interface IProps {
	post: any;
	timeLine?: boolean;
}

const Victory = ({ post, timeLine }: IProps): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const handelClick = () => setOpenPost(!openPost)
	const [openPost, setOpenPost] = useState(false)
	const [content, setContent] = useState("")
	const [following, setFollowing] = useState(false)

	const follow = async (id) => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(FOLLOW),
				variables: {
					followerId: author.id,
					followId: id,
				},
			})
			console.log(data)
			setFollowing(true)
		} catch (error) {
			console.log(error)
		}
	}

	function searchForValue(id) {
		let matchingStrings = false;
		for (const string of author.following) {
			if (string.includes(id)) {
				matchingStrings = true
			}
		}
		return matchingStrings;
	}


	return (
		<div className={timeLine ? "p-3 mb-3" : "p-3 border rounded-md mb-3"}>
			<div className="border-b border-gray-200 pb-3">
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={post.author?.image} alt="" />
					<div className="ml-2">
						<div className="text-base font-bold capitalize">
							{post.author?.name} <span className="text-xs">{author?.id === post.author?._id ? ". You" : ""}</span>
						</div>
						<div className="text-base">Shared this victory/testimony</div>
					</div>
					{timeLine ? searchForValue(post.author._id) ? null : <div className="w-[15%] ml-auto">
						{following ? <span>Followed</span> : <span onClick={() => follow(post.author._id)} className="cursor-pointer">+ Follow</span>}
					</div> : <HideComp id={post._id} />}
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
