import React, { useState, useEffect } from "react"
import FrontLayout from "layout/FrontLayout"
// import ConnectionCard from "../components/ConnectionCard"
import { CONNECTIONS } from "apollo/queries/generalQuery"
import { IUser } from "types/Applicant.types"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { useRouter } from "next/router"
import { FOLLOW, UNFOLLOW, FOLLOWERS, FOLLOWING } from "apollo/queries/generalQuery"
import Link from "next/link"
import FollowCard from "components/FollowCard"

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
					authorId: author?.id,
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
					userId: author?.id,
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
					userId: author?.id,
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
	}, [author, active])


	const search = (value) => {
		if (value === "") {
			getUsers()
			getFollowers()
			getFollowing()
			return
		}
		const matchingStrings = []
		for (const string of active === "connect" ? users : active === "followers" ? followers : active === "following" ? following : null) {
			if (string.name.toLowerCase().includes(value)) {
				matchingStrings.push(string);
			}
		}
		active === "connect" ? setUsers(matchingStrings) : active === "followers" ? setFollowers(matchingStrings) : active === "following" ? setFollowing(matchingStrings) : null
		// setMessages(matchingStrings)
	}

	return (
		<FrontLayout showFooter={false}>
			<div className="mx-32 shadow-sm p-6">
				<div className="flex">
					<input type="text" onChange={(e) => search(e.target.value)} className="p-3 w-96 rounded-full pl-10 text-sm" placeholder="Search" />
					<div onClick={() => setActive("connect")} className={active === "connect" ? "border-b border-warning my-auto mx-4 cursor-pointer" : " my-auto mx-4 cursor-pointer"}>
						People You may Know
					</div>
					<div onClick={() => setActive("followers")} className={active === "followers" ? "border-b border-warning my-auto mx-4 cursor-pointer" : " my-auto mx-4 cursor-pointer"}>
						Followers
					</div>
					<div onClick={() => setActive("following")} className={active === "following" ? "border-b border-warning my-auto mx-4 cursor-pointer" : " my-auto mx-4 cursor-pointer"}>
						Following
					</div>
				</div>
				<div className="my-4">
					{
						active === "followers" ? <p className="text-sm">You have {followers.length} followers who share their activities with you</p> : active === "following" ? <p className="text-sm">You are following {following.length} users who you share your activities with </p> : null
					}
				</div>
				<div className="flex flex-wrap">
					{active === "connect"
						? users.map((user, index) =>
							user._id !== author.id ? (
								<FollowCard user={user} />
							) : null
						)
						: active === "followers"
							? followers.map((user, index) => (
								<div key={index} className="w-[25%] p-6">
									<Link href={`user?page=${user._id}`}>
										<div className="cursor-pointer">
											<img src={user.image} className="w-20 h-20 rounded-full" alt="" />
											<div className="text-xl py-2">{user.name} </div>
										</div>
									</Link>
									<div className="w-16 h-[1px] bg-gray-200"></div>
									<div className="text-xs text-gray-700 my-3">{user.followers.length} Followers</div>
									<Link href={`/messages?page=${user._id}`}>
										<div className="text-sm border border-warning p-3 text-gray-900 my-6 text-center rounded-md cursor-pointer">Send message</div>
									</Link>
								</div>
							))
							: active === "following"
								? following.map((user, index) => (
									<div key={index} className="w-[25%] ">
										<Following user={user} getFollowing={() => getFollowing()} />
									</div>
								))
								: null}
				</div>
			</div>
		</FrontLayout>
	)
}

export default connection

function Following({ user, getFollowing }) {
	const author = useRecoilValue(UserAtom)
	const [loading, setLoading] = useState(false)
	const unfollow = async (id) => {
		setLoading(true)
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(UNFOLLOW),
				variables: {
					followerId: author.id,
					unfollowId: id,
				},
			})
			console.log(data)
			setLoading(false)
			getFollowing()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="p-6">
			<Link href={`user?page=${user._id}`}>
				<div className="cursor-pointer">
					<img src={user.image} className="w-20 h-20 rounded-full" alt="" />
					<div className="text-xl py-2">{user.name} </div>
				</div>
			</Link>
			<div className="w-16 h-[1px] bg-gray-200"></div>
			<div className="text-xs text-gray-700 my-3">{user.followers.length} Followers</div>
			{loading ? <p className="text-xs text-gray-900">loading...</p> : <div className="text-xs cursor-pointer text-gray-900 my-6" onClick={() => unfollow(user._id)}>
				Unfollow
			</div>}
			<Link href={`/messages?page=${user._id}`}>
				<div className="text-sm border border-warning p-3 text-gray-900 my-6 text-center rounded--md cursor-pointer">Send message</div>
			</Link>
		</div>
	)
}