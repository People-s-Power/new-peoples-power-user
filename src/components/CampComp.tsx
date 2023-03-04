import React, { useState, useEffect } from "react"
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

const CampComp = ({ post }: { post: any }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const handelClick = () => setOpenPost(!openPost)
	const [openPost, setOpenPost] = useState(false)
	const [more, setMore] = useState(post.body.length > 100 ? true : false)
	const [liked, setLiked] = useState(false)
	const [likes, setLikes] = useState(post.likes.length)

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

	useEffect(() => {
		setLiked(post.likes.some((obj) => obj._id === author.id))
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
			// toast.success("Post liked successfully")
			console.log(data)
			setLiked(!liked)
			liked === true ? setLikes(likes - 1) : setLikes(likes + 1)
		} catch (error) {
			console.log(error)
			toast.warn("Oops! Something went wrong")
		}
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
							{post.author.name} created this post <ReactTimeAgo date={new Date(post.createdAt)} />
						</div>
					</div>
				</div>
			</div>
			{more ? (
				<div className="text-sm p-2 leading-loose">
					{post.body.slice(0, 100)}{" "}
					<span className="text-warning underline" onClick={() => setMore(!more)}>
						..see more
					</span>
				</div>
			) : (
				<div className="text-sm p-2 leading-loose">
					{post.body}
					{post.body.length > 100 ? (
						<span className="text-warning underline" onClick={() => setMore(!more)}>
							see less
						</span>
					) : null}
				</div>
			)}
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
			<Interaction post={post} />
			<CreatePost open={openPost} handelClick={handelClick} post={post} handelPetition={handelClick} orgs={null} />
			<ToastContainer />
		</div>
	)
}

export default CampComp
