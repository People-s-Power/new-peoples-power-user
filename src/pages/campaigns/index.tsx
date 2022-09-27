import FrontLayout from "layout/FrontLayout";
import React, { useState, useEffect } from "react";
import EventsCard from "components/EventsCard";

const CampaignPage = () => {

	return (
		<FrontLayout>
			<div className="mx-20">
				<div className="flex justify-evenly">
					<input type="text" className="p-3 rounded-full w-1/2 pl-8 text-sm" placeholder="Search for events" />
					<div className="flex my-auto justify-between w-32">
						<div>Top</div>
						<div>Recent</div>
					</div>
				</div>
				<div>
					<EventsCard />
				</div>
			</div>
		</FrontLayout>
	);
};

export default CampaignPage;