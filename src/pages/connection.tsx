import React, { useState } from 'react';
import FrontLayout from "layout/FrontLayout";
import ConnectionCard from '../components/ConnectionCard'
import { GET_ALL_USERS } from "apollo/queries/generalQuery";
import { IUser } from "types/Applicant.types";

import { apollo } from "apollo";
import { useQuery } from "@apollo/client";

const connection = () => {
    const [users, setUsers] = useState<IUser[]>([])

    useQuery(GET_ALL_USERS, {
        client: apollo,
        onCompleted: (data) => {
            console.log(data)
            setUsers(data.getUsers)
        },
        onError: (err) => console.log(err),
    });

    return (
        <FrontLayout>
            <div className="mx-32 shadow-sm p-6">
                <div>
                    <input type="text" className='p-3 w-2/3 rounded-full pl-10 text-sm' placeholder="Search" />
                </div>
                <div className="flex flex-wrap">
                    {users.map((user, index) => (
                        <ConnectionCard key={index} user={user} />
                    ))}
                </div>
            </div>
        </FrontLayout>
    );
};

export default connection;