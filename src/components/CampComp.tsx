import React, { useState, useEffect } from "react"
import ReactTimeAgo from "react-time-ago"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Interaction from "./Interaction"
import HideComp from "./HideComp"


interface IProps {
	open?: any;
	post: any;
	openPetition?: any;
	timeLine?: boolean;
}

const CampComp: React.FC<IProps> = ({ post, open, openPetition, timeLine }: IProps): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const [more, setMore] = useState(post.body.length > 250 ? true : false)

	return (
		<div className={timeLine ? "p-3 mb-3" : "p-3 border rounded-md mb-3"}>
			<div className="border-b border-gray-200 pb-3">
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={post.author?.image} alt="" />
					<div className="ml-2 w-full">
						<div className="text-base font-bold capitalize">
							{post.author?.name} <span className="text-xs">{author?.id === post.author?._id ? ". You" : ""}</span>
						</div>
						<div className="text-base">
							{post.author.name} created this post <ReactTimeAgo date={new Date(post.createdAt)} />
						</div>
					</div>
					{timeLine ? null : <HideComp id={post._id} />}
				</div>
				<div className="text-sm my-1">{post.author.description}</div>
			</div>
			{more ? (
				<div className="text-sm p-2 leading-loose">
					{post.body.slice(0, 250)}{" "}
					<span className="text-warning underline" onClick={() => setMore(!more)}>
						..see more
					</span>
				</div>
			) : (
				<div className="text-sm p-2 leading-loose">
					{post.body}
					{post.body.length > 250 ? (
						<span className="text-warning underline" onClick={() => setMore(!more)}>
							see less
						</span>
					) : null}
				</div>
			)}
			<div className="p-2">
				{post.image.length > 0 ? <img className="w-full h-80 rounded-md object-cover" src={post?.image[0]} alt="" /> : null}
				{author?.id === post.author?._id ? (
					<div className="text-gray-400 p-1">Hello {author.name}, you can  resolve your complaint speedily by finding an expert or converting your complaint to a petition
						<button className="border border-warning p-1 mt-1 mr-4 text-black rounded-md bg-white" onClick={() => open()}>Find Expert</button>
						<button className="border border-warning p-1 mt-1 text-black rounded-md bg-white" onClick={() => openPetition()}>Start Petition</button>
					</div>
				) : null}
				{author?.id === post.author?._id && post.likes >= 10 ? (
					<div>
						<div className="text-gray-400 p-1">
							N:B : With more than 10 persons supporting this camplaint concern we recomend thatyou make this post a petition/campaign for the issues raised to
							be addresed.Making this post a petition will send your campaign to the right person/authority who will address it.
						</div>
						<button className="border border-black p-2" onClick={() => openPetition()}>Start Petition</button>
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
			<ToastContainer />
		</div>
	)
}

export default CampComp
