import React from 'react'
import PropTypes, { InferProps } from 'prop-types';

const PostActionCardProp = {
    authorImage: PropTypes.string,
    handelClick: PropTypes.func.isRequired,
    handelEventClick: PropTypes.func.isRequired,
    handelPetition: PropTypes.func.isRequired,
    handelOpenFindExpart: PropTypes.func.isRequired,
    count: PropTypes.any,
    refresh: PropTypes.func
}

export default function PostActionCard({ authorImage, handelClick, handelEventClick, handelPetition, handelOpenFindExpart, count, refresh }: InferProps<typeof PostActionCardProp>): JSX.Element {
    return <div className="border-b border-gray-300">
        <div className="flex justify-center">
            <img src={authorImage ? authorImage : ''} className="w-14 h-14 mx-4 rounded-full" alt="" />
            <div onClick={() => handelClick()} className="p-3 pl-8 rounded-full w-[80%] border border-black text-sm cursor-pointer">
                What are your social concerns?
            </div>
        </div>
        <div className="flex justify-evenly my-4">
            <div className="flex w-16 justify-between">
                <div onClick={() => handelClick()} className="w-6 cursor-pointer">
                    <img className="w-6 h-6 my-auto" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
                </div>
                <div onClick={() => handelClick()} className="w-6 cursor-pointer">
                    <img className="w-6 h-6 my-auto" src="/images/home/icons/charm_camera-video.svg" alt="" />
                </div>
            </div>
            <div className="flex  cursor-pointer" onClick={() => handelOpenFindExpart()}>
                <img className="w-6 h-6 my-auto" src="/images/home/icons/experts.svg" alt="" />
                <div className="my-auto text-sm ml-3">
                    Find Expert
                </div>
            </div>
            <div className="flex  cursor-pointer" onClick={() => handelEventClick()} >
                <img className="w-6 h-6 my-auto" src="/images/home/icons/fe_sitemap.svg" alt="" />
                <div className="my-auto text-sm ml-3">Events</div>
            </div>
            <div className="flex  cursor-pointer" onClick={() => handelPetition()}>
                <img className="w-6 h-6 my-auto" src="/images/home/icons/tabler_article.svg" alt="" />
                <div className="my-auto text-sm ml-3">Start Petition</div>
            </div>
        </div>

        {
            count > 0 && <div className="w-40 mx-auto flex justify-evenly text-center text-warning border border-warning rounded-full text-xs p-2 m-1 cursor-pointer" onClick={() => refresh()}>
                <img src="/images/arrow-up.svg" className='w-3' alt="" />
                {count} New Post
            </div>
        }

    </div>
}