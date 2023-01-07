import { useQuery } from "@apollo/client";
import { GET_CAMPAIGNS } from "apollo/queries/campaignQuery";
// import { UserCampaignAtom } from "atoms/UserAtom";
import React, { Fragment, useState } from "react";
import SliderTwo from "react-slick";
// import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";
import * as timeago from "timeago.js";
import Link from "next/link";
import { apollo } from "apollo";
import { UserAtom } from "atoms/UserAtom";
import { useRecoilValue } from "recoil";
import { GET_ALL_USERS, FOLLOW } from "apollo/queries/generalQuery";
import { IUser } from "types/Applicant.types";
import axios from 'axios';

import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';
const FollowSlides = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const user = useRecoilValue(UserAtom);
    const [following, setFollow] = useState(false)

    useQuery(GET_ALL_USERS, {
        client: apollo,
        onCompleted: (data) => {
            console.log(data)
            setUsers(data.getUsers)
        },
        onError: (err) => console.log(err),
    });

    const follow = async (user: any) => {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(FOLLOW),
                variables: {
                    followerId: user.id, followId: user.id,
                }
            })
            console.log(data)
            setFollow(true)
        } catch (error) {
            console.log(error);
        }
    }

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    autoplay: false,
                    autoplaySpeed: 100,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                }
            }
        ]
    };

    return (
        <>
            <div className="">
                <div className="text-center font-bold text-lg my-3">Grow Your Feed</div>
                <SliderTwo {...settings}>
                    {users.map((user, i) => (
                        <div key={i} className="my-4 w-1/2 text-center border p-1">
                            <img src={user.image} className="w-12 mx-auto h-12 rounded-full" alt="" />
                            <div className="">
                                <div className="text-base font-light">{user.name} </div>
                                <div className="text-xs"></div>
                                <div className="flex cursor-pointer justify-between px-4 py-1 text-xs border border-black w-32 mx-auto mt-2 rounded-md">
                                    <div className="text-lg">+</div>
                                    <div className="my-auto text-sm" onClick={() => follow(user)}>Follow</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="my-4 w-1/2 text-center border p-1 h-auto">
                        <div className="my-12 ">
                            <Link href='/connection'>
                                <div className="text-warning cursor-pointer   text-sm">view more</div>
                            </Link>
                        </div>
                    </div>
                </SliderTwo>
                <div className="text-sm text-center ">
                    <Link href='/connection'>
                        <div className="text-warning cursor-pointer text-sm">view more connections</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FollowSlides;