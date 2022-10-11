import { gql, useQuery } from "@apollo/client";
import axios from "axios";
import FrontLayout from "layout/FrontLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";
import dayjs from "dayjs";
import Checkbox from "../../components/CheckBox";
import SendMsgModel from "../../components/campaign-comp/SendMessage";
import { useRouter } from "next/router";
import { apollo } from "apollo";
import { GET_CAMPAIGNS } from "apollo/queries/campaignQuery";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import socketIOClient from "socket.io-client";
import { TOKEN_NAME, WS_URI } from "../../utils/constants";
import cookie from "js-cookie";


// const GET_CAMPAIGNS = gql`
// 	{
// 		getCampaigns {
// 			title
// 			id
// 			slug
// 			target
// 			aim
// 			status
// 			views
// 			promoted
// 			createdAt
// 			endorsements {
// 				id
// 			}
// 			author {
// 				firstName
// 				lastName
// 				id
// 				email
// 				phone
// 			}
// 		}
// 	}
// `;

interface campaign_id {
	id: string,
}

export interface Notification {
	message: string;
	createdAt: string
}

export interface Reports {
	reportCampMessage: string;
	createdAt: string
	reportCampType: string
	campaignSlug: string
	_id: string
}

const ManageCampaignPage = (): JSX.Element => {
	const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
	const [users, setUsers] = useState([])
	const [reports, setReport] = useState<Reports[]>([])
	const token = cookie.get(TOKEN_NAME);
	const [notification, setNotification] = useState<Notification[]>([])
	const router = useRouter();

	// const io = socketIOClient(WS_URI as string, {
	// 	extraHeaders: { Authorization: token || "" },
	// })

	// io.on('get-campaigns', msg => {
	// 	setNotification(msg)
	// })
	// console.log(notification)

	useEffect(() => {
		axios.get(`/user`)
			.then(function (response) {
				// console.log(response.data);
				setUsers(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})

		axios.get('/reports')
			.then(function (response) {
				console.log(response);
				setReport(response.data)
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])
	const resolve = (id: any) => {
		axios.put(`/campaign/report/${id}`)
			.then(function (response) {
				console.log(response.data);
				setReport(response.data)
				router.push(`/mycamp/manage`)
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	const { loading } = useQuery(GET_CAMPAIGNS, {
		client: apollo,
		onCompleted: (data) => {
			// console.log(data.getCampaigns)
			setCampaigns(
				data.getCampaigns.map((item: any) => ({ ...item, checked: false }))
			);
		},
		onError: (error) => console.log(error),
	});



	const deleteCampaign = async (id: string) => {
		console.log(id);
		const confirmed = confirm("Do you want to delete campaign ?");
		if (!confirmed) return;

		try {
			await axios.delete(`/campaign/single/${id}`);
			setCampaigns(campaigns.filter((camp) => camp.id !== id));
			toast("Deleted");
		} catch (error) {
			console.log(error);
		}
	};

	const approveCampaign = async (id: string) => {
		try {
			const { data } = await axios.post("/campaign/approve", {
				campaign_id: id,
			});

			setCampaigns(
				campaigns.map((camp) =>
					camp.id === id ? { ...(camp as any), status: data?.status } : camp,
				),
			);

			toast("Updated");
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(campaigns)
	let promoted = 0;

	campaigns.map((camp) => {
		if (camp.promoted === true) {
			promoted++
		}
	})

	// Show message model
	const [showModal, setShowModal] = useState(false);

	// Handling selecting 
	const [campIds, setCampIds] = useState<campaign_id[]>([])

	const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Find and update checked Info
		const camp = campaigns.find(item => item.id.toString() === e.target.id.toString())
		if (camp != undefined) {
			camp.checked = !camp?.checked
		}
		// setCampaigns(campaigns)
		console.log(campaigns)
	};

	const submit = (e: any) => {
		console.log(e)
	}

	return (
		<FrontLayout>
			<Wrapper className="container">
				{/* <SendMsgModel show={showModal} onHide={() => setShowModal(false)} submit={submit} /> */}
				{loading ? (
					<div className="my-10 w-full text-center">
						{/* <img className="mx-auto" src="/images/logo.svg" alt="" /> */}
						<div className="my-4">
							<div className="text-xl">Hold on while we Process your request</div>
							<div className="text-base">Ensure your internet is stable</div>
						</div>
						<Link href="/mycamp">
							<button className="px-12 bg-warning p-2 my-3 rounded-md">
								Go back
							</button>
						</Link>
					</div>
				) : (
					<div>
						<div>
							<div className="text-lg">Overview</div>
							<div className="lg:flex justify-between mt-4">
								<div className="lg:w-80 p-3 my-2 bg-success text-white text-center rounded-md">
									Total No. of  Campaigns
									<div className="text-2xl font-bold">{campaigns?.length}</div>
								</div>
								<div className="lg:w-80 p-3 my-2 bg-success text-white text-center rounded-md">
									Total No. of Campaigners
									<div className="text-2xl font-bold">{users?.length}</div>
								</div>
								<div className="lg:w-80 p-3 my-2 bg-success text-white text-center rounded-md">
									No. of Promoted Campaigns
									<div className="text-2xl font-bold">{promoted}</div>
								</div>
							</div>
						</div>
						<div className="mt-4 lg:flex">
							<div className="lg:w-3/5 lg:flex lg:mr-4 pt-9 justify-between">
								<div className="border border-green-800 rounded-md lg:w-80">
									<div className="bg-green-800 text-white p-3 ">
										All Campaigns
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											<div className="p-1 h-1 w-1 mt-2 bg-green-300 mr-3"></div>
											Promoted Campaigns</div>
										<span className="text-xs pt-1">60%</span>
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											<div className="p-1 h-1 w-1 mt-2 bg-yellow-300 mr-3"></div>
											Pending Campaigns</div>
										<span className="text-xs pt-1">60%</span>
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											<div className="p-1 h-1 w-1 mt-2 bg-red-300 mr-3"></div>
											Failed Campaigns</div>
										<span className="text-xs pt-1">60%</span>
									</div>
								</div>
								<div className="border border-green-800 rounded-md lg:w-72 lg:ml-3">
									<div className="bg-green-800 text-white p-3 ">
										User Roles
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											State Reps </div>
										<span className="text-xs pt-1">60</span>
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											Legal World </div>
										<span className="text-xs pt-1">60</span>
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											Lawyers </div>
										<span className="text-xs pt-1">60</span>
									</div>
									<div className="p-2 flex justify-between">
										<div className="flex">
											Supervisors </div>
										<span className="text-xs pt-1">60</span>
									</div>
								</div>
							</div>
							<div className="lg:w-1/2">
								<div className="text-lg mb-2">Activities</div>
								<div>
									<div className="border border-green-800 rounded-md">
										<div className="bg-green-800 text-white p-3 ">
											Recent Notifications
										</div>
										<div className="">
											{notification.slice(0, 6).map((notice, i) => (
												<div key={i} className="flex justify-between p-2">
													<div className="flex">
														<img src="/images/logo.svg" className="w-6 h-6 mr-3" alt="" />
														<div>{notice.message}</div>
													</div>
													<div className="text-xs">{notice.createdAt.slice(0, 10)}</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="lg:flex mt-5">
							<div className="lg:w-1/2 lg:mr-3">
								<div className="border border-green-800 rounded-md">
									<div className="bg-green-800 text-white p-3 ">
										Payments / Transaction
									</div>
									<div className="p-2">
										<div className="flex justify-between">
											<img src="/images/logo.svg" className="w-6 h-6" alt="" />
											<div><strong>Hillary Duff</strong> Endorsed <strong>Freedom for Lora</strong></div>         Just Now
										</div>
									</div>

								</div>
							</div>
							<div className="lg:w-1/2">
								<div className="border border-green-800 rounded-md">
									<div className="bg-green-800 text-white p-3 ">
										Case Reports
									</div>
									<div>
										<div className="accordion" id="accordionExample">
											{reports?.map((report, i) => (
												<div key={i} className="accordion-item">
													<h2 className="accordion-header" id="headingOne">
														<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + report?.reportCampMessage.substring(0, 3)+i} aria-expanded="true" aria-controls={report?.reportCampMessage.substring(0, 3)+i}>
															<div>
																<div>{report?.reportCampType} </div>
															</div>
														</button>
													</h2>
													<div id={report?.reportCampMessage.substring(0, 3)+i} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
														<div className="accordion-body">
															{report?.reportCampMessage}
															<div>Created At: {report?.createdAt.slice(0, 10)}</div>
															<div className="flex mt-2 justify-between tect-xs">
																<button onClick={() => router.push(`/campaigns/${report?.campaignSlug}`)} className="p-1 text-white bg-warning">View Campaign</button>
																<button onClick={() => resolve(report?._id)} className="p-1 text-white bg-green-800">Resolve</button>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="campaign-page">
							<h1 className="text-center fs-3 mb-5 mt-3">Mange campaign</h1>
							<div className="flex w-full justify-between">
								<div>
									<button className="btn btn-success text-white mr-2" onClick={() => setShowModal(true)}>Send Email</button>
									<button className="btn btn-success text-white">Send SMS</button>
								</div>
								<div>
									<label htmlFor="all" className="font-bold">Select All <input id="all" className="rounded text-[#9bad58]" type="checkbox" /></label>
								</div>
							</div>
							{loading ? (
								<div className="text-center">
									<Loader className="text-center" content="fetching campaigns..." />
								</div>
							) : (
								<div className="campaign-table">
									<table className="table">
										<thead>
											<tr>
												<th>Title</th>
												<th>Date Created</th>
												<th className="text-center"> Promotion <br /> Amount | target</th>
												<th> Views </th>
												<th> Endorsements </th>
												<th> Country/State </th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{campaigns?.map((campaign, i) => (
												<tr key={i}>
													{/* <td><Checkbox
														handleChange={handleChangeA}
														isChecked={i.checked}
														label={`${campaign.id}`}
													/></td> */}
													<td>
														<i
															className={`fas fa-dot-circle me-2 ${campaign?.status === "Pending"
																? "text-warning"
																: "text-success"
																}`}
														></i>
														<Link href={`/campaigns/${campaign?.slug}`}>
															<a className="text-decoration-none">
																{campaign?.title}
																<br />
																<div className="flex">
																	<svg
																		width="15"
																		height="15"
																		xmlns="http://www.w3.org/2000/svg"
																		viewBox="0 0 448 512"
																	>
																		<path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>
																	<span className="pl-1">{campaign?.authorName}</span>
																</div>

																<div className="flex">
																	<svg
																		width="15"
																		height="15"
																		xmlns="http://www.w3.org/2000/svg"
																		viewBox="0 0 192 512"
																	>
																		<path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z" />
																	</svg>
																	<span className="pl-1">
																		{campaign?.target}
																	</span>
																</div>
															</a>
														</Link>
													</td>
													<td>{dayjs(campaign?.createdAt).format("DD/MM/YYYY")}</td>
													<td className="text-center"> 0   |   0 </td>
													<td>{Number(campaign?.views?.length)}</td>
													<td>{Number(campaign?.endorsements?.length) + 1}</td>
													<td>Nigeria</td>
													<td>
														<div className="dropdown">
															<button
																className="btn btn-sm p-0"
																data-bs-toggle="dropdown"
																aria-expanded="false"
															>
																<i className="fas fa-ellipsis-v"></i>
															</button>
															<ul className="dropdown-menu">
																<li onClick={() => approveCampaign(campaign?.id)}>
																	<a className="dropdown-item c-hand">
																		{campaign?.status === "Pending"
																			? "Approve"
																			: "Pend"}
																	</a>
																</li>

																<li onClick={() => deleteCampaign(campaign?.id)}>
																	<a className="dropdown-item c-hand">
																		Promote
																	</a>
																</li>
																<li onClick={() => deleteCampaign(campaign?.id)}>
																	<a className="dropdown-item c-hand">
																		Edit
																	</a>
																</li>
																<li onClick={() => deleteCampaign(campaign?.id)}>
																	<a className="dropdown-item c-hand text-danger">
																		Delete
																	</a>
																</li>
															</ul>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				)}
				<ToastContainer />
			</Wrapper>
		</FrontLayout >
	);
};

export default ManageCampaignPage;

const Wrapper = styled.div``;
