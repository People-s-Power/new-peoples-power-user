import React, { useState, useEffect } from "react"
import FrontLayout from "layout/FrontLayout"
import { SERVER_URL } from "utils/constants"
import { io } from "socket.io-client"
import ReactTimeAgo from "react-time-ago"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import router, { useRouter } from "next/router"

const messages = () => {
	const user = useRecoilValue(UserAtom)
	const [message, setMessage] = useState<any>("")
	const [messages, setMessages] = useState<any>(null)
	const [active, setActive] = useState<any>(null)
	const { query } = useRouter()

	const socket = io(SERVER_URL, {
		query: {
			user_id: user?.id,
		},
	})
	const sendDm = (id) => {
		if (message !== "") {
			const payload = {
				to: id,
				from: user.id,
				type: "text",
				text: message,
				dmType: "consumer-to-consumer",
			}
			socket.emit("send_dm", payload, (response) => {
				setMessage("")
				setActive(response)
				if (query.page !== undefined) {
					router.push("/messages")
				}
			})
		}
	}

	useEffect(() => {
		socket.on("connect", function () {
			socket.emit("get_dms", user.id, (response) => {
				setMessages(response)
				// console.log(response)
			})
		})
	}, [user, active])
	return (
		<FrontLayout showFooter={false}>
			<div className="flex px-32">
				<div className="w-[40%] overflow-y-scroll h-full">
					<div className="text-lg p-3">Messages</div>
					{messages &&
						messages.map((item, index) => (
							<div key={index} onClick={() => setActive(item)} className="flex p-3 hover:bg-gray-100">
								<img src={item.users[0].image} className="w-10 h-10 rounded-full" alt="" />
								<div className="w-2/3 ml-4">
									<div className="text-base font-bold">{item.users[0].name}</div>
									<div className="text-sm">{item.messages[item.messages.length - 1].text}</div>
								</div>
								<div className="w-32 text-xs ml-auto">
									<ReactTimeAgo date={new Date(item.updatedAt)} />
								</div>
							</div>
						))}
				</div>
				<div className="w-[40%] shadow-sm fixed right-32 h-full overflow-y-scroll">
					{active === null ? (
						<div className="text-center text-sm"></div>
					) : (
						<div>
							<div className="p-2 text-center text-xs text-gray-400 border-b border-gray-200">
								<ReactTimeAgo date={new Date(active?.createdAt)} />
							</div>
							<div className="p-3 border-b border-warning">
								<div className="flex mb-3">
									<img src={active.users[0].image} className="w-12 h-12 rounded-full" alt="" />
									<div className="ml-4 my-auto">
										<div className="text-sm">{active.users[0].name}</div>
										<div className="text-xs">
											<ReactTimeAgo date={new Date(active.updatedAt)} />
										</div>
									</div>
								</div>
								{active.messages.map((item, index) =>
									item.from === user.id ? (
										<div key={index} className="text-xs my-2 p-1 bg-warning w-1/2 ml-auto rounded-md text-right">
											{item.text}
										</div>
									) : (
										<div key={index} className="text-xs my-2">
											{item.text}
										</div>
									)
								)}
							</div>
						</div>
					)}
					{active !== null || query.page !== undefined ? (
						<div>
							<textarea
								onChange={(e) => setMessage(e.target.value)}
								className="w-full h-32 text-sm p-2 border border-white"
								placeholder="Write a message"
								value={message}
							></textarea>
							<div className="flex justify-between border-t border-gray-200 p-3">
								<div className="flex w-20 justify-between">
									<img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
									<img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/charm_camera-video.svg" alt="" />
									<img className="w-4 h-4 my-auto  cursor-pointer" src="/images/home/icons/bi_file-earmark-arrow-down.svg" alt="" />
								</div>
								<div onClick={() => sendDm(active?.participants[0] || query.page)} className="text-sm text-warning cursor-pointer">
									Send
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</FrontLayout>
	)
}

export default messages
