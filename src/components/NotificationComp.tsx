import React from "react"
import ReactTimeAgo from "react-time-ago"

const NotificationComp = ({ item }: { item: any }) => {
	return (
		<div className="border-b border-gray-200 p-6 flex">
			<img src={item.authorImage} className="w-24 h-24 rounded-full" alt="" />
			<div className="ml-6 my-auto">
				<div className="text-base w-[80%]">{item.message}</div>
				{/* <div>
					{(() => {
						switch (item.event) {
							case "Created-Advert":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Advert</button>
							case "Created-Victory":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Victory</button>
							case "Created-Petition":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Petition</button>
							case "Created-Post":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Post</button>
							case "Created-Event":
								return <button className="btn text-warning border border-warning p-2 px-20 my-2">Attend Event</button>
						}
					})()}
				</div> */}
			</div>
			<div className="ml-auto w-32 rounded-md text-xs text-gray-700">
				<ReactTimeAgo date={new Date(item.createdAt)} />
			</div>
		</div>
	)
}
export default NotificationComp
