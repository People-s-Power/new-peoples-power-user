import React, { useState, useEffect } from 'react';
import FrontLayout from "layout/FrontLayout";
import ConnectionCard from '../components/ConnectionCard'
import { CONNECTIONS } from "apollo/queries/generalQuery";
import { IUser } from "types/Applicant.types";
import axios from "axios";
import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';
import { apollo } from "apollo";
import { useQuery } from "@apollo/client";

const connection = () => {
    const [users, setUsers] = useState<IUser[]>([])

    const getUsers = async () => {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(CONNECTIONS),
            })
            console.log(data)
            setUsers(data.data.connections)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])


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