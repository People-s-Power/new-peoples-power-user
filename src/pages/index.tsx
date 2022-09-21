import FrontLayout from "layout/FrontLayout";
import React, { useEffect } from "react";
import CampComp from "../components/CampComp"

const HomePage = () => {
	return (
		<FrontLayout >
			<main className="flex">
				<aside className="w-[35%] text-center">
					<div className="bg-warning w-full h-10"></div>
					<div className="p-2 relative -top-6 border-b border-gray-200">
						<img src="/images/person.png" className="w-[80px] mx-auto left-0 right-0 rounded-full h-[80px] " alt="" />
						<div className="text-base font-light">Jonh Doe</div>
						<div className="text-xs px-3">Founder of Detriot NG. I see the
							future as a global weapon</div>
					</div>
					<div className="border-b border-gray-200 px-3">
						<div className="flex justify-between mb-2">
							<div className="text-sm my-auto">Adverts</div>
							<div className="text-center cursor-pointer">
								<div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
								<span className="text-xs text-center">create</span>
							</div>
						</div>
						<div className="flex justify-between my-4">
							<div className="text-sm my-auto">Organization</div>
							<div className="text-center cursor-pointer">
								<div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
								<span className="text-xs text-center">create</span>
							</div>
						</div>
					</div>
				</aside>
				<section className="w-full shadow-sm">
					<div className="border-b border-gray-200">
						<div className="flex justify-center">
							<img src="/images/person.png" className="w-14 h-14 mx-4 rounded-full" alt="" />
							<div className="p-3 pl-8 rounded-full w-[80%] border border-black text-sm">
								What are your social concerns?
							</div>
						</div>
						<div className="flex justify-evenly my-4">
							<div className="flex cursor-pointer">
								<img className="w-6 h-6 my-auto" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
								<div className="my-auto text-sm ml-3">Photo</div>
							</div>
							<div className="flex  cursor-pointer">
								<img className="w-6 h-6 my-auto" src="/images/home/icons/charm_camera-video.svg" alt="" />
								<div className="my-auto text-sm ml-3">Video</div>
							</div>
							<div className="flex  cursor-pointer">
								<img className="w-6 h-6 my-auto" src="/images/home/icons/fe_sitemap.svg" alt="" />
								<div className="my-auto text-sm ml-3">Events</div>
							</div>
							<div className="flex  cursor-pointer">
								<img className="w-6 h-6 my-auto" src="/images/home/icons/tabler_article.svg" alt="" />
								<div className="my-auto text-sm ml-3">Start Petition</div>
							</div>
						</div>
						<div className="text-gray-500 text-center text-xs p-3">
							14 New Post
						</div>
					</div>
					<div>
						<CampComp />
					</div>
				</section>
				<aside className="w-[35%] p-2">
					<div className="flex justify-between my-3">
						<img src="/images/person.png" className="w-12 m-2 h-12" alt="" />
						<div>
							<div className="text-base font-light">King Erics</div>
							<div className="text-xs">Joshua who you followed
								started following King Erics</div>
							<div className="flex cursor-pointer justify-between px-4 py-1 text-xs border border-black w-[60%] mt-2 rounded-md">
								<div className="text-lg">+</div>
								<div className="my-auto text-sm">Follow</div>
							</div>
						</div>
					</div>
					<div className="flex justify-between my-3">
						<img src="/images/person.png" className="w-12 m-2 h-12" alt="" />
						<div>
							<div className="text-base font-light">John</div>
							<div className="text-xs">Joshua who you followed
								started following King Erics</div>
							<div className="flex cursor-pointer justify-between px-4 py-1 text-xs border border-black w-[60%] mt-2 rounded-md">
								<div className="text-lg">+</div>
								<div className="my-auto text-sm">Follow</div>
							</div>
						</div>
					</div>
					<div className="p-2">
						<div className="my-3 text-sm">
							Grow your feed by following
							persons and pages that
							interest you
						</div>
						<div className="my-3 text-sm">
							Following someone or a
							page allows you to see the
							persons interest, campaign
						</div>
						<div className="my-3 text-sm">
							You can reach a larger
							audience by allowing others
							to follow your activity and
							read what you are sharing
						</div>
					</div>
				</aside>
			</main>
		</FrontLayout>
	)
}

export default HomePage;