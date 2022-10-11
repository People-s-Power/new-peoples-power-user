/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-empty */
import React, { useEffect, useRef } from 'react';
import FrontLayout from "layout/FrontLayout";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { MY_CAMPAIGN } from "apollo/queries/campaignQuery";
import { apollo } from "apollo";
import { useState } from "react";
import { ICampaign, IUser, IOrg } from "types/Applicant.types";
import Link from "next/link";
import axios from 'axios';
import { sassNull } from 'sass';
import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import Slider from "../components/camp-slider/Slider"
import router, { useRouter } from "next/router";
import { GET_ORGANIZATIONS, GET_ORGANIZATION } from "apollo/queries/orgQuery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';

const user = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [user, setUser] = useState<IUser>()
    const [orgs, setOrgs] = useState<IOrg[]>([])
    const { query } = useRouter();
    const author = useRecoilValue(UserAtom);
    const [product, setProduct] = useState(false)
    let page: any;

    if (typeof window !== 'undefined') {
        page = localStorage.getItem('page');
    }

    useQuery(GET_ORGANIZATIONS, {
        variables: { ID: author?.id },
        client: apollo,
        onCompleted: (data) => {
            // console.log(data)
            setOrgs(data.getUserOrganizations)
        },
        onError: (err) => {
            // console.log(err)
        },
    });

    function isValidUrl(string: any) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    useEffect(() => {
        try {
            axios.get(`/user/single/${page || query.page}`)
                .then(function (response) {
                    setUser(response.data.user)
                    // console.log(response.data.user)
                    setCampaigns(response.data.campaigns)
                })
                .catch(function (error) {
                    console.log(error);
                    router.push(`/org?page=${page}`)
                })

        } catch (error) { }
    }, [])

    const singleOrg = (id: string) => {
        // axios.get(`/orgs/${id}`)
        //     .then(function (response) {
        //         // console.log(response)
        localStorage.setItem("page", `${id}`)
        router.push(`/org?page=${id}`)
        //     setCampaigns([])
        //     setUser(response.data)
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
    }
    const follow = () => {
        axios.post('/user/follow', {
            userId: page
        })
            .then(function (response) {
                toast.success("Followed!")
            })
            .catch(function (error) {
                console.log(error);
                toast.warn("Oops an error occoured!")
            })
    }
    const unFollow = () => {
        axios.put('/user/follow', {
            userId: page
        })
            .then(function (response) {
                toast.success("Unfollowed!")
            })
            .catch(function (error) {
                console.log(error);
                toast.warn("Oops an error occoured!")
            })
    }
    // const { loading } = useQuery(MY_CAMPAIGN, {
    //     client: apollo,
    //     onCompleted: (data) => setCampaigns(data.myCampaign),
    //     onError: (e) => console.log(e),
    // });

    return (
        <FrontLayout showFooter={true}>
            <>
                <Head>
                    <title>{`PEOPLE'S POWER`} || {user?.name} </title>
                </Head>
                <div className="lg:mx-32">
                    <div className="rounded-md bg-gray-100">
                        <div className="relative ">
                            <div>
                                <img className="w-full h-52" src="https://source.unsplash.com/random/800x400?nature" alt="" />
                            </div>
                            {
                                isValidUrl(user?.image) ? (
                                    <div className="absolute top-40 left-[45%] rounded-circle pro-img mx-auto bg-white p-1">
                                        <img className="rounded-circle w-32 h-32" src={user?.image} alt="" />
                                    </div>
                                ) : (
                                    <div className="absolute top-40 mx-auto left-[45%] rounded-full w-24 bg-white p-1 h-24">
                                        <img className="w-full rounded-full" src="/images/user.png" alt="" />
                                    </div>

                                )
                            }
                        </div>
                        <div className='mt-24 px-10 text-center'>
                            <div className="flex flex-column justify-center">
                                <div className="text-lg font-bold ">{user?.name}</div>
                                <div className="pt-1 ml-2"> {user?.city}, {user?.country}</div> </div>
                            <div className="text-sm font-thin w-96 mx-auto">
                                {user?.description.substring(0, 100) + '...'}
                            </div>
                            <div className="text-lg font-black text-gray-900 justify-center flex ">{user?.followersCount} Followers
                                <div className="text-lg font-black text-gray-900 ml-2">
                                    Following {user?.followingCount} </div> </div>
                            {author?.id === query.page ? (
                                <div className="font-black text-lg">
                                    <Link href={`mycamp/profile`}>
                                        <button className="bg-transparent p-2 text-warning"> <span>&#x270E;</span> Edit</button>
                                    </Link>
                                </div>
                            ) : (
                                user?.followers?.length! >= 1 ? (
                                    user?.followers.map((single: any) => (
                                        single === author.id ? (
                                            <div>
                                                <button onClick={() => unFollow()} className="bg-transparent p-2 text-warning">Unfollow</button>
                                            </div>
                                        ) : (
                                            null
                                            // <div>
                                            //     <button onClick={() => follow()} className="bg-transparent p-2 text-warning"> <span>&#10010;</span> Follow</button>
                                            // </div>
                                        )
                                    ))
                                ) : (
                                    <div>
                                        <button onClick={() => follow()} className="bg-transparent p-2 text-warning"> <span>&#10010;</span> Follow</button>
                                    </div>
                                )
                            )}
                        </div>
                        {/* {author?.id === query.page ? (
                            <div className="text-center font-black text-lg">
                                <Link href="/mycamp">
                                    <button className=" bg-transparent p-2 w-44 text-warning">Dashboard</button>
                                </Link>
                                <button className=" bg-transparent p-2 w-44 text-warning" onClick={() => setProduct(!product)}> Products</button>
                                <Link href={'/about'}>
                                    <button className=" bg-transparent p-2 w-44 text-warning"> Careers</button>
                                </Link>
                            </div>
                        ) : (<div></div>)} */}
                    </div>
                    <Slider />
                    {query.page === author?.id ? (

                        <div className="text-center text-lg p-3">
                            <Link href={`/startcamp`}>
                                <button className="bg-gray-200 w-44 p-2 rounded-full"> Start Campaign...</button>
                            </Link>
                        </div>
                    ) : null}
                    <div className="lg:flex mt-3">
                        <div className="lg:w-72 mt-3 h-80 lg:mr-4 rounded-md bg-gray-50">
                            {author?.id === query.page ? (
                                <div className="text-center font-black text-base p-3">
                                    <Link href="/mycamp">
                                        <button className=" bg-transparent p-2 w-44 text-black">Dashboard</button>
                                    </Link>
                                    <button className=" bg-transparent p-2 w-44 text-black" onClick={() => setProduct(!product)}> Products</button>
                                    <Link href={'/create'}>
                                        <div className="bg-transparent flex justify-between text-black">
                                            <div className="my-auto">Organization</div>
                                            <div>
                                                <span className="bg-gray-100 rounded-full">&#43;</span>
                                                <div className="text-xs">  create
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div>
                                        {orgs.map((org, i) => (
                                            <div key={i} className="flex cursor-pointer my-2" onClick={() => singleOrg(org?._id)}>
                                                {isValidUrl(org?.image) ? (
                                                    <img className="w-8 h-8 rounded-full" src={org?.image} alt="" />
                                                ) : (
                                                    <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                                )}
                                                <p className="pl-2 mt-2 capitalize">{org?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (<div></div>)}
                        </div>
                        {product ? (<div className="bg-gray-50 flex w-full rounded-md mt-3">
                            <img src="/images/file.png" className="w-80 mx-auto" alt="" />
                            <div className="my-auto">
                                <div className="text-3xl fotn-bold">Do you think your rights have been breached and wish to seek courts redress?</div>
                                <div className="text-base">Let's help you file this application through your subscription.</div>
                                <button className="btn bg-warning p-2 px-8 my-3 mx-auto text-white w-44">Suscribe</button>
                            </div>
                        </div>) : (<div className='w-full'>
                            {campaigns?.map((camp, i) => (
                                <div key={i} className="mt-3 bg-gray-50 w-full rounded-md flex relative">
                                    <div className='absolute right-2 top-2'>
                                        <div className="dropdown">
                                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            </a>

                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link href={`/promote?slug=${camp?.slug}`}>
                                                        <a className="btn pl-2">{camp?.promoted ? "Upgrade" : "Promote"}</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/editcamp?page=${camp?.slug}`}>
                                                        <a className="btn pl-2">Edit</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/updates?page=${camp?.id}/${camp?.slug}`}>
                                                        <a className="btn pl-2">Add Updates</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="w-96 mr-4">
                                        <img className="w-96 h-full" src={camp.image} alt="" />
                                    </div>

                                    <div className="w-full my-auto">
                                        <div className="uppercase text-lg font-bold">{camp.title}</div>
                                        <div className="text-sm">{camp.excerpt}</div>
                                        <div className="flex justify-between mr-10">
                                            <div>
                                                <div className="text-gray-900 text-xs"> Created At {camp.createdAt.slice(0, 10)}</div>
                                                {/* <div className="text-gray-900 text-xs">Created By { } Alabo Excel</div> */}
                                            </div>
                                            {/* <div className="flex cursor-pointer">
                                                {camp?.author.image === null ? (
                                                    <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                                ) : (
                                                    <img className="w-8 h-8 " src={camp?.author.image} alt="" />
                                                )}
                                                <p className="pl-2 mt-2">{user?.name} </p>
                                            </div> */}
                                            <p className="fst-italic">
                                                <i className="fa fa-users lg:mr-8"></i>
                                                {(camp?.endorsements?.length) + 1} Supporters
                                            </p>
                                        </div>
                                        <Link href={`/campaigns/${camp?.slug}`}>
                                            <button className="btn btn-warning mt-2">Read More</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                    </div>
                </div >
                <ToastContainer />
            </>
        </FrontLayout >
    );
}

export default user;