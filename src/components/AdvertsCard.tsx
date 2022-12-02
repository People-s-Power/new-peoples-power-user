import React from 'react';
import { Dropdown } from 'rsuite';
import ReactTimeAgo from 'react-time-ago'

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";


const AdvertsComp = ({ advert }: { advert: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);

    return (
        <div className="p-3 border-b border-gray-400 my-3">
            <div className=" border-b border-gray-200 pb-3">
                <div className="flex justify-between">
                    <div className='flex'>
                        <img className="w-12 h-12 rounded-full" src={advert.author.image} alt="" />
                        <div className="ml-2">
                            <div className="text-base capitalize">{advert.author.name} <span className="text-xs">{author?.id === advert.author._id ? '. You' : ''}</span></div>
                            <div className="text-xs"> <ReactTimeAgo date={advert.createdAt} locale="en-US" /></div>
                        </div>
                    </div>

                </div>
                <div>
                    sponsored
                </div>
            </div>
            <div className='p-2'>
                <img className="w-full h-50 rounded-md" src={advert.image} alt="" />
            </div>

            <div className="text-sm p-2 leading-loose">
                {advert.message}
            </div>
            <div className="pt-3 flex justify-between">
                <div className='w-2/3'>{advert.email}</div>
                <div>
                    <button className="p-2 bg-warning ">
                        Sign up
                    </button>
                </div>
                <Dropdown placement="leftStart" title={<img className='h-6 w-6' src="/images/edit.svg" alt="" />} noCaret>
                    {
                        advert.author._id === author?.id ? (<Dropdown.Item>Edit</Dropdown.Item>) : null
                    }
                    <Dropdown.Item>Share Ad</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
};

export default AdvertsComp;