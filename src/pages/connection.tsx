import React, { useState, useEffect } from "react"
import FrontLayout from "layout/FrontLayout"
import ConnectionCard from "../components/ConnectionCard"
import { CONNECTIONS } from "apollo/queries/generalQuery"
import { IUser } from "types/Applicant.types"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import router, { useRouter } from "next/router"

import { FOLLOW, FOLLOWERS, FOLLOWING } from "apollo/queries/generalQuery"

const connection = () => {
	const { query } = useRouter()
	const [users, setUsers] = useState<IUser[]>([])
	const [followers, setFollowers] = useState<IUser[]>([])
	const [following, setFollowing] = useState<IUser[]>([])
	const author = useRecoilValue(UserAtom)
	const [active, setActive] = useState(query.page || "connect")

	const getUsers = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(CONNECTIONS),
				variables: {
					authorId: author.id,
				},
			})
			console.log(data)
			setUsers(data.data.connections)
		} catch (e) {
			console.log(e)
		}
	}
	const getFollowers = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(FOLLOWERS),
				variables: {
					userId: author.id,
				},
			})
			// console.log(data)
			setFollowers(data.data.getUserFollowers)
		} catch (e) {
			console.log(e)
		}
	}
	const getFollowing = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(FOLLOWING),
				variables: {
					userId: author.id,
				},
			})
			// console.log(data)
			setFollowing(data.data.getUserFollowing)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getUsers()
		getFollowers()
		getFollowing()
	}, [users, followers, following])

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
			getUsers()
			getFollowers()
			getFollowing()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<FrontLayout>
			<div className="mx-32 shadow-sm p-6">
				<div className="flex">
					<input type="text" className="p-3 w-96 rounded-full pl-10 text-sm" placeholder="Search" />
					<div onClick={() => setActive("connect")} className={active === "connect" ? "border-b border-warning my-auto mx-4" : " my-auto mx-4"}>
						People You may Know
					</div>
					<div onClick={() => setActive("followers")} className={active === "followers" ? "border-b border-warning my-auto mx-4" : " my-auto mx-4"}>
						Followers
					</div>
					<div onClick={() => setActive("following")} className={active === "following" ? "border-b border-warning my-auto mx-4" : " my-auto mx-4"}>
						Following
					</div>
				</div>
				<div className="flex flex-wrap">
					{active === "connect"
						? users.map((user, index) =>
								user._id !== author.id ? (
									<div key={index} className="w-[25%] p-6">
										<img src={user.image} className="w-20 h-20 rounded-full" alt="" />
										<div className="text-xl py-2">{user.name} </div>
										<div className="w-16 h-[1px] bg-gray-200"></div>
										<div className="text-xs text-gray-700 my-3">500 Followers</div>
										<div className="text-xs text-gray-900 my-6" onClick={() => follow(user._id)}>
											+ Follow
										</div>
									</div>
								) : null
						  )
						: active === "followers"
						? followers.map((user, index) => (
								<div key={index} className="w-[25%] p-6">
									<img src={user.image} className="w-20 h-20 rounded-full" alt="" />
									<div className="text-xl py-2">{user.name} </div>
									<div className="w-16 h-[1px] bg-gray-200"></div>
									{/* <div className="text-xs text-gray-700 my-3">500 Followers</div> */}
									<div className="text-sm border border-warning p-3 text-gray-900 my-6 text-center rounded-md">Send message</div>
								</div>
						  ))
						: active === "following"
						? following.map((user, index) => (
								<div key={index} className="w-[25%] p-6">
									<img src={user.image} className="w-20 h-20 rounded-full" alt="" />
									<div className="text-xl py-2">{user.name} </div>
									<div className="w-16 h-[1px] bg-gray-200"></div>
									{/* <div className="text-xs text-gray-700 my-3">500 Followers</div> */}
									<div className="text-xs text-gray-900 my-6" onClick={() => follow(user.id)}>
										Unollow
									</div>
									<div className="text-sm border border-warning p-3 text-gray-900 my-6 text-center rounded-md">Send message</div>
								</div>
						  ))
						: null}
				</div>
			</div>
		</FrontLayout>
	)
}

export default connection
