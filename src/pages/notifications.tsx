import React, { useEffect, useState } from "react"
import FrontLayout from "layout/FrontLayout"
import NotificationComp from "components/NotificationComp"
// import { SERVER_URL } from "utils/constants"
// import { io } from "socket.io-client"
import { socket } from "pages/_app"

import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"

const notifications = () => {
	const user = useRecoilValue(UserAtom)
	const [notification, setNotifications] = useState<any>(null)
	// const socket = io(SERVER_URL, {
	// 	query: {
	// 		user_id: user?.id,
	// 	},
	// })
	useEffect(() => {
		// console.log(socket)
		// socket.on("connect", function () {
		if (socket.connected) {
			socket.emit("notifications", user?.id, (response) => {
				setNotifications(response.notications)
				console.log(response)
			})
		}
		// })
	}, [user])


	return (
		<FrontLayout>
			<div className="mx-32">
				<div className="p-3 pl-8 border-b border-gray-200 text-lg">Notifications</div>
				{notification &&
					notification?.map((item, index) => (
						<div key={index}>
							<NotificationComp item={item} />
						</div>
					))}
			</div>
		</FrontLayout>
	)
}

export default notifications
