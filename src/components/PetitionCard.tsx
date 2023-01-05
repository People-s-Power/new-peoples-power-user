import React, { useState, useEffect } from 'react';
import { Dropdown } from 'rsuite';
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import Link from "next/link";
import StartPetition from "./modals/StartPetition"
import CreateVictories from "./modals/CreateVictories"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import AddUpdates from './modals/AddUpdates';


const PetitionComp = ({ petition, }: { petition: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);

    const handelPetition = () => setOpenPetition(!openPetition);
    const [openPetition, setOpenPetition] = useState(false);
    const handelVictory = () => setOpenVictory(!openVictory);
    const [openVictory, setOpenVictory] = useState(false);
    const handelUpdates = () => setOpenUpdates(!openUpdates);
    const [openUpdates, setOpenUpdates] = useState(false);

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
                <Link href={`/campaigns/${petition?.slug}`}>
                    <div className="flex cursor-pointer">
                        <img className="w-8 h-8 my-auto" src="/images/home/icons/ion_finger-print-sharp.png" alt="" />
                        <div className="text-sm my-auto ml-2 bg-warning p-2 rounded-sm">Endorse petition</div>
                    </div>
                </Link>
                <div className="flex cursor-pointer">
                    <img className="w-8 h-8 my-auto" src="/images/home/icons/clarity_share-line.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{petition.shares} Shares</div>
                </div>
                <Link href={`/campaigns/${petition?.slug}`}>
                    <div className="flex">
                        <img className="w-8 h-8 my-auto" src="/images/home/icons/akar-icons_people-group.png" alt="" />
                        <div className="text-sm my-auto ml-2">{petition.endorsements.length} endorsements</div>
                    </div>
                </Link>
                <Dropdown placement="leftStart" title={<img className='h-6 w-6' src="/images/edit.svg" alt="" />} noCaret>
                    <Link href={`/promote?slug=${petition?.slug}`}>
                        <Dropdown.Item>Promote</Dropdown.Item>
                    </Link>
                    {
                        author?.id === petition.authorId ? (
                            <div>
                                <Dropdown.Item onClick={() => handelVictory()}>Celebrate Victory</Dropdown.Item>
                                <Dropdown.Item onClick={() => handelUpdates()}>Update</Dropdown.Item>
                                <Dropdown.Item onClick={() => handelPetition()}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => deletePetition()}>Delete</Dropdown.Item>
                            </div>
                        ) : null
                    }
                </Dropdown>
            </div>
            <AddUpdates open={openUpdates} handelClick={handelUpdates} petition={petition} />
            <StartPetition open={openPetition} handelClick={handelPetition} data={petition} />
            <CreateVictories open={openVictory} handelClick={handelVictory} victory={petition} />
            <ToastContainer />
        </div>
    );
};

export default PetitionComp;