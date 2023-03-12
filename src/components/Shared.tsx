import React, { useState } from "react"
import ReactTimeAgo from "react-time-ago"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import Interaction from "./Interaction"

const Shared = ({ shared }: { shared: any }) => {
	const author = useRecoilValue(UserAtom)
	const [more, setMore] = useState(shared.itemBody.length > 250 ? true : false)

	return (
		<div className="p-3 border-b border-gray-400 my-3">
			<div className="flex justify-between border-b border-gray-200 pb-3">
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={shared.author?.image} alt="" />
					<div className="ml-2">
						<div className="text-base font-bold capitalize">
							{shared.author?.name} <span className="text-xs">{author?.id === shared.author?._id ? ". You" : ""}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="text-sm p-2 ">{shared.body}</div>
			<div className="px-2">
				<div className="flex justify-between border-b border-gray-200 pb-3">
					<div className="flex">
						<img className="w-12 h-12 rounded-full" src={shared.creatorImage} alt="" />
						<div className="ml-2">
							<div className="text-base font-bold capitalize">
								{shared.creatorName} <span className="text-xs">{shared?.creatorId === author?.id ? ". You" : ""}</span>
							</div>
							<div className="text-base">
								{shared.creatorName} created this post <ReactTimeAgo date={new Date(shared.createdAt)} />
							</div>
						</div>
					</div>
				</div>
				{more ? (
					<div className="text-sm p-2 leading-loose">
						{shared.itemBody.slice(0, 250)}{" "}
						<span className="text-warning underline" onClick={() => setMore(!more)}>
							..see more
						</span>
					</div>
				) : (
					<div className="text-sm p-2 leading-loose">
						{shared.itemBody}
						{shared.itemBody.length > 250 ? (
							<span className="text-warning underline" onClick={() => setMore(!more)}>
								see less
							</span>
						) : null}
					</div>
				)}
				{shared.itemImage.length > 0 ? <img className="w-full h-80 rounded-md object-cover" src={shared?.itemImage[0]} alt="" /> : null}
			</div>
			<Interaction post={shared} />
		</div>
	)
}

export default Shared
