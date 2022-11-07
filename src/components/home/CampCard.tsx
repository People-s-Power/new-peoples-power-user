import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";
import { truncateWord } from "utils";

const CampaignCard = ({ camp }: { camp: ICampaign }): JSX.Element => {
	function isValidUrl(string: any) {
		try {
			new URL(string);
			return true;
		} catch (err) {
			return false;
		}
	}
	return (
		<Wrapper>
			<div className="shadow-md overflow-hidden rounded-md w-full">
				{/* <Link href={`/campaigns/${camp?.slug}`}> */}
				<a className="text-decoration-none link-dark">
					<img src={camp?.image} className="card-image h-52 w-full" alt={camp?.title} />
					<div className="card-body p-3">
						<Link href={`/user?page=${camp?.authorId}`}>
							<div className="flex cursor-pointer" onClick={() => localStorage.setItem("page", `${camp?.authorId}`)}>
								{isValidUrl(camp?.authorImg) ? (
									<img className="w-8 h-8 rounded-full" src={camp?.authorImg} alt="" />
								) : (
									<img className="w-8 h-8 opacity-50" src="/images/user.png" alt="" />
								)}
								<p className="pl-2 mt-2">{camp?.authorName}</p>
							</div>
						</Link>
						<p className="card-title fs-5 fw-bold capitalize">
							{camp?.title?.length > 30
								? `${camp?.title?.slice(0, 30)}...`
								: camp?.title}
						</p>
						<p className="card-text break-all">{camp?.body.substring(0, 230)}</p>
						<p className=" fst-italic">
							<i className="fa fa-users mr-3"></i>
							{(camp?.endorsements?.length) + 1} Supporters
						</p>
						<Link href={`/campaigns/${camp?.slug}`}>
							<button className="btn btn-warning">Read More</button>
						</Link>
					</div>
				</a>
				{/* </Link> */}
			</div>
		</Wrapper>
	);
};

export default CampaignCard;
const Wrapper = styled.div``;
