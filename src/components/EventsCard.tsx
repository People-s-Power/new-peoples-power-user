import EventModal from './modals/EventModal';
import React, { useState } from 'react'

const EventsCard = ({ event }: { event: any }) => {
    const [open, setOpen] = useState(false);
    const handelClick = () => setOpen(!open);

    return (
        <div className='rounded-md shadow-sm my-3'>
            <div className="flex justify-between my-3">
                <div className='flex'>
                    <img className="w-12 h-12 rounded-full" src={event.author.image} alt="" />
                    <div className="ml-2">
                        <div className="text-base">{event.author.name} <span className="text-xs"></span></div>
                        <div className="text-xs">{event.author.name} created this as an event</div>
                    </div>
                </div>
            </div>
            <img src={event.image} alt="" className='rounded-md w-full' />
            <div className='p-3 text-sm my-auto' >
                <div>Dylan Emmanuel created event for
                   {event.startDate} AT {event.time}</div>
                <div className='text-xl my-3'>{event.description}</div>
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