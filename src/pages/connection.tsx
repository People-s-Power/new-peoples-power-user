import React from 'react';
import FrontLayout from "layout/FrontLayout";
import ConnectionCard from '../components/ConnectionCard'

const connection = () => {
    return (
        <FrontLayout>
            <div className="mx-32 shadow-sm p-6">
                <div>
                    <input type="text" className='p-3 w-2/3 rounded-full pl-10 text-sm' placeholder="Search" />
                </div>
                <div className="flex flex-wrap">
                    <ConnectionCard />
                    <ConnectionCard />
                    <ConnectionCard />
                    <ConnectionCard />
                    <ConnectionCard />
                    <ConnectionCard />
                </div>
            </div>
        </FrontLayout>
    );
};

export default connection;