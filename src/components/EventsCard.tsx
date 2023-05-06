import EventModal from "./modals/EventModal"
import React, { useState } from "react"
import { Dropdown } from "rsuite"
import { INTERESTED } from "apollo/queries/eventQuery"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { apollo } from "apollo"
import Interaction from "./Interaction"

const EventsCard = ({ event }: { event: any }) => {
	const [open, setOpen] = useState(false)
	const handelClick = () => setOpen(!open)
	const author = useRecoilValue(UserAtom)

	const interested = async (event: any) => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(INTERESTED),
				variables: {
					eventId: event._id,
					authorId: author.id,
					authorImg: author.image,
					name: author.name,
					email: author.email
				},
			})
			console.log(data)
			{
				data.data === null ? toast.success(data.errors[0].message) : toast.success("Registered successfully!")
			}
			// toast.success(data[0].message)
		} catch (error) {
			console.log(error.response)
			toast.warn("Oops an error occoured!")
		}
	}
	const share = async () => {
		try {
			const { data } = await axios.post("share", {
				body: "share",
				author: author.id,
				itemId: event._id,
			})
			console.log(data)
			toast.success("Event has been shared")
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<div className="rounded-md border mb-3 p-3">
			<div className="border-b border-gray-200 my-3">
				<div className="flex">
					<img className="w-12 h-12 rounded-full" src={event.author.image} alt="" />
					<div className="ml-2">
						<div className="text-base">
							{event.author.name} <span className="text-xs"></span>
						</div>
						<div className="text-xs">{event.author.name} created this as an event</div>
					</div>
				</div>
				<div className="text-sm my-1">{event.author.description}</div>
			</div>
			<div className="text-xl my-3">{event.name}</div>
			<img src={event.image} alt="" className="rounded-md w-full  object-cover h-80" />
			<div className="p-3 text-sm my-auto">
				<div>
					{event.author.name} created event for {event.startDate} AT {event.time}
				</div>
				<div className="text-xl my-3">{event.description}</div>
				<div className="text-sm">{event.type}</div>
				{event.interested[0] === undefined ? null : (
					<div className="flex my-6">
						<div className="flex">
							<img src={event.interested[0]?.image} className="rounded-full w-10 h-10" alt="" />
							<img src={event.interested[1]?.image} className="rounded-full w-10 h-10 -ml-1" alt="" />
						</div>
						<div className="text-sm ml-2">
							{event.interested[0]?.name} and {event.interested?.length} others are attending
						</div>
					</div>
				)}
				<div className="flex ">
					<button onClick={() => interested(event)} className="p-3 bg-warning text-white w-72 rounded-md mr-8">
						Interested
					</button>
					{/* <Dropdown title={<img className="" src="/images/edit.svg" alt="" />} noCaret>
						<Dropdown.Item>
							<span onClick={() => share()}> Share Event </span>
						</Dropdown.Item>
						{event.author.id === author?.id ? <Dropdown.Item>Edit Event</Dropdown.Item> : null}
					</Dropdown> */}
				</div>
				<Interaction post={event} />
			</div>
			{/* <EventModal open={open} handelClick={handelClick} /> */}
			<ToastContainer />
		</div>
	)
}

export default EventsCard
