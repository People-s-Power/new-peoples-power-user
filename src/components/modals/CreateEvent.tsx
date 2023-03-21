/* eslint-disable react/react-in-jsx-scope */
import { Modal } from "rsuite"
import { useState, useRef } from "react"
import { CREATE_EVENT } from "apollo/queries/eventQuery"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"

const CreateEvent = ({ open, handelClick }: { open: boolean; handelClick(): void }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const [image, setFilePreview] = useState({
		type: "",
		file: "",
		name: "",
	})
	const [name, setName] = useState("")
	const [des, setDes] = useState("")
	const [endDate, setEndDate] = useState("")
	const [startDate, setStartDate] = useState("")
	const [time, setTime] = useState("")
	const [type, setType] = useState("")
	const [audience, setAudience] = useState("")

	const uploadRef = useRef<HTMLInputElement>(null)
	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		const reader = new FileReader()

		if (files && files.length > 0) {
			reader.readAsDataURL(files[0])
			reader.onloadend = () => {
				if (reader.result) {
					let type = files[0].name.substr(files[0].name.length - 3)
					// console.log(type)
					setFilePreview({
						type: type === "mp4" ? "video" : "image",
						file: reader.result as string,
						name: files[0].name,
					})
				}
			}
		}
	}
	const handleSubmit = async () => {
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(CREATE_EVENT),
				variables: {
					author: author.id,
					name: name,
					description: des,
					endDate: endDate,
					startDate: startDate,
					time: time,
					type: type,
					imageFile: [image.file],
					audience: audience,
				},
			})
			console.log(data)
			handelClick()
			// setBody("")
			setFilePreview({
				type: "",
				file: "",
				name: "",
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Modal open={open} onClose={handelClick}>
				<Modal.Header>
					<div className="border-b border-gray-200 p-3 w-full">
						<Modal.Title>Create event</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="bg-gray-200 w-full p-4 text-center relative cursor-pointer" onClick={() => uploadRef.current?.click()}>
						{image?.type === "image" && <img onClick={() => uploadRef.current?.click()} src={image.file} width="500" className="h-52 absolute top-0" />}
						<input type="file" ref={uploadRef} className="d-none" onChange={handleImage} />
						<img src="/images/home/icons/ant-design_camera-outlined.svg" className="w-20 h-20 mx-auto" alt="" />
						<div className="text-base my-3">Upload Event Cover Image</div>
						<div className="text-sm my-2 text-gray-800">Cover image should be minimum of 500pxl/width</div>
					</div>
					<div>
						<div className="text-sm my-2 mt-4">Event type</div>
						<div className="flex my-3">
							<div className="flex">
								<input onChange={() => setType("online")} type="radio" checked={type === "online"} className="p-2" />
								<div className="ml-4 text-sm my-auto">Online</div>
							</div>
							<div className="flex ml-8">
								<input onChange={() => setType("offline")} type="radio" checked={type === "offline"} className="p-2" />
								<div className="ml-4 text-sm my-auto">Offline</div>
							</div>
						</div>
					</div>
					<div className="mt-2">
						<div className="text-sm my-1">Title of Event</div>
						<input onChange={(e) => setName(e.target.value)} type="text" className="p-1 border border-gray-700 w-full rounded-sm" />
					</div>
					<div className="mt-2">
						<div className="text-sm my-1">About event</div>
						<textarea onChange={(e) => setDes(e.target.value)} className="p-1 border border-gray-700 w-full h-20 rounded-sm" />
					</div>
					<div className="flex justify-between mt-2">
						<div className="w-[45%]">
							<div className="text-sm my-1">Date</div>
							<input onChange={(e) => setStartDate(e.target.value)} type="date" className="w-full border border-gray-700 text-sm" />
						</div>
						<div className="w-[45%] text-sm">
							<div className="text-sm my-1">Time</div>
							<input type="time" onChange={(e) => setTime(e.target.value)} className="w-full border border-gray-700 text-sm" />
						</div>
					</div>
					<div className="flex justify-between mt-2">
						<div className="w-[45%] text-sm">
							<div className="text-sm my-1">End date</div>
							<input type="date" onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-700 text-sm" />
						</div>
						<div className="w-[45%] text-sm">
							<div className="text-sm my-1">Target audience</div>
							<select name="" id="" onChange={(e) => setAudience(e.target.value)} className="w-full border border-gray-700 text-sm">
								<option value="everyone">Everyone</option>
								<option value="connections">My Connections</option>
								<option value="interest">Interest</option>
								<option value="location">Location</option>
							</select>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={handleSubmit} className="p-1 bg-warning text-white rounded-md w-44 my-4">
						Create Event
					</button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
export default CreateEvent
