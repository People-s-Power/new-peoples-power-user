import React from 'react';
import { Dropdown } from 'rsuite';
import ReactTimeAgo from 'react-time-ago'

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";


const PetitionComp = ({ petition }: { petition: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);

    return (
        <div className="p-3 border-b border-gray-400 my-3">
            <div className="flex justify-between">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src={petition.authorImg} alt="" />
                    <div className="ml-2">
                        <div className="text-base capitalize">{petition.authorName} <span className="text-xs">{author?.id === petition.authorId ? '. You' : ''}</span></div>
                        <div className="text-xs"> <ReactTimeAgo date={petition.createdAt} locale="en-US" /></div>
                    </div>
                </div>
            </div>
            <div className="text-sm p-2 leading-loose">
                {petition.body}
            </div>
            <div className='p-2'>
                <img className="w-full h-50 rounded-md" src={petition.image} alt="" />
            </div>
            <div className="pt-3 flex justify-between">
                {/* <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_people-group.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Supports</div>
                </div> */}
                <div className="flex">
                    <img className="w-8 h-8 my-auto" src="/images/home/icons/ion_finger-print-sharp.png" alt="" />
                    <div className="text-sm my-auto ml-2 bg-warning p-2 rounded-sm">Endorse petition</div>
                </div>
                <div className="flex">
                <img className="w-8 h-8 my-auto" src="/images/home/icons/clarity_share-line.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{} Shares</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8 my-auto" src="/images/home/icons/akar-icons_people-group.png" alt="" />
                    <div className="text-sm my-auto ml-2">{petition.shares} endorsements</div>
                </div>
                <Dropdown placement="leftStart" title={<img className='h-6 w-6' src="/images/edit.svg" alt="" />} noCaret>
                    <Dropdown.Item>Promote</Dropdown.Item>
                    <Dropdown.Item>Update</Dropdown.Item>
                    <Dropdown.Item>Celebrate Victory</Dropdown.Item>
                    <Dropdown.Item>Edit</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
};

export default PetitionComp;