/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dropdown } from 'rsuite';
import { INTERESTED } from "apollo/queries/eventQuery";
import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import { apollo } from "apollo";

const EventCard = ({ event }: { event: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);

    const interested = async (event: any) => {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(INTERESTED),
                variables: {
                    eventId: event._id,
                    authorId: author.id,
                    authorImg: author.image,
                    name: author.name,
                    email: author.email
                }
            })
            console.log(data)
            toast.success("Registered successfully")
        } catch (error) {
            console.log(error);
            toast.warn("Oops an error occoured!")
        }
    }

    return (
        <div className='w-[48%] my-4'>
            <div className="flex justify-between my-3">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src={event.author.image} alt="" />
                    <div className="ml-2">
                        <div className="text-base">{event.author.name} <span className="text-xs"> created this event</span></div>
                        <div className="text-xs">Following</div>
                    </div>
                </div>
            </div>
            <div className=' rounded-md shadow-sm'>
                <div className="grid grid-flow-col auto-cols-auto grid-flow-row auto-rows-auto gap-1">
                    {
                        event.image.slice(0, 4).map((image, index) =>
                            <img key={index} className="w-full h-80 rounded-md object-cover" src={image} alt="" />
                        )
                    }
                </div>
                <div className='my-auto w-full p-4' >
                    <div className='text-xl my-3'>{event.name}</div>
                    <div className='text-sm'>
                        {event.startDate} {event.time}
                    </div>
                    <div className='text-sm'>{event.type}</div>

                    {event.interested[0] === undefined ? null : <div className='flex my-6'>
                        <div className='flex'>
                            <img src={event.interested[0]?.image} className='rounded-full w-10 h-10' alt="" />
                            <img src={event.interested[1]?.image} className='rounded-full w-10 h-10 -ml-1' alt="" />
                        </div>
                        <div className='text-sm ml-2'>
                            {event.interested[0]?.name} and {event.interested?.length} others are attending
                        </div>
                    </div>}

                    <div className='flex justify-between'>
                        <button onClick={() => interested(event)} className='p-3 bg-warning text-white w-72 rounded-md'>Interested</button>
                        <Dropdown title={<img className='' src="/images/edit.svg" alt="" />} noCaret>
                            <Dropdown.Item>Promote</Dropdown.Item>
                            <Dropdown.Item>Report post</Dropdown.Item>
                            {event.author.id === author.id ? <Dropdown.Item>Edit</Dropdown.Item> : null}
                            <Dropdown.Item>Save</Dropdown.Item>
                        </Dropdown>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EventCard;