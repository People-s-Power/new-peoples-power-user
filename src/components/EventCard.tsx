/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dropdown } from 'rsuite';

const EventCard = ({event} : {event: any} ) : JSX.Element => {
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
                <img src={event.image} alt="" className='rounded-md w-full h-40' />
                <div className='my-auto w-full p-4' >
                    <div className='text-xl my-3'>{event.name}</div>
                    <div className='text-sm'>
                       {event.startDate} {event.time}
                    </div>
                    <div className='text-sm'>{event.type}</div>
                    <div className='flex my-6'>
                        <div className='flex'>
                            <img src="/images/person.png" className='rounded-full w-10 h-10' alt="" />
                            <img src="/images/person.png" className='rounded-full w-10 h-10 -ml-1' alt="" />
                        </div>
                        <div className='text-sm ml-2'>
                            Lucas Scott and 13 others are attending
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button className='p-3 bg-warning text-white w-72 rounded-md'>Interested</button>
                        <Dropdown title={<img className='' src="/images/edit.svg" alt="" />} noCaret>
                            <Dropdown.Item>Promote</Dropdown.Item>
                            <Dropdown.Item>Report post</Dropdown.Item>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item>Save</Dropdown.Item>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventCard;