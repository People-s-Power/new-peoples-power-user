import React from 'react';

const NotificationComp = () => {
    return (
        <div className="border-b border-gray-200 p-6 flex">
            <img src="/images/person.png" className="w-24 h-24" alt="" />
            <div className="ml-6">
                <div className="text-base w-[80%]">A petition that you posted just attain victory, share this with people who you
                    are following and people who follow you</div>
                <div>
                    <button className="btn text-warning border border-warning p-2 px-20 my-2">Share Victory</button>
                </div>
            </div>
            <div className="ml-auto w-20 rounded-md text-sm text-gray-700">23 hrs</div>
        </div>
    );
};

export default NotificationComp;