import React, { useState } from 'react';
import { IUser } from "types/Applicant.types";
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConnectionCard = ({ user }: { user: IUser }): JSX.Element => {
    // console.log(user)
    const [following, setFollow] = useState(false)
    const author = useRecoilValue(UserAtom);

    const follow = () => {
        axios.post('/user/follow', {
            userId: user.id
        })
            .then(function (response) {
                toast.success("Followed!")
                setFollow(true)
            })
            .catch(function (error) {
                console.log(error);
                toast.warn("Oops an error occoured!")
            })
    }
    // const unFollow = () => {
    //     axios.put('/user/follow', {
    //         userId: user.id
    //     })
    //         .then(function (response) {
    //             toast.success("Unfollowed!")
    //             setFollow(false)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             toast.warn("Oops an error occoured!")
    //         })
    // }
    return (
        <div className="w-[25%] p-6">
            <img src="/images/person.png" className='w-20 h-20 rounded-full' alt="" />
            <div className='text-xl py-2'>{user.firstName} + {user.lastName}</div>
            <div className='w-16 h-[1px] bg-gray-200'></div>
            <div className="text-xs text-gray-700 my-3">500 Followers</div>
            {following ? (
                <div className="text-xs text-warning my-6">Following</div>
            ) : (
                <div className="text-xs text-gray-900 my-6" onClick={() => follow()}>
                    + Follow
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ConnectionCard;