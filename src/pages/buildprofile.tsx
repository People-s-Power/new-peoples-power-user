import React, { useState, useRef, useEffect } from 'react';
import FrontLayout from "layout/FrontLayout";
import { Steps, ButtonGroup, Button } from 'rsuite';
import ConnectionCard from '../components/ConnectionCard'
import axios from 'axios';
import { IUser } from "types/Applicant.types";
import { useRouter } from "next/router";
import { UserAtom } from "atoms/UserAtom";
import { useRecoilValue } from "recoil";
import { GET_ALL_USERS } from "apollo/queries/generalQuery";

import { apollo } from "apollo";
import { useQuery } from "@apollo/client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function buildprofile() {
    const [step, setStep] = React.useState(0);
    const onChange = (nextStep: React.SetStateAction<number>) => {
        setStep(nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep);
    };
    const router = useRouter()
    const [users, setUsers] = useState<IUser[]>([])
    const uploadRef = useRef<HTMLInputElement>(null);
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [myInterest, setMyInterest] = useState<String[]>([])
	const user = useRecoilValue(UserAtom);

    const [img, setImg] = useState("");
    const interest = [
        "Human Right",
        "Social Policy",
        "Criminal Justice",
        "Environment Justice",
        "Health",
        "Politics",
        "Discrimination",
        "Development",
        "Disability"
    ]
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // const { files } = e.target;
        // setImg(URL.createObjectURL(files?.[0] as any));
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
                const { data } = await axios.post("/user/upload", { image: img });
                toast("Image uploaded successfully");
                setImg("");
                onNext()
            } catch (error) {
                console.log(error);
            } finally {
            }
        }
    };
    const handleSubmit = async () => {
		try {
			const { data } = await axios.put("/user/update", {
                name: user.name,
                phone: user.phone,
                country,
                city,
                description
            });
			console.log(data);
			toast.success("Profile Updates Successfully!")
			router.push(`/`)
		} catch (error) {
			console.log(error);
			toast.warn("Oops an error occured!")
		}
	};
    
    useQuery(GET_ALL_USERS, {
        client: apollo,
        onCompleted: (data) => {
            console.log(data)
            setUsers(data.getUsers)
        },
        onError: (err) => console.log(err),
    });

    const locationNext = () => {
        city && country !== "" ? onNext() : null
    }
    const descriptionNext = () => {
        description !== "" ? onNext() : null
    }
    return (
        <div>
            <FrontLayout showFooter={false}>
                <main className='w-2/3 mx-auto'>
                    <Steps current={step}>
                        <Steps.Item title="Photo" />
                        <Steps.Item title="Location" />
                        <Steps.Item title="Bio/Description" />
                        <Steps.Item title="Interests" />
                        <Steps.Item title="Followers" />
                    </Steps>
                    {(() => {
                        switch (step) {
                            case 0:
                                return (<div>
                                    <div className='text-xl text-center py-14'>Add your photo to build your profile</div>
                                    <div>
                                        <input
                                            type="file"
                                            ref={uploadRef}
                                            className="d-none"
                                            onChange={handleImg}
                                        />
                                        <img onClick={() => uploadRef.current?.click()} className='rounded-full hover:opacity-50 w-44 h-44 mx-auto' src={img || "/images/person.png"} alt="" />
                                    </div>
                                    <div className='text-center mx-auto my-8'>
                                        <button className="p-2 bg-warning text-white rounded-sm" onClick={uploadFileToServer}>
                                            Upload Photo
                                        </button>
                                        <div className='my-1'>
                                            <Button onClick={onNext}>
                                                Skip
                                            </Button>
                                        </div>
                                    </div>
                                </div>)
                            case 1:
                                return (<div>
                                    <div className='text-xl text-center py-14'>Add your location to get personalised content</div>
                                    <div className='lg:flex justify-evenly'>
                                        <div>
                                            <div>Country</div>
                                            <div>
                                                <input onChange={(e) => setCountry(e.target.value)} type="text" className='rounded-sm' placeholder='Nigeria' />
                                            </div>
                                        </div>
                                        <div>
                                            <div>City</div>
                                            <div>
                                                <input onChange={(e) => setCity(e.target.value)} type="text" className='rounded-sm' placeholder='Lagis' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center mx-auto my-8'>
                                        <button className="p-2 bg-warning text-white rounded-sm" onClick={locationNext}>
                                            Next
                                        </button>
                                        <Button onClick={onPrevious}>
                                            Previous
                                        </Button>
                                    </div>
                                </div>)
                            case 2:
                                return (<div>
                                    <div className='text-xl text-center py-14'>Explain briefly about yourself</div>
                                    <div className='w-full'>
                                        <div className='w-full'>
                                            <div>Bio/Description</div>
                                            <div>
                                                <textarea onChange={(e) => setDescription(e.target.value)} className='w-full h-44'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center mx-auto my-8'>
                                        <button className="p-2 bg-warning text-white rounded-sm" onClick={descriptionNext}>
                                            Next
                                        </button>
                                        <Button onClick={onPrevious}>
                                            Previous
                                        </Button>
                                        <div className='my-1'>
                                            <Button onClick={onNext}>
                                                Skip
                                            </Button>
                                        </div>
                                    </div>
                                </div>)
                            case 3:
                                return (<div>
                                    <div className='text-xl text-center py-14'>Select an area of interest to help us recommend campaigns that will interest you</div>
                                    <div className='w-80 mx-auto'>
                                        {interest.map((single, index) => (
                                            <div key={index} className='flex my-3'>
                                                <input onChange={(e) => setMyInterest([...myInterest, e.target.value])} type="checkbox" value={single} className='p-2 rounded-full' />
                                                <div className='my-auto mx-4'>{single}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='text-center mx-auto my-8'>
                                        <button className="p-2 bg-warning text-white rounded-sm" onClick={onNext}>
                                            Next
                                        </button>
                                        <Button onClick={onPrevious}>
                                            Previous
                                        </Button>
                                    </div>
                                </div>)
                            case 4:
                                return (<div>
                                    <div className='text-xl text-center py-14'>
                                        <div className='font-bold text-xl'>Grow your feeds by following people and Organizations you may know</div>
                                        (People and organizations with similar insterests or location with you)
                                    </div>
                                    <div className='flex flex-wrap'>
                                        {users.slice(0, 12).map((user, index) => (
                                            <ConnectionCard key={index} user={user} />
                                        ))}
                                    </div>
                                    <div className='text-center mx-auto my-8'>
                                        <button className="p-2 bg-warning text-white rounded-sm" onClick={handleSubmit}>
                                            Finish
                                        </button>
                                        <Button onClick={onPrevious}>
                                            Previous
                                        </Button>
                                    </div>
                                </div>)
                            default:
                                return null
                        }
                    })()}
                </main>
            </FrontLayout>
            <ToastContainer />
        </div>
    );
}

export default buildprofile;