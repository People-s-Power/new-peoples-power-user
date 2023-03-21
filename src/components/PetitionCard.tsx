import React, { useState, useEffect } from "react"
import { Dropdown } from "rsuite"
import ReactTimeAgo from "react-time-ago"
import Link from "next/link"
import StartPetition from "./modals/StartPetition"
import CreateVictories from "./modals/CreateVictories"
import { GET_ORGANIZATIONS, GET_ORGANIZATION } from "apollo/queries/orgQuery"
import { useQuery } from "@apollo/client"
import { apollo } from "apollo"
import { IOrg } from "types/Applicant.types"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import AddUpdates from "./modals/AddUpdates"
import axios from "axios"
import ShareModal from "./modals/ShareModal"
import Interaction from "./Interaction"

const PetitionComp = ({ petition }: { petition: any }): JSX.Element => {
	const author = useRecoilValue(UserAtom)
	const [open, setOpen] = useState(false)
	const handelPetition = () => setOpenPetition(!openPetition)
	const [openPetition, setOpenPetition] = useState(false)
	const handelVictory = () => setOpenVictory(!openVictory)
	const [openVictory, setOpenVictory] = useState(false)
	const handelUpdates = () => setOpenUpdates(!openUpdates)
	const [openUpdates, setOpenUpdates] = useState(false)
	const [orgs, setOrgs] = useState<IOrg[]>([])

	useQuery(GET_ORGANIZATIONS, {
		variables: { ID: author?.id },
		client: apollo,
		onCompleted: (data) => {
			// console.log(data.getUserOrganizations)
			setOrgs(data.getUserOrganizations)
		},
		onError: (err) => {
			// console.log(err)
		},
	})

	author.orgOperating.map((org) => {
		useQuery(GET_ORGANIZATION, {
			variables: { ID: org },
			client: apollo,
			onCompleted: (data) => {
				// console.log(data)
				setOrgs([...orgs, data.getOrganzation])
			},
			onError: (err) => {
				console.log(err.message)
			},
		})
	})

	const deletePetition = () => {
		axios.delete(`petition/single/${petition.id}`).then((response) => {
			console.log(response.data)
			toast("Petition Deleted Successfully")
		})
		// .then((error) => {
		//     console.log(error);
		//     toast.warn("Oops an error occoured!")
		// })
	}

	return (
		<div className="p-3 border-b border-gray-400 my-3">
			<div className="">
				<Link href={`/user?page=${petition.authorId}`}>
					<div className="flex">
						<img className="w-12 h-12 rounded-full" src={petition.author.image} alt="" />
						<div className="ml-2">
							<div className="text-base capitalize">
								{petition.author.name} <span className="text-xs">{author?.id === petition.author._id ? ". You" : ""}</span>
							</div>
							<div className="text-xs">
								{" "}
								<ReactTimeAgo date={new Date(petition.createdAt)} />
							</div>
						</div>
					</div>
				</Link>
				<div className="text-sm my-1">{petition.author.description}</div>
			</div>
			<div className="text-sm p-2 leading-loose">{petition.excerpt}</div>
			<div className="p-2">
				<img className="w-full h-80 rounded-md object-cover	" src={petition.image} alt="" />
			</div>
			<Interaction post={petition} />
			{/* <div className="pt-3 flex justify-between">
				<Link href={`/campaigns/${petition?.slug}`}>
					<div className="flex cursor-pointer">
						<img className="w-8 h-8 my-auto" src="/images/home/icons/ion_finger-print-sharp.png" alt="" />
						<div className="text-sm my-auto ml-2 bg-warning p-2 rounded-sm">Endorse petition</div>
					</div>
				</Link>
				<div className="flex cursor-pointer" onClick={() => setOpen(!open)}>
					<img className="w-8 h-8 my-auto" src="/images/home/icons/clarity_share-line.svg" alt="" />
					<div className="text-sm my-auto ml-2">{petition.shares} Shares</div>
				</div>
				<Link href={`/campaigns/${petition?.slug}`}>
					<div className="flex">
						<img className="w-8 h-8 my-auto" src="/images/home/icons/akar-icons_people-group.png" alt="" />
						<div className="text-sm my-auto ml-2">{petition.endorsements.length} endorsements</div>
					</div>
				</Link>
				<Dropdown placement="leftStart" title={<img className="h-6 w-6" src="/images/edit.svg" alt="" />} noCaret>
					<Link href={`/promote?slug=${petition?.slug}`}>
						<Dropdown.Item>Promote</Dropdown.Item>
					</Link>
					{author?.id === petition.author._id ? (
						<div>
							<Dropdown.Item onClick={() => handelVictory()}>Celebrate Victory</Dropdown.Item>
							<Dropdown.Item onClick={() => handelUpdates()}>Update</Dropdown.Item>
							<Dropdown.Item onClick={() => handelPetition()}>Edit</Dropdown.Item>
							<Dropdown.Item onClick={() => deletePetition()}>Delete</Dropdown.Item>
						</div>
					) : null}
				</Dropdown>
			</div> */}
			<AddUpdates open={openUpdates} handelClick={handelUpdates} petition={petition} />
			<StartPetition open={openPetition} handelClick={handelPetition} data={petition} orgs={null} />
			<CreateVictories open={openVictory} handelClick={handelVictory} victory={petition} />
			<ToastContainer />
			<ShareModal open={open} handelClick={() => setOpen(!open)} single={petition} orgs={orgs} />
		</div>
	)
}

export default PetitionComp
