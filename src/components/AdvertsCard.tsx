import React, { useState } from "react"
import { Dropdown } from "rsuite"
import ReactTimeAgo from "react-time-ago"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import Interaction from "./Interaction"
import HideComp from "./HideComp"
import { SERVER_URL } from "utils/constants"
import { FOLLOW } from "apollo/queries/generalQuery"
import { print } from "graphql"

interface IProps {
	advert: any;
	timeLine?: boolean;
}

const AdvertsComp = ({ advert, timeLine }: IProps): JSX.Element => {
	const author = useRecoilValue(UserAtom)
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
			<div className=" border-b border-gray-200 pb-3">
				{/* <div className="flex justify-between"> */}
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={advert.author.image} alt="" />
					<div className="ml-2 w-full">
						<div className="text-base capitalize">
							{advert.author.name} <span className="text-xs">{author?.id === advert.author._id ? ". You" : ""}</span>
						</div>
						<div className="text-xs">
							<ReactTimeAgo date={new Date(advert.createdAt)} locale="en-US" />
						</div>
					</div>
					{timeLine ? searchForValue(advert.author._id) ? null : <div className="w-[15%] ml-auto text-sm">
						{following ? <span>Followed</span> : <span onClick={() => follow(advert.author._id)} className="cursor-pointer">+ Follow</span>}
					</div> : <HideComp id={advert._id} />}
				</div>
				{/* </div> */}
				<div>sponsored</div>
			</div>
			<div className="p-2">
				<img className="w-full h-80  object-cover rounded-md" src={advert.image} alt="" />
			</div>
			<div className="text-sm p-2 leading-loose">{advert.message}</div>
			<div className="pt-3 flex justify-between">
				<div className="w-2/3">{advert.email}</div>
				<div>
					<a href={advert.link}>
						<button className="p-2 bg-warning text-white">{advert.action}</button>
					</a>
				</div>
				{/* <Dropdown placement="leftStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
					{author?.id === advert.author._id && <Dropdown.Item>Edit</Dropdown.Item>}
					<Dropdown.Item>
						<span onClick={() => share()}>Share ads</span>
					</Dropdown.Item>
				</Dropdown> */}
			</div>
			<Interaction post={advert} />
			<ToastContainer />
		</div>
	)
}

export default AdvertsComp
