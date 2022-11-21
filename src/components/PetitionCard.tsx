import React from 'react';
import { Dropdown } from 'rsuite';
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import Link from "next/link";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";


const PetitionComp = ({ petition, open, handelClick }: { petition: any, open: boolean, handelClick: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);

    const deletePetition = (() => {
        axios.delete(`petition/single/${petition.id}`)
            .then((response) => {
                console.log(response.data)
                toast("Petition Deleted Successfully")
            })
        // .then((error) => {
        //     console.log(error);
        //     toast.warn("Oops an error occoured!")
        // })
    })


    return (
        <div className="p-3 border-b border-gray-400 my-3">
            <div className="flex justify-between">
                <Link href={`user?page=${petition.authorId}`}>
                    <div className='flex'>
                        <img className="w-12 h-12 rounded-full" src={petition.authorImg} alt="" />
                        <div className="ml-2">
                            <div className="text-base capitalize">{petition.authorName} <span className="text-xs">{author?.id === petition.authorId ? '. You' : ''}</span></div>
                            <div className="text-xs"> <ReactTimeAgo date={petition.createdAt} locale="en-US" /></div>
                        </div>
                    </div>
                </Link>

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
                    <div className="text-sm my-auto ml-2">{ } Shares</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8 my-auto" src="/images/home/icons/akar-icons_people-group.png" alt="" />
                    <div className="text-sm my-auto ml-2">{petition.shares} endorsements</div>
                </div>
                <Dropdown placement="leftStart" title={<img className='h-6 w-6' src="/images/edit.svg" alt="" />} noCaret>
                    <Dropdown.Item>Promote</Dropdown.Item>
                    {
                        author?.id === petition.authorId ? (
                            <div>
                                <Dropdown.Item>Update</Dropdown.Item>
                                <Dropdown.Item>Celebrate Victory</Dropdown.Item>
                                <Dropdown.Item onClick={() => handelClick()}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => deletePetition()}>Delete</Dropdown.Item>
                            </div>
                        ) : null
                    }
                </Dropdown>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PetitionComp;