import { FOLLOW } from 'apollo/queries/generalQuery';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { SERVER_URL } from 'utils/constants';
import { print } from "graphql"


import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
const FollowCard = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false)
  const author = useRecoilValue(UserAtom)

  const follow = async (id) => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(FOLLOW),
        variables: {
          followerId: author.id,
          followId: id,
        },
      })
      console.log(data)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-[25%] p-6">
      <Link href={`user?page=${user._id}`}>
        <div className="cursor-pointer">
          <img src={user.image} className="w-20 h-20 rounded-full" alt="" />
          <div className="text-xl py-2">{user.name} </div>
        </div>
      </Link>
      <div className="w-16 h-[1px] bg-gray-200"></div>
      <div className="text-xs text-gray-700 my-3">{user.followers.length} Followers</div>
      {
        loading ? <p className='text-xs text-warning'>Following...</p> : <div className="text-xs text-gray-900 my-6 cursor-pointer" onClick={() => follow(user._id)}>
          + Follow
        </div>
      }
    </div>
  );
};

export default FollowCard;