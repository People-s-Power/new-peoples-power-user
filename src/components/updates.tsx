import React from 'react';
import { Dropdown } from 'rsuite';
import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHARE, LIKE } from "apollo/queries/generalQuery";
import axios from "axios";
import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';
import { useRouter } from 'next/router'


const Updates = ({ updates }: { updates: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);
    const router = useRouter()
    const share = async () => {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(SHARE),
                variables: {
                    authorId: author.id,
                    itemId: updates._id
                }
            })
            toast.success('Post has been shared');
            console.log(data)
        } catch (error) {
            console.log(error);
            toast.warn('Oops! Something went wrong');
        }
    }

    const like = async () => {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(LIKE),
                variables: {
                    authorId: author.id,
                    itemId: updates._id
                }
            })
            toast.success('Post liked successfully');
            console.log(data)
        } catch (error) {
            console.log(error);
            toast.warn('Oops! Something went wrong');
        }
    }
    return (
        <div className="p-3 border-b border-gray-400 my-3">
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src={updates.petition?.authorImg} alt="" />
                    <div className="ml-2">
                        <div className="text-base capitalize">{updates.petition?.authorName} <span className="text-xs">{author?.id === updates.authorId ? '. You' : ''}</span></div>
                        {/* <div className="text-xs"> <ReactTimeAgo date={post.createdAt} locale="en-US" /></div> */}
                    </div>
                </div>
            </div>
            <div className="text-sm p-2 leading-loose">
                {updates.petition?.title}
            </div>
            <div className='p-2'>
                <img className="w-full h-50 rounded-md" src={updates.image} alt="" />
            </div>
            <div className="font-bold text-lg">
                Petition Update
            </div>
            <div className="text-sm p-2 leading-loose">
                {updates.body}
            </div>
            <div className="w-full relative">
                <button onClick={() => router.push(`/campaigns/${updates.petition.slug}`)} className="p-2 absolute bottom-0 right-0 text-sm text-white bg-warning">
                    View More
                </button>
            </div>
            <div className="pt-3 flex justify-between">
                {/* <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_people-group.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Supports</div>
                </div> */}
                <div className="flex" onClick={() => like()}>
                    <img className="w-8 h-8" src="/images/home/icons/ant-design_like-outlined.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{updates.likes.length} likes</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_chat-bubble.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{ } Comments</div>
                </div>
                <div className="flex" onClick={() => share()}>
                    <img className="w-8 h-8" src="/images/home/icons/clarity_share-line.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{updates.shares.length} Shares</div>
                </div>
                <Dropdown placement="leftStart" title={<img className='h-6 w-6' src="/images/edit.svg" alt="" />} noCaret>
                    {/* {
                        post.author?._id === author?.id ? (<Dropdown.Item onClick={handelClick}>Edit</Dropdown.Item>) : null
                    } */}
                    <Dropdown.Item>Edit</Dropdown.Item>
                </Dropdown>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Updates;