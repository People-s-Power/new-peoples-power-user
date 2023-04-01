/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react"
import FrontLayout from "layout/FrontLayout"
import Head from "next/head"
import axios from "axios"
import { useRouter } from "next/router"
import { IUser } from "types/Applicant.types"
import { ADD_OPERATOR, GET_ORGANIZATION, DELETE_OPERATOR, EDIT_OPERATOR } from "apollo/queries/orgQuery"
import { apollo } from "apollo"
import { useQuery } from "@apollo/client"
import { print } from "graphql"
import { SERVER_URL } from "utils/constants"
import { Tooltip, Whisper, Button, ButtonToolbar } from "rsuite"
import { Modal } from "rsuite"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import user from "./user"

export interface Operator {
	userId: string
	role: string
}

const addadmin = () => {
	const [admins, setAdmins] = useState(true)
	const [admin, setAdmin] = useState(true)
	const [users, setUsers] = useState<IUser[]>([])
	const [searched, setSearched] = useState<IUser[]>([])
	const { query } = useRouter()
	const [role, setRole] = useState("")
	const [adminTag, setAdminTag] = useState(false)
	const [editor, setEditor] = useState(false)
	const [loading, setLoading] = useState(false)
	const [clicked, setClicked] = useState(false)
	const [operator, setOperator] = useState<Operator[]>([])
	const [operators, setOperators] = useState<IUser[]>([])
	const [open, setOpen] = useState(false)
	const [id, setId] = useState("")
	const [userId, setUserId] = useState<any>("")

	const router = useRouter()

	useQuery(GET_ORGANIZATION, {
		variables: { ID: query.page },
		client: apollo,
		onCompleted: (data) => {
			console.log(data.getOrganzation.operators)
			setOperator(data.getOrganzation.operators)
		},
		onError: (err) => console.log(err),
	})

	useEffect(() => {
		axios
			.get(`/user`)
			.then(function (response) {
				setUsers(response.data)
				allAdmins()
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [operator])

	const allAdmins = () => {
		setOperators([])
		const list: any = []
		operator.map((single: any) => {
			users.map((user: any) => {
				if (user.id === single.userId) {
					list.push({ ...user, ...{ role: single.role } })
					setOperators(list)
				}
			})
		})
		console.log(operators)
	}

	const addAdmin = async () => {
		try {
			setLoading(true)
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				// client: apollo,
				query: print(ADD_OPERATOR),
				variables: {
					CreateOperator: {
						userId: id,
						role: role,
						orgId: query.page,
					},
				},
			})
			setLoading(false)
			console.log(data)
			toast.success("Admin added successfully!")
			location.reload()
		} catch (error) {
			toast.warn("Oops an error occoured")
		}
	}

	const updateAdmin = async () => {
		try {
			setLoading(true)
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				// client: apollo,
				query: print(EDIT_OPERATOR),
				variables: {
					CreateOperator: {
						userId: userId,
						role: role,
						orgId: query.page,
					},
				},
			})
			setLoading(false)
			console.log(data)
			toast.success("Admin role updated ")
			setOpen(false)
			// location.reload()
		} catch (error) {
			toast.warn("Oops an error occoured")
			setLoading(false)
		}
	}

	const removeAdmin = async (sing: any) => {
		// console.log(sing)
		try {
			setLoading(true)
			const { data } = await axios.post(SERVER_URL + "/graphql", {
				query: print(DELETE_OPERATOR),
				variables: {
					DeleteOperator: {
						userId: sing,
						orgId: query.page,
					},
				},
			})
			console.log(data)
			setLoading(false)
			toast.success("Admin Deleted Successfully!")
			location.reload()
		} catch (error) {
			toast.warn("Oops an error occoured")
		}
	}

	const search = (e: any) => {
		setSearched([])
		users.map((user) => {
			const list = []
			// console.log(typeof user.firstName)
			if (user?.firstName?.toLowerCase() === e.target.value.toLowerCase()) {
				list.push(user)
				// setSearched([...searched, user])
				// console.log(user)
				setSearched(list)
			}
		})
	}
	const adminTooltip = <Tooltip>This person makes, edits, create and promote, posts, petitons, events, update, organization and profile.</Tooltip>
	const editorTooltip = <Tooltip>This person edits posts, petitons, events, update and products.</Tooltip>

	return (
		<FrontLayout>
			<>
				<Head>
					<title>{`CITIZEN PLAINT`} || Add Admin </title>
				</Head>
				<div>
					<div onClick={() => router.back()} className="cursor-pointer lg:ml-20">
						Back
					</div>
					<div className="flex justify-evenly text-center">
						<div
							onClick={() => {
								setAdmin(true), setAdmins(true), allAdmins()
							}}
							className="cursor-pointer "
						>
							<div className="text-3xl font-bold underline">Admins</div>
							<p>Veiw all Admins</p>
						</div>
						<div
							onClick={() => {
								setAdmin(true), setAdmins(false)
							}}
							className="cursor-pointer"
						>
							<div className={"text-xl font-bold underline"}>Add an Admin</div>
							<p>Manage your campaign</p>
						</div>
						<div
							onClick={() => {
								setAdmin(false), setAdmins(false)
							}}
							className="cursor-pointer"
						>
							<div className="text-xl font-bold underline">Hire a trained professionals</div>
							<p>To draft, edit, promote and manage your campaigns with little cost.</p>
						</div>
					</div>
					{admin === true && admins === true ? (
						operators?.length >= 1 ? (
							operators.map((org, i) => (
								<div key={i} className="w-full flex justify-between px-2 py-1 w-[80%] mx-auto bg-gray-200 my-2">
									<img src={org.image} className="w-12 rounded-full h-12 " alt="" />
									<div className="text-base capitalize ml-4 w-44 my-auto">
										{org?.firstName} {org.lastName}
									</div>
									<div className="my-auto text-xm capitalize w-32">
										{org?.role === "admin" ? (
											<Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={adminTooltip}>
												<button>{org?.role} &#x1F6C8;</button>
											</Whisper>
										) : (
											<Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={editorTooltip}>
												<button>{org?.role} &#x1F6C8;</button>
											</Whisper>
										)}
									</div>
									<div>
										<button
											onClick={() => {
												setOpen(!open), setRole(org.role), setUserId(org?.id)
											}}
											className="bg-transparent w-44 p-2"
										>
											<span>&#x270E;</span> Edit
										</button>
									</div>
									<div
										onClick={() => {
											removeAdmin(org.id)
										}}
										className=" cursor-pointer my-auto"
									>
										&#10006;
									</div>
								</div>
							))
						) : (
							<div className="text-center text-3xl my-4">No Admins yet</div>
						)
					) : null}
					{admin === true && admins === false ? (
						<div className="mt-20 w-2/3 mx-auto">
							<div className="text-center text-3xl font-bold">Add an Admin</div>
							<div className="text-lg my-1">Add Page admin</div>
							<input
								type="text"
								className="p-3 rounded-md border border-gray w-full"
								onChange={(e) => {
									search(e)
								}}
								placeholder="Type here to search for a user to assign role"
							/>
							<div>
								{searched.map((search, i) => (
									<div
										key={i}
										className={
											clicked
												? "bg-gray-400 text-white p-3 text-base mb-1 cursor-pointer "
												: "" + "p-3 bg-gray-100 cursor-pointer hover:bg-gray-200 text-base mb-1"
										}
										onClick={() => {
											setId(search.id), setClicked(true)
										}}
									>
										{search.firstName} {search.lastName}
									</div>
								))}
							</div>
							<div className="text-lg mt-4">Assign an admin role</div>
							<div>
								<div>
									<div className="flex my-1">
										<div className="my-auto mx-3">
											<input
												disabled={editor}
												type="checkbox"
												className="p-4"
												value="admin"
												checked={role === "admin"}
												onChange={() => {
													setRole("admin")
												}}
											/>
										</div>
										<div className="my-auto">
											<div className="text-lg font-bold">Admin</div>
											{/* <p>Event coverage, Writing and posting of campaigns, Editing of profile and campaigns, Promote campaigns, create an organization, Make update.	</p> */}
										</div>
									</div>
									<div className="flex my-1">
										<div className="my-auto mx-3">
											<input
												disabled={adminTag}
												type="checkbox"
												className="p-4"
												value="editor"
												checked={role === "editor"}
												onChange={() => {
													setRole("editor")
												}}
											/>
										</div>
										<div className="my-auto">
											<div className="text-lg font-bold">Editor</div>
											{/* <p>Edit profile, Edit campaigns and designs</p> */}
										</div>
									</div>
								</div>
							</div>
							<div className="text-center my-4">
								<button onClick={() => addAdmin()} className="p-2 bg-warning w-40 text-white">
									{loading ? "loading" : "Assign"}
								</button>
							</div>
						</div>
					) : admin === false && admins === false ? (
						<div className="mt-20 w-2/3 mx-auto">
							<div className="text-center text-3xl font-bold">Hire a trained professionals</div>
							<div className="text-lg my-1">Leave the complexity of writing, designing and editing your campaigns and other administration to us.</div>
							<div className="text-lg mt-4">
								Our team of content writers, designers, journalists and social skill workers can handle your content, designs, updates and other administrations
								while you focus on building a strong and physical campaigns with momentum.
							</div>
							<div>
								<img src="/images/logo.svg" className="w-16 my-2 h-16 mx-auto" alt="" />
								<div className="font-bold text-lg text-center my-2">
									Evans G, what plan will you like to use? <br />
									We’ll recommend the right plan for you.
								</div>
								<div className="text-base my-2">
									Start your free 1-month trial today. Cancel anytime. We'll send you a reminder 7 days before your trial ends.
								</div>
								<div className="flex my-1 justify-between">
									<div className="my-auto mx-3">
										<input
											onChange={() => {
												setRole("admin")
											}}
											type="checkbox"
											checked={role === "admin"}
											className="p-4"
										/>
									</div>
									<div className="my-auto w-2/3">
										<div className="text-lg font-bold">Admin</div>
										<p>
											Event coverage, Writing and posting of campaigns, Editing of profile and campaigns,
											<br /> Promote campaigns, create an organization, Make update.{" "}
										</p>
									</div>
									<button className="p-2 border borger-warning w-44 mx-1">N35, 000/Monthly</button>
								</div>
								<div className="flex my-3 justify-between">
									<div className="my-auto mx-3">
										<input
											onChange={() => {
												setRole("editor")
											}}
											checked={role === "editor"}
											type="checkbox"
											className="p-4"
										/>
									</div>
									<div className="my-auto w-2/3">
										<div className="text-lg font-bold">Editor</div>
										<p>Edit profile, Edit campaigns and designs</p>
									</div>
									<button className="p-2 border borger-warning w-44 mx-1">N15, 000/Monthly</button>
								</div>
							</div>
							<div className="text-center my-4">
								<button disabled className="p-2 bg-warning w-40 text-white">
									Start
								</button>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
				<ToastContainer />
				<Modal open={open} onClose={() => setOpen(!open)}>
					<div>
						<div className="p-4">Update Admin role</div>
						<div>
							<div>
								<div className="flex my-1">
									<div className="my-auto mx-3">
										<input
											disabled={editor}
											type="checkbox"
											className="p-4"
											value="admin"
											checked={role === "admin"}
											onChange={() => {
												setRole("admin")
											}}
										/>
									</div>
									<div className="my-auto">
										<div className="text-lg font-bold">Admin</div>
										{/* <p>Event coverage, Writing and posting of campaigns, Editing of profile and campaigns, Promote campaigns, create an organization, Make update.	</p> */}
									</div>
								</div>
								<div className="flex my-1">
									<div className="my-auto mx-3">
										<input
											disabled={adminTag}
											type="checkbox"
											className="p-4"
											value="editor"
											checked={role === "editor"}
											onChange={() => {
												setRole("editor")
											}}
										/>
									</div>
									<div className="my-auto">
										<div className="text-lg font-bold">Editor</div>
										{/* <p>Edit profile, Edit campaigns and designs</p> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<Modal.Footer>
						<button className="p-2 bg-transparent w-40" onClick={() => setOpen(!open)}>
							Cancel
						</button>
						<button className="p-2 bg-warning w-40 text-white" onClick={() => updateAdmin()}>
							Update
						</button>
					</Modal.Footer>
				</Modal>
			</>
		</FrontLayout>
	)
}

export default addadmin
