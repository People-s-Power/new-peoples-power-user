import Link from "next/link"
import React from "react"
import ReactTimeAgo from "react-time-ago"
import { INTERESTED } from "apollo/queries/eventQuery"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"

const NotificationComp = ({ item }: { item: any }) => {
	const author = useRecoilValue(UserAtom)
	const interested = async (event: any) => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(INTERESTED),
				variables: {
					eventId: event.itemId,
					authorId: author.id,
					authorImg: author.image,
					name: author.name,
				},
			})
			console.log(data)
			toast.success("Registered successfully")
		} catch (error) {
			console.log(error)
			toast.warn("Oops an error occoured!")
		}
	}
	return (
		<div className="border-b mx-auto border-gray-200 p-3 flex">
			<img src={item.authorImage} className="w-16 h-16 rounded-full my-auto" alt="" />
			<div className="ml-6 my-auto">
				<div className="text-base w-[80%]">{item.message}</div>
				<div>
					{(() => {
						switch (item.event) {
							case "Created-Advert":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Advert</button>
							case "Created-Victory":
								return (
									<Link href={`/messages?page=${item.authorId}`}>
										<button className="btn text-warning border border-warning p-2 px-20 my-2">Say Congrats</button>
									</Link>
								)
							case "Created-Petition":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Petition</button>
							case "Created-Post":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Post</button>
							case "Created-Event":
								return (
									<button onClick={() => interested(item)} className="btn text-warning border border-warning p-2 px-20 my-2">
										Attend Event
									</button>
								)
						}
					})()}
				</div>
			</div>
			<div className="ml-auto w-32 rounded-md text-xs text-gray-700">
				<ReactTimeAgo date={new Date(item.createdAt)} />
			</div>
			<ToastContainer />
		</div>
	)
}
export default NotificationComp
