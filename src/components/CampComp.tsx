import React from 'react';
import { Dropdown } from 'rsuite';
import ReactTimeAgo from 'react-time-ago'

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import Link from 'next/link';


const CampComp = ({ post }: { post: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);

    return (
        <div className="p-3 border-b border-gray-400 my-3">
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src={post.author?.image} alt="" />
                    <div className="ml-2">
                        <div className="text-base capitalize">{post.author?.name} <span className="text-xs">{author?.id === post.author?._id ? '. You' : ''}</span></div>
                        {/* <div className="text-xs"> <ReactTimeAgo date={post.createdAt} locale="en-US" /></div> */}
                    </div>
                </div>
            </div>
            <div className="text-sm p-2 leading-loose">
                {post.body}
            </div>
            <div className='p-2'>
                <img className="w-full h-50 rounded-md" src={post.image} alt="" />
                {author?.id === post.author?._id ? (<div className="text-gray-400 p-1">N:B : At least 10 persons must support this post in order to make a petition</div>
                ) : null}
                {author?.id === post.author?._id && post.likes >= 10 ? (<div>
                    <div className="text-gray-400 p-1">N:B : With more than 10 persons supporting this camplaint concern we
                        recomend thatyou make this post a petition/campaign for the issues
                        raised to be addresed.Making this post a petition will send your
                        campaign to the right person/authority who will address it.</div>
                    <button className='border border-black p-2'>Start Petition</button>
                </div>
                ) : null}
                {post.isPetition === true ? (<div>
                    <div className="text-gray-400 p-1">N:B: There is a petition for this post</div>
                    <button className='border border-black p-2'>View Petition</button>
                </div>
                ) : null}
            </div>
            <div className="pt-3 flex justify-between">
                {/* <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_people-group.svg" alt="" />
                    <div className="text-sm my-auto ml-2">10 Supports</div>
                </div> */}
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/ant-design_like-outlined.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{post.likes} likes</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/akar-icons_chat-bubble.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{post.comments?.length} Comments</div>
                </div>
                <div className="flex">
                    <img className="w-8 h-8" src="/images/home/icons/clarity_share-line.svg" alt="" />
                    <div className="text-sm my-auto ml-2">{post.shares} Shares</div>
                </div>
                <Dropdown placement="leftStart" title={<img className='h-6 w-6' src="/images/edit.svg" alt="" />} noCaret>
                    {/* <Link href={`/promote?slug=${post?.slug}`}>
                        <Dropdown.Item>Promote</Dropdown.Item>
                    </Link> */}
                    <Dropdown.Item>Report post</Dropdown.Item>
                    {
                        post.author?._id === author?.id ? (<Dropdown.Item>Edit</Dropdown.Item>) : null
                    }
                    <Dropdown.Item>Save</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
};

export default CampComp;