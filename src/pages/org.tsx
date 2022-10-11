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
import Slider from "../components/camp-slider/Slider"
import router, { useRouter } from "next/router";
import { GET_ORGANIZATION, GET_ORGANIZATIONS } from "apollo/queries/orgQuery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const user = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [user, setUser] = useState<IUser>()
    const [orgs, setOrgs] = useState<IOrg[]>([])
    const { query } = useRouter();
    const author = useRecoilValue(UserAtom);
    const [product, setProduct] = useState(false)
    const [organization, setOrganization] = useState(false)
    const [img, setImg] = useState("");
    const uploadRef = useRef<HTMLInputElement>(null);

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
    useQuery(GET_ORGANIZATION, {
        variables: { ID: page },
        client: apollo,
        onCompleted: (data) => {
            // console.log(data)
            setUser(data.getOrganzation)
            localStorage.setItem("operator", JSON.stringify(data.getOrganzation.operators))
        },
        onError: (err) => console.log(err),
    });

    useQuery(GET_ORGANIZATIONS, {
        variables: { ID: author?.id },
        client: apollo,
        onCompleted: (data) => {
            console.log(data)
            setOrgs(data.getUserOrganizations)
        },
        onError: (err) => console.log(err),
    });

    useEffect(() => {
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
                            <div className="edit-sec relative -top-20">
                                <div className="py-3 mb-4 d-flex justify-center">
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
                                            {isValidUrl(user?.image) ? (
                                                <img
                                                    src={img || user?.image}
                                                    alt=""
                                                    className="position-absolute"
                                                />
                                            ) : (
                                                <div className="absolute top-40 mx-auto  left-[45%] rounded-full w-24 bg-white p-1 h-24">
                                                    <img className="w-full rounded-full" src="/images/user.png" alt="" />
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <div className='px-10 text-center'>
                                    <div className="flex flex-column justify-center">
                                        <div className="text-lg font-bold ">{user?.name}</div>
                                        <div className="pt-1 ml-2"> {user?.city}, {user?.country}</div> </div>
                                    <div className="text-sm font-thin w-96 mx-auto">
                                        {user?.description}
                                    </div>
                                    <div className="text-lg font-black text-gray-900 justify-center flex ">{user?.followersCount} Followers
                                        <div className="text-lg font-black text-gray-900 ml-2">
                                            Following {user?.followingCount} </div> </div>
                                    {
                                        user?.author === author?.id ? (
                                            <div className="font-black text-lg">
                                                <Link href={'/create'}>
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
                                                    )
                                                ))
                                            ) : (
                                                <div>
                                                    <button onClick={() => follow()} className="bg-transparent p-2 text-warning"> <span>&#10010;</span> Follow</button>
                                                </div>
                                            )
                                        )
                                    }
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
                                            <p className="pl-2 mt-2 capitalize">{org?.name}</p>
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
                            {campaigns.length === 0 ? (<div className="text-center">You dont have any campaign at the moment</div>) : (<></>)}
                            {campaigns.map((camp, i) => (
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
                </div>
                <ToastContainer />
            </>
        </FrontLayout >
    );
}

export default user;