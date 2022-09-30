import React from 'react';
import FrontLayout from "layout/FrontLayout";
import EventCard from 'components/EventCard';

const events = () => {
    return (
        <FrontLayout>
            <div className="mx-20">
                <div className="flex">
                    <div className='text-lg my-auto'>Discover Events</div>
                    <div className='mx-6'>
                        <input type="date" placeholder='Date' className='rounded-md' />
                    </div>
                    <div className="flex my-auto justify-between w-32">
                        <div className='border-b-2 cursor-pointer border-warning'>Top</div>
                        <div className='cursor-pointer'>Recent</div>
                    </div>
                </div>
                <div className='my-8 flex flex-wrap justify-between p-4'>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        </FrontLayout>
    );
};

export default events;