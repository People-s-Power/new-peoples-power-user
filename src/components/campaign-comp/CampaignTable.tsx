import { UserCampaignAtom } from "atoms/UserAtom";
import ShareIcon from "components/ShareIcon";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";
import { CampaignShareMenuList } from "./Share";

const CampaignTable = ({ campaigns }: { campaigns: any }): JSX.Element => {
	// const campaigns = useRecoilValue<ICampaign[]>(UserCampaignAtom);
	// console.log(campaigns);
	return (
		<div>
			<div className="container">
				<Table className="table table-striped">
					<thead className="thead bg-warning text-white">
						<tr className="table-row">
							<th>All Campaigns</th>
							<th>Date Created</th>
							<th> Status </th>
							{/* <th> Promotion amount  </th> */}
							{/* <th> Promotion target  </th> */}
							<th> Views </th>
							<th> Endorsements </th>
							<th> Action </th>
							<th></th>
						</tr>
					</thead>
					<tbody className="tbody">
						{campaigns?.map((camp: any, i: any) => (
							<SingleRow key={i} camp={camp} />
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default CampaignTable;

const Table = styled.table`
	.tbody {
		.table-row {
			a {
				img {
					width: 3rem;
					object-fit: cover;
					margin-right: 1rem;
				}
			}
		}
	}
`;

const SingleRow = ({ camp }: { camp: ICampaign }) => {
	return (
		<tr className="table-row">
			<td>
				<Link href={`/campaigns/${camp?.slug}`}>
					<a className="text-decoration-none link-dark">
						<img src={camp?.image || camp?.image[0]} alt="" />
						{camp?.title || camp?.caption || camp?.name}
					</a>
				</Link>
			</td>
			<td>{dayjs(camp?.createdAt).format("DD/MM/YYYY")}</td>
			<td>
				<i
					className={`fas me-2 ${camp?.status === "Pending"
						? "text-warning fa-dot-circle"
						: "text-success fa-check-circle"
						}`}
				></i>
				{/* {camp.status} */}
			</td>
			{/* <td className="text-center"> 0 </td> */}
			{/* <td className="text-center">{camp?.numberOfPaidViewsCount}</td> */}
			<td> {camp?.views?.length} </td>
			<td> {Number(camp?.endorsements?.length) + 1} </td>
			<td>
				<Link href={`/promote?slug=${camp?._id}&views`}>
					<a className="btn p-0">{camp?.promoted ? "Upgrade" : "Promote"}</a>
				</Link>

				{/* <Link href={`/editcamp?page=${camp?.slug}`}>
					<a className="btn pl-2">Edit</a>
				</Link>

				<Link href={`/updates?page=${camp?.id}?slug=${camp?.slug}`}>
					<a className="btn pl-2">Add Updates</a>
				</Link> */}
			</td>

			<td>
				<CampaignShareMenuList camp={camp}>
					<span className="btn pr-1">
						<ShareIcon />
					</span>
				</CampaignShareMenuList>
			</td>
		</tr>
	);
};

