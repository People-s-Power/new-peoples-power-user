/* eslint-disable react/no-unescaped-entities */
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
import Slider from "../../components/camp-slider/Slider"
import router, { useRouter } from "next/router";
import { GET_ORGANIZATION, GET_ORGANIZATIONS } from "apollo/queries/orgQuery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from "utils/constants";

import CreatePost from "../../components/modals/CreatePost"
import CreateAdvert from "../../components/modals/CreateAdvert"
import CreateEvent from "../../components/modals/CreateEvent"
import StartPetition from "../../components/modals/StartPetition"

import { MY_PETITION } from "apollo/queries/petitionQuery";
import { MY_EVENT } from "apollo/queries/eventQuery";
import { GET_USER_POSTS } from 'apollo/queries/postQuery'
import { MY_ADVERTS } from "apollo/queries/advertsQuery";

import AdvertsComp from 'components/AdvertsCard';
import PetitionComp from 'components/PetitionCard';
import EventsCard from 'components/EventsCard';
import CampComp from 'components/CampComp';
import { print } from 'graphql';

const org = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [user, setUser] = useState<IUser>()
    const [orgs, setOrgs] = useState<IOrg[]>([])
    const { query } = useRouter();
    const author = useRecoilValue(UserAtom);
    const [product, setProduct] = useState(false)
    const [organization, setOrganization] = useState(false)
    const [img, setImg] = useState("");
    const uploadRef = useRef<HTMLInputElement>(null);
    const [following, setFollow] = useState(false)

    const [openPost, setOpenPost] = useState(false);
    const [openAd, setOpenAd] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [openPetition, setOpenPetition] = useState(false);
    const [all, setAll] = useState([]);

    const handelClick = () => setOpenPost(!openPost);
    const handelPetition = () => setOpenPetition(!openPetition);
    const handelAdClick = () => setOpenAd(!openAd);
    const handelEventClick = () => setOpenEvent(!openEvent);

    const [petition, setPetition] = useState([])
    const [post, setPost] = useState([])

    let page: any;
    if (typeof window !== 'undefined') {
        page = localStorage.getItem('page');
    }
    function isValidUrl(string: any) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    const getGeneral = () => {
        if (petition.length === 0 && post.length === 0) { } else {
            let general = [...petition, ...post]
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
            console.log(all)
        }
    }

    useQuery(MY_PETITION, {
        client: apollo,
        onCompleted: (data) => {
            // console.log(data)
            setPetition(data.myPetition)
            getGeneral()
        },
        onError: (err) => {
        },
    });
    useQuery(MY_ADVERTS, {
        client: apollo,
        variables: { authorId: author?.id },
        onCompleted: (data) => {
            console.log(data)
        },
        onError: (err) => {
        },
    });
    useQuery(GET_USER_POSTS, {
        client: apollo,
        onCompleted: (data) => {
            // console.log(data)
            setPost(data.myPosts)
            getGeneral()
        },
        onError: (err) => {
        },
    });

    const getEvent = async () => {
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(MY_EVENT),
                variables: {
                    authorId: query?.page,
                    page: 1
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    useQuery(GET_ORGANIZATION, {
        variables: { ID: query.page },
        client: apollo,
        onCompleted: (data) => {
            console.log(data.getOrganzation)
            setUser(data.getOrganzation)
            user?.followers.map((single: any) => {
                if (single === user.id) {
                    setFollow(true)
                } else {
                    setFollow(false)
                }
            })
            localStorage.setItem("operator", JSON.stringify(data.getOrganzation.operators))
        },
        onError: (err) => console.log(err),
    });

    useQuery(GET_ORGANIZATIONS, {
        variables: { ID: author?.id },
        client: apollo,
        onCompleted: (data) => {
            // console.log(data)
            setOrgs(data.getUserOrganizations)
        },
        onError: (err) => console.log(err),
    });

    useEffect(() => {
        getEvent()
        axios.get(`/campaign/orgcampaign/${page}`)
            .then(function (response) {
                // console.log(response)
                setCampaigns(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
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
                setFollow(true)
            })
            .catch(function (error) {
                console.log(error);
                toast.warn("Oops an error occoured!")
            })
    }

    const singleOrg = (id: string) => {
        // axios.get(`/orgs/${id}`)
        //     .then(function (response) {
        //         console.log(response)
        //         setUser(response.data)
        router.push(`/org?page=${id}`)
        localStorage.setItem("page", `${id}`)
        //         setOrganization(true)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }


    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const reader = new FileReader();
        if (files && files.length > 0) {
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                if (reader.result) {
                    setImg(reader.result as any);
                }
            };
        }
    };

    const uploadFileToServer = async () => {
        if (!img) {
            uploadRef.current?.click();
        } else {
            try {
                // setLoading(true);
                const { data } = await axios.post(`/organization/uploadimg/${query.page}`, { image: img });
                toast("Image uploaded successfully");
                setImg("");
            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false);
            }
        }
    };

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
                            <div className="edit-sec relative left-10 -top-20">
                                <div className="py-3 mb-4 d-flex">
                                    <div className="pro-img-wrap rounded-circle position-relative">
                                        <input type="file" ref={uploadRef} onChange={handleImg} />
                                        <button
                                            className="btn p-0 z-50"
                                            onClick={uploadFileToServer}
                                        >
                                            <i
                                                className={`fas fs-5 d-flex align-items-center justify-content-center  rounded-circle  text-secondary ${img ? "fa-save" : "fa-pencil-alt"
                                                    }`}
                                            ></i>
                                        </button>

                                        <div className="pro-img position-relative rounded-circle">
                                            <img
                                                src={img || user?.image || "/images/user.png"}
                                                alt=""
                                                className="position-absolute"
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <div className="flex flex-column justify-center">
                                            <div className='flex'>
                                                <div className="text-xl font-bold ">{user?.name}</div>
                                                <div className="text-xs text-gray-900 flex my-auto ml-6">{user?.followers} Followers
                                                    <div className="text-xs text-gray-900 ml-2">
                                                        Following {user?.following}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-thin w-96">
                                                {user?.description.substring(0, 100) + '...'}
                                            </div>
                                            <div className="pt-1 text-sm"> {user?.city}, {user?.country}</div>
                                        </div>
                                        <div className="font-black text-lg mr-32">
                                            <Link href={`org/update?page=${user?._id}`}>
                                                <button className="bg-transparent p-2 text-warning"> <span>&#x270E;</span> Edit</button>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* {
                                        user?.author === author?.id ? (
                                            <div className="font-black text-lg">
                                                <Link href={'/org/update'}>
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
                                        )
                                    } */}
                                </div>
                            </div>
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
                    {/* <div className="text-center text-lg p-3">
                        <Link href={`/startcamp`}>
                            <button className="bg-gray-200 w-44 p-2 rounded-full"> Start Campaign...</button>
                        </Link>
                    </div> */}
                    <div className="lg:flex mt-3">
                        <div className="lg:w-72 mt-3 h-80 lg:mr-4 rounded-md bg-gray-50">
                            {user?.author === author?.id ? (<div className="text-center font-black text-base p-3">
                                <Link href={`/addadmin?page=${query.page}`}>
                                    <button className="bg-transparent px-8 w-44 text-warning">Admin</button>
                                </Link>
                                {/* <div className="flex cursor-pointer my-2" onClick={() => { router.push(`/user?page=${author?.id}`), setOrganization(false) }}>
                                        {user?.image === "Upload org Image" ? (
                                            <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                        ) : (
                                            <img className="w-8 h-8 rounded-full" src={author?.image} alt="" />
                                        )}
                                        <p className="pl-2 mt-2 capitalize">{author?.name}</p>
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
                            </div>) : (
                                null
                            )}

                            {author?.id === query.page ? (
                                <div className="text-center font-black text-base p-3">
                                    <Link href="/mycamp">
                                        <button className=" bg-transparent p-2 w-44 text-black">Dashboard</button>
                                    </Link>
                                    <button className=" bg-transparent p-2 w-44 text-black" onClick={() => setProduct(!product)}> Products</button>
                                    <Link href={'/create'}>
                                        <button className="bg-transparent flex justify-between px-8 w-44 text-black">
                                            <div>Organization</div>
                                            <div><span>&#43;</span>
                                                create
                                            </div>
                                        </button>
                                    </Link>
                                    <div>
                                        {orgs.map((org, i) => (
                                            <div key={i} className="flex cursor-pointer my-2" onClick={() => singleOrg(org?._id)}>
                                                {org?.image === "Upload org Image" ? (
                                                    <img className="w-8 h-8 opacity-20" src="/images/logo.svg" alt="" />
                                                ) : (
                                                    <img className="w-8 h-8 rounded-full" src={org?.image} alt="" />
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
                            {all.length === 0 ? (<div className="text-center">You dont have any campaign at the moment</div>) : (<></>)}
                            {
                                all[0] !== undefined ? all.map((single: any, index: number) => {
                                    // setType(single.__typename)
                                    switch (single.__typename) {
                                        case 'Advert':
                                            return (<div>
                                                <AdvertsComp advert={single} key={index} />
                                            </div>
                                            )
                                        case 'Event':
                                            return (<div>
                                                <EventsCard key={index} event={single} />
                                            </div>
                                            )
                                        case 'Petition':
                                            return (<div>
                                                <PetitionComp petition={single} key={index} />
                                            </div>
                                            )
                                        case 'Victory':
                                            return (<div>
                                                victories
                                            </div>
                                            )
                                        case 'Post':
                                            return (<div>
                                                <CampComp key={index} post={single} />
                                            </div>
                                            )
                                    }
                                })
                                    : null
                            }
                        </div>
                        )}
                    </div>
                </div>
                <CreatePost open={openPost} handelPetition={handelPetition} handelClick={handelClick} post={null} />
                <CreateEvent open={openEvent} handelClick={handelEventClick} />
                <CreateAdvert open={openAd} handelClick={handelAdClick} />
                <StartPetition open={openPetition} handelClick={handelPetition} data={null} />
                <ToastContainer />
            </>
        </FrontLayout >
    );
}

export default org;