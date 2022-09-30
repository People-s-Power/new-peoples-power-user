import React from 'react';

const ConnectionCard = () => {
    return (
        <div className="w-[25%] p-6">
            <img src="/images/person.png" className='w-20 h-20 rounded-full' alt="" />
            <div className='text-xl py-2'>Lucas Scott</div>
            <div className='w-16 h-[1px] bg-gray-200'></div>
            <div className="text-xs text-gray-700 my-3">500 Followers</div>
            <div className="text-xs text-gray-900 my-6">
            + Follow
            </div>
        </div>
    );
};

export default ConnectionCard;