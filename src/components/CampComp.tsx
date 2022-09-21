import React from 'react';

const CampComp = () => {
    return (
        <div className="p-3 border-b border-gray-400">
            <div className="flex justify-between">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src="/images/person.png" alt="" />
                    <div className="ml-2">
                        <div className="text-base">Evans Doe <span className="text-xs">. You</span></div>
                        <div className="text-xs">2 days ago</div>
                    </div>
                </div>
            </div>
            <div className="text-sm p-2 leading-loose">
                Peoples power is a web-based technology that converts citizens complaint
                into a petition and campaigns which wins. When citizens are not happy with
                government policies and other social challenges which amongst others
                include health, politics, envirolment. E.T.C
            </div>
            <div className='p-2'>
                <img className="w-full h-50 rounded-md" src="/images/women_in_prison 1.png" alt="" />
                <div className="text-gray-400 p-1">N:B : At least 10 persons must support this post in order to make a petition</div>
            </div>
            <div className="pt-3 flex justify-between">
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_people-group.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Supports</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/ant-design_like-outlined.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 likes</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_chat-bubble.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Comments</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/clarity_share-line.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Shares</div>
                </div>
            </div>
        </div>
    );
};

export default CampComp;