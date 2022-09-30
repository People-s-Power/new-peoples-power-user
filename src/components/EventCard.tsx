/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dropdown } from 'rsuite';

const EventCard = () => {
    return (
        <div className='w-[48%] my-4'>
            <div className="flex justify-between my-3">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src="/images/person.png" alt="" />
                    <div className="ml-2">
                        <div className="text-base">Evans Doe <span className="text-xs"> created this event</span></div>
                        <div className="text-xs">Following</div>
                    </div>
                </div>
            </div>
            <div className=' rounded-md shadow-sm'>
                <img src="/images/begging-bridge-with-person-who-handed-bread_1150-22948.png" alt="" className='rounded-md w-full h-40' />
                <div className='my-auto w-full p-4' >
                    <div className='text-xl my-3'>Get a job with the NGOS, the UN and
                        the International</div>
                    <div className='text-sm'>
                        Thursday: Sep 1 2022 AT 5:30 PM WAT
                    </div>
                    <div className='text-sm'>Online</div>
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