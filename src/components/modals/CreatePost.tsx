/* eslint-disable react/react-in-jsx-scope */
import { Modal, Popover, Whisper } from "rsuite"
import { useState, useRef, useEffect } from "react"
import { CREATE_POST, UPDATE_POST } from "apollo/queries/postQuery"
import { Dropdown } from "rsuite"
import axios from "axios"
import { SERVER_URL } from "utils/constants"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"

const CreatePost = ({
	open,
	handelClick,
	post,
	handelPetition,
	orgs,
}: {
	open: boolean
	handelClick(): void
	post: any
	handelPetition(): void
	orgs: any
}): JSX.Element => {
	const [filesPreview, setFilePreview] = useState<any>(post?.image || [])
	const author = useRecoilValue(UserAtom)
	const [active, setActive] = useState<any>(author)
	const [loading, setLoading] = useState(false)
	const [body, setBody] = useState(post?.body || "")
	const uploadRef = useRef<HTMLInputElement>(null)
	const [category, setCategory] = useState("Add Category")

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		const reader = new FileReader()

		if (files && files.length > 0) {
			reader.readAsDataURL(files[0])
			reader.onloadend = () => {
				if (reader.result) {
					setFilePreview([...filesPreview, reader.result as string])
				}
			}
		}
	}
	const clearFile = (index) => {
		const array = filesPreview
		array.splice(index, 1)
		setFilePreview(array)
	}

	const handleSubmit = async () => {
		if (category === "Add Category") return
		setLoading(true)
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(CREATE_POST),
				variables: {
					authorId: active.id || active._id,
					body: body,
					imageFile: filesPreview,
					categories: [category],
				},
			})
			console.log(data)
			handelClick()
			setBody("")
			setFilePreview([])
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleUpdate = async () => {
		setLoading(true)
		try {
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(UPDATE_POST),
				variables: {
					authorId: active._id,
					body: body,
					postId: post._id,
					imageFile: filesPreview,
					categories: [category],
				},
			})
			console.log(data)
			handelClick()
			setBody("")
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		post === null ? setActive(author) : setActive(post.author)
	}, [author !== null])

	const speaker = (
		<Popover>
			<div onClick={() => setActive(author)} className="flex m-1">
				<img src={author?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
				<div className="text-sm my-auto">{author?.name}</div>
			</div>
			{orgs?.map((org: any, index: number) => (
				<div onClick={() => setActive(org)} key={index} className="flex m-1">
					<img src={org?.image} className="w-8 h-8 rounded-full mr-4" alt="" />
					<div className="text-sm my-auto">{org?.name}</div>
				</div>
			))}
		</Popover>
	)

	return (
		<>
			<Modal open={open} onClose={handelClick}>
				<Modal.Header>
					<div className="border-b border-gray-200 p-3 w-full">
						<Modal.Title>Make a post</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body>
					{post === null ? (
						<Whisper placement="bottom" trigger="click" speaker={speaker}>
							<div className="flex">
								<img src={active?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
								<div className="text-sm">{active?.name}</div>
							</div>
						</Whisper>
					) : (
						<div className="flex">
							<img src={active?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
							<div className="text-sm">{active?.name}</div>
						</div>
					)}
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						name=""
						className="w-full h-32 border border-white text-sm"
						placeholder="Start your complaint..."
					></textarea>
				</Modal.Body>
				<div className="z-40">
					<Dropdown placement="topStart" title={<div className="text-sm text-warning">{category}</div>}>
						<Dropdown.Item onClick={() => setCategory("Human right awareness")}>Human right awareness</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Social Policy")}>Social Policy</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Criminal Justice")}>Criminal Justice</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Human Right Action")}>Human Right Action</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Development")}>Development</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Environment")}>Environment</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Health")}>Health</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Politics")}>Politics</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Disability")}>Disability</Dropdown.Item>
						<Dropdown.Item onClick={() => setCategory("Equality")}>Equality</Dropdown.Item>
					</Dropdown>
				</div>
				<Modal.Footer>
					<input type="file" ref={uploadRef} className="d-none" onChange={handleImage} />
					<div className="flex">
						{filesPreview.map((file, index) => (
							<div key={index} className="relative w-20 h-20 mx-1">
								<img src={file} className="w-20 h-20" alt="" />
								<div className="absolute top-1 cursor-pointer right-1 w-4 h-4 rounded-full bg-danger text-sm text-center text-white">
									<div className="mx-auto text-xs my-auto text-white" onClick={() => clearFile(index)}>
										x
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-between text-gray-500">
						<div className="w-24 flex justify-between my-auto">
							<div onClick={() => uploadRef.current?.click()} className="cursor-pointer">
								<img className="w-4 h-4 my-auto" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
							</div>
							<div className="cursor-pointer">
								<img className="w-4 h-4 my-auto" src="/images/home/icons/charm_camera-video.svg" alt="" />
							</div>
							<div className="cursor-pointer">
								<img className="w-4 h-4 my-auto" src="/images/home/icons/fe_sitemap.svg" alt="" />
							</div>
							<div className="cursor-pointer">
								<img className="w-4 h-4 my-auto" src="/images/home/icons/tabler_article.svg" alt="" />
							</div>
						</div>
						<div className="text-sm my-auto">Find Expert</div>
						<div
							className="text-sm my-auto cursor-pointer"
							onClick={() => {
								handelClick(), handelPetition()
							}}
						>
							Make petition
						</div>
						{post === null ? (
							<button onClick={handleSubmit} className="p-1 bg-warning text-white rounded-sm w-20">
								{loading ? "Loading..." : "Post"}
							</button>
						) : (
							<button onClick={handleUpdate} className="p-1 bg-warning text-white rounded-sm w-20">
								{loading ? "Loading..." : "Update"}
							</button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}
export default CreatePost
