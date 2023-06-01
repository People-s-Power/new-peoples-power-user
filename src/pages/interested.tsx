import { EVENT } from 'apollo/queries/eventQuery';
import FrontLayout from 'layout/FrontLayout';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from 'utils/constants';
import axios from "axios"
import { print } from "graphql"
import router, { useRouter } from "next/router"
import Link from 'next/link';

const Interested = () => {
  const [interested, setInterested] = useState([]);
  const { query } = useRouter()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.post(SERVER_URL + "/graphql", {
          query: print(EVENT),
          variables: {
            eventId: query.page,
          },
        })
        console.log(data)
        setInterested(data.data.event.interested)
      } catch (e) {
        console.log(e)
      }
    }
    fetchEvent()
  });

  return (
    <FrontLayout showFooter={false}>
      <main className='lg:mx-20 mx-6'>
        <p className='text-xl font-bold my-4'>View list of all attendees </p>
        {
          interested.length > 0 ?
            interested.map((item, index) => (
              <div key={index} className='flex'>
                <img src={item.image} className='rounded-full w-20 h-20' alt="" />
                <div className='my-auto'>
                  <p className='text-base my-3'>{item.name}</p>
                  <p className='text-sm'>{item.email}</p>
                </div>
                <Link href={`/messages?page=${item._id}`}>
                  <button className='float-right p-3 text-warning border border-warning w-44'>Send Invitation</button>
                </Link>
              </div>
            ))
            : <p className='text-center p-4 text-base'>No one has shown interest in this event yet</p>
        }
      </main>
    </FrontLayout>
  );
};

export default Interested;