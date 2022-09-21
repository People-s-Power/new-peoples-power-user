import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { MY_CAMPAIGN } from "apollo/queries/campaignQuery";
import { UserAtom } from "atoms/UserAtom";
import Slider from "components/camp-slider/Slider";
import CampaignTable from "components/campaign-comp/CampaignTable";
import { Wrapper } from "components/styled/style";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import authGuard from "hooks/authGuard";
import FrontLayout from "layout/FrontLayout";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ICampaign } from "types/Applicant.types";
import { apollo } from "apollo";

dayjs.extend(relativeTime);

const MyCamp: NextPage = (): JSX.Element => {
	const user = useRecoilValue(UserAtom);

	const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
	// const loading = true;

	const { loading } = useQuery(MY_CAMPAIGN, {
		client: apollo,
		onCompleted: (data) => setCampaigns(data.myCampaign),
		onError: (e) => console.log(e),
	});
	
	return (
		<FrontLayout showFooter={false}>
			<>
				<Head>
					<title>{`PEOPLE'S POWER`} || My campaign</title>
				</Head>
				<Wrapper className="my-camp bg-white ">
					<div className="container">
						{/* <h1 className="text-secondary pt-2 mb-3 fs-3 fw-bold">
							My Campaigns
						</h1>
						<p className="fs-4 fst-italic">Welcome {user?.firstName} !</p>
						<Link href="/startcamp">
							<a className="btn btn-warning rounded-pill px-4">
								<i className="fas fa-plus text-light me-2"></i> Create Campaign
							</a>
						</Link> */}
						<div className="mt-4 ">
							{loading ? (
								<p>Loading...</p>
							) : campaigns?.length ? (
								<div>
									{/* <div className="slide-sec mb-3">
										<Slider />
									</div> */}
								</div>
							) : (
								<p className="text-center">Start by creating a new campaign</p>
							)}
							{campaigns?.length > 0 && (
								<div>
									<h3 className="fs-4 fw-bold text-center">Check Campaign Progress</h3>
									<div className="d-flex py-3 flex-column flex-md-row">
										<div className="flex-fill overflow-auto">
											<CampaignTable />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</Wrapper>
			</>
		</FrontLayout>
	);
};

export default authGuard(MyCamp);