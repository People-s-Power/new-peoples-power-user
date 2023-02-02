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

import { GET_ALL, GET_ALL_USERS, FOLLOW } from "apollo/queries/generalQuery";

import CreatePost from "../components/modals/CreatePost"
import CreateAdvert from "../components/modals/CreateAdvert"
import CreateEvent from "../components/modals/CreateEvent"
import StartPetition from "../components/modals/StartPetition"
import AdvertsComp from 'components/AdvertsCard';
import PetitionComp from 'components/PetitionCard';
import EventsCard from 'components/EventsCard';
import CampComp from 'components/CampComp';

const user = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const author = useRecoilValue(UserAtom);

    const [openPost, setOpenPost] = useState(false);
    const [openAd, setOpenAd] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [openPetition, setOpenPetition] = useState(false);

    const handelClick = () => setOpenPost(!openPost);
    const handelPetition = () => setOpenPetition(!openPetition);
    const handelAdClick = () => setOpenAd(!openAd);
    const handelEventClick = () => setOpenEvent(!openEvent);

    const [user, setUser] = useState<IUser>()
    const [orgs, setOrgs] = useState<IOrg[]>([])
    const { query } = useRouter();
    const [product, setProduct] = useState(false)
    const [following, setFollow] = useState(false)
    const [orgId, setOrgId] = useState("")
    const [all, setAll] = useState<any>([])


    let page: any;
    if (typeof window !== 'undefined') {
        page = localStorage.getItem('page');
    }

    useQuery(GET_ORGANIZATIONS, {
        variables: { ID: author?.id },
        client: apollo,
        onCompleted: (data) => {
            // console.log(data.getUserOrganizations)
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
    async function getData() {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(GET_ALL),
                variables: {
                    authorId: query?.page
                }
            })
            console.log(data.data.timeline)
            let general = [...data.data.timeline.adverts, {
                "__typename": 'Follow'
            }, ...data.data.timeline.updates, {
                "__typename": 'Follow'
            }, ...data.data.timeline.events, {
                "__typename": 'Follow'
            }, ...data.data.timeline.petitions, {
                "__typename": 'Follow'
            }, ...data.data.timeline.posts, {
                "__typename": 'Follow'
            }, ...data.data.timeline.victories, {
                "__typename": 'Follow'
            }]
            const randomize = (values: any) => {
                let index = values.length, randomIndex;
                while (index != 0) {
                    randomIndex = Math.floor(Math.random() * index);
                    index--;
                    [values[index], values[randomIndex]] = [
                        values[randomIndex], values[index]];
                }
                return values;
            }
            randomize(general)
            setAll(general)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        try {
            axios.get(`/user/single/${query.page}`)
                .then(function (response) {
                    setUser(response.data.user)
                    response.data.user.followers.map((single: any) => {
                        // console.log(response.data)
                        if (single === author.id) {
                            setFollow(true)
                        } else {
                            setFollow(false)
                        }
                    })
                    // console.log(response.data.user.orgOperating)
                    response.data.user.orgOperating.map((operating: any) => {
                        setOrgId(operating)
                        refetch()
                    })
                    setCampaigns(response.data.campaigns)
                })
                .catch(function (error) {
                    console.log(error);
                    // router.push(`/org?page=${query?.page}`   )
                })
        } catch (error) {
            console.log(error);
        }
        if (all[0] === undefined) {
            getData()
        }
    }, [])

    const { refetch } = useQuery(GET_ORGANIZATION, {
        variables: { ID: orgId },
        client: apollo,
        onCompleted: (data) => {
            setOrgs([...orgs, data.getOrganzation])
        },
        onError: (err) => {
            // console.log(err)
        },
    });


    const singleOrg = (id: string) => {
        localStorage.setItem("page", `${id}`)
        router.push(`/org?page=${id}`)
    }

    const follow = () => {
        axios.post('/user/follow', {
            userId: page
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

    const unFollow = () => {
        axios.put('/user/follow', {
            userId: page
        })
            .then(function (response) {
                toast.success("Unfollowed!")
                setFollow(false)
            })
            .catch(function (error) {
                console.log(error);
                toast.warn("Oops an error occoured!")
            })
    }

    return (
        <FrontLayout showFooter={true}>
            <>
                <Head>
                    <title>{`PEOPLE'S POWER`} || {user?.name} </title>
                </Head>
                <div className="lg:mx-32">
                    <div className="rounded-md ">
                        <div className="relative ">
                            <div>
                                <img className="w-full h-52" src="https://source.unsplash.com/random/800x400?nature" alt="" />
                            </div>
                            <div className="absolute top-32 left-10 rounded-circle pro-img mx-auto bg-white p-1">
                                <img className="rounded-circle w-44 h-44" src={user?.image} alt="" />
                            </div>

                        </div>
                        <div className='mt-20 py-8 px-10'>
                            <div className='flex justify-between'>
                                <div className="flex flex-column justify-center">
                                    <div className='flex'>
                                        <div className="text-xl font-bold ">{user?.name}</div>
                                        <div className="text-xs text-gray-900 flex my-auto ml-6">{user?.followersCount} Followers
                                            <div className="text-xs text-gray-900 ml-2">
                                                Following {user?.followingCount}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-thin w-96">
                                        {user?.description.substring(0, 100) + '...'}
                                    </div>
                                    <div className='flex'>
                                        <img className='w-4 h-4 mr-3 my-auto' src="/images/home/icons/akar-icons_location.png" alt="" />
                                        <div className="pt-1 text-sm"> {user?.city}, {user?.country}</div>
                                    </div>
                                </div>
                                <div className="font-black text-lg">
                                    <Link href={`mycamp/profile`}>
                                        <button className="bg-transparent p-2 text-warning"> <span>&#x270E;</span> Edit</button>
                                    </Link>
                                </div>
                            </div>

                            {/* {author?.id === query.page ? (
                                    <div className="font-black text-lg">
                                        <Link href={`mycamp/profile`}>
                                            <button className="bg-transparent p-2 text-warning"> <span>&#x270E;</span> Edit</button>
                                        </Link>
                                    </div>
                                ) : (
                                    following === true ? (
                                        <div>
                                            <button onClick={() => unFollow()} className="bg-transparent p-2 text-warning">Unfollow</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={() => follow()} className="bg-transparent p-2 text-warning"> <span>&#10010;</span> Follow</button>
                                        </div>
                                    )
                                )} */}
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

                    <div className="lg:flex mt-3">
                        <div className="lg:w-1/2 mt-3 h-80 lg:mr-4 rounded-md">
                            {author?.id === query.page ? (
                                <div className="text-base p-3">
                                    <div className='my-2'>
                                        <Link href="/mycamp">
                                            <button className="bg-transparent">Dashboard</button>
                                        </Link>
                                    </div>
                                    <div className='my-2'>
                                        <button className=" bg-transparent" onClick={() => setProduct(!product)}> Products</button>
                                    </div>
                                    <Link href={'/org/create'}>
                                        <div className="bg-transparent my-2 flex justify-between">
                                            <div className="my-auto  w-1/2">Human Right Action</div>
                                            <div className='text-center cursor-pointer'>
                                                <div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
                                                <div className="text-xs">  add </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href={'/org/create'}>
                                        <div className="bg-transparent my-2 flex justify-between">
                                            <div className="my-auto w-1/2">Organization</div>
                                            <div className='text-center cursor-pointer'>
                                                <div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
                                                <div className="text-xs">  create </div>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* <div className="bg-transparent my-2 flex justify-between">
                                        <div className="my-auto  w-1/2">Adverts</div>
                                        <div className='text-center cursor-pointer' onClick={() => handelAdClick()}>
                                            <div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
                                            <div className="text-xs">  create </div>
                                        </div>
                                    </div> */}
                                    <div>
                                        {orgs.map((org, i) => (
                                            <div key={i} className="flex cursor-pointer my-2" onClick={() => singleOrg(org?._id)}>
                                                {isValidUrl(org?.image) ? (
                                                    <img className="w-8 h-8 rounded-full" src={org?.image} alt="" />
                                                ) : (
                                                    <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                                )}
                                                <p className="pl-2 mt-2 text-sm">{org?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (<div></div>)}
                        </div>
                        {product ? (<div className="w-full rounded-md mt-3">
                            <div className="bg-transparent cursor-pointer w-36 my-2 mx-auto flex justify-between" onClick={() => handelAdClick()}>
                                <div className='text-center my-auto' >
                                    <div className="bg-gray-100 mx-auto pt-[1px] rounded-full w-6 h-6 text-base font-bold">+</div>
                                    {/* <div className="text-xs">  create </div> */}
                                </div>
                                <div className="my-auto text-sm">Create Product</div>
                            </div>

                            <div>

                            </div>
                        </div>) : (<div className='w-full'>
                            {
                                query.page === author?.id ? (
                                    <div className="border-b border-gray-200">
                                        <div className="flex justify-center">
                                            <img src={author?.image} className="w-14 h-14 mx-4 rounded-full" alt="" />
                                            <div onClick={() => handelClick()} className="p-3 pl-8 rounded-full w-[80%] border border-black text-sm cursor-pointer">
                                                What are your social concerns?
                                            </div>
                                        </div>
                                        <div className="flex justify-evenly my-4">
                                            <div className="flex w-16 justify-between">
                                                <div onClick={() => handelClick()} className="w-6 cursor-pointer">
                                                    <img className="w-6 h-6 my-auto" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
                                                </div>
                                                <div onClick={() => handelClick()} className="w-6 cursor-pointer">
                                                    <img className="w-6 h-6 my-auto" src="/images/home/icons/charm_camera-video.svg" alt="" />
                                                </div>
                                            </div>
                                            <div className="flex  cursor-pointer" >
                                                <img className="w-6 h-6 my-auto" src="/images/home/icons/experts.svg" alt="" />
                                                <div className="my-auto text-sm ml-3">
                                                    Find Expert
                                                </div>
                                            </div>
                                            <div className="flex  cursor-pointer" onClick={() => handelEventClick()} >
                                                <img className="w-6 h-6 my-auto" src="/images/home/icons/fe_sitemap.svg" alt="" />
                                                <div className="my-auto text-sm ml-3">Events</div>
                                            </div>
                                            <div className="flex  cursor-pointer" onClick={() => handelPetition()}>
                                                <img className="w-6 h-6 my-auto" src="/images/home/icons/tabler_article.svg" alt="" />
                                                <div className="my-auto text-sm ml-3">Start Petition</div>
                                            </div>
                                        </div>
                                        <div className="text-gray-500 text-center text-xs p-3">
                                            14 New Post
                                        </div>
                                    </div>
                                ) : null
                            }
                            {
                                all[0] !== undefined ? all.map((single: any, index: number) => {
                                    // setType(single.__typename)
                                    switch (single.__typename) {
                                        case 'Advert':
                                            return (<div key={index}>
                                                <AdvertsComp advert={single} />
                                            </div>
                                            )
                                        case 'Event':
                                            return (<div key={index}>
                                                <EventsCard event={single} />
                                            </div>
                                            )
                                        case 'Petition':
                                            return (<div key={index}>
                                                <PetitionComp petition={single} />
                                            </div>
                                            )
                                        case 'Victory':
                                            return (<div>
                                                victories
                                            </div>
                                            )
                                        case 'Post':
                                            return (<div key={index}>
                                                <CampComp post={single} />
                                            </div>
                                            )
                                    }
                                })
                                    : null
                            }

                            {/* {campaigns?.map((camp, i) => (
                                <div key={i} className="mt-3 bg-gray-50 w-full rounded-md flex relative">
                                    <div className='absolute right-2 top-2'>
                                        <div className="dropdown">
                                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            </a>
                                            {query.page === author?.id ? (
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
                                            ) : null}
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
                                                {/* <div className="text-gray-900 text-xs">Created By { } Alabo Excel</div> 
                                            </div>
                                            {/* <div className="flex cursor-pointer">
                                                {camp?.author.image === null ? (
                                                    <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                                ) : (
                                                    <img className="w-8 h-8 " src={camp?.author.image} alt="" />
                                                )}
                                                <p className="pl-2 mt-2">{user?.name} </p>
                                            </div> 
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
                            */}

                        </div>)}
                        <div className='w-72 bg-grey'>

                        </div>
                    </div>
                </div >
                <CreatePost open={openPost} handelPetition={handelPetition} handelClick={handelClick} post={null} />
                <CreateEvent open={openEvent} handelClick={handelEventClick} />
                <CreateAdvert open={openAd} handelClick={handelAdClick} />
                <StartPetition open={openPetition} handelClick={handelPetition} data={null} />
                <ToastContainer />
            </>
        </FrontLayout >
    );
}

export default user;