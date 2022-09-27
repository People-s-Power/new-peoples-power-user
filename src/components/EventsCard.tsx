import EventModal from './modals/EventModal';
import React, { useState } from 'react'

const EventsCard = () => {
    const [open, setOpen] = useState(false);
    const handelClick = () => setOpen(!open);

    return (
        <div className='p-4 rounded-md shadow-sm flex'>
            <img src="/images/begging-bridge-with-person-who-handed-bread_1150-22948.png" alt="" className='rounded-md w-[44%]' />
            <div className='ml-4 text-sm my-auto' >
                <div>Dylan Emmanuel created event for
                    Oct 12 AT 2:30 PM</div>
                <div className='text-xl my-3'>Planning 2022/2023 goal and setting it</div>
                <div className='text-sm'>Online</div>
                <div className='flex my-6'>
                    <div className='flex'>
                        <img src="/images/person.png" className='rounded-full w-6 h-6' alt="" />
                        <img src="/images/person.png" className='rounded-full w-6 h-6 -ml-1' alt="" />
                    </div>
                    <div className='text-sm ml-2'>
                        Lucas Scott and 13 others are attending
                    </div>
                </div>
                <div className='flex'>
                    <button onClick={() => handelClick()} className='p-3 bg-warning text-white w-72 rounded-md'>Interested</button>
                    <img className='ml-20' src="/images/edit.svg" alt="" />
                </div>
            </div>
            <EventModal open={open} handelClick={handelClick} />
        </div>
    );
};

export default EventsCard;