/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
import { useRef, useState } from 'react'
import axios from "axios";
import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';
import { CREATE_ADVERT } from "apollo/queries/advertsQuery";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAdvert = ({ open, handelClick }: { open: boolean, handelClick(): void }): JSX.Element => {
    const [image, setFilePreview] = useState({
        type: "",
        file: "",
        name: "",
    })
    const uploadRef = useRef<HTMLInputElement>(null);
    const [caption, setCaption] = useState('')
    const [link, setLink] = useState('')
    const [duration, setDuration] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [audience, setAudience] = useState('')
    const [action, setAction] = useState('')
    const [loading, setLoading] = useState(false)

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const reader = new FileReader();

        if (files && files.length > 0) {
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                if (reader.result) {
                    let type = files[0].name.substr(files[0].name.length - 3)
                    // console.log(type)
                    setFilePreview({
                        type: type === "mp4" ? "video" : "image",
                        file: reader.result as string,
                        name: files[0].name,
                    });
                }
            };
        }
    };
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(CREATE_ADVERT),
                variables: {
                    message: message,
                    caption: caption,
                    audience: audience,
                    action: action,
                    link: link,
                    duration: duration,
                    email: email,
                    imageFile: image.file
                }
            })
            toast('Advert Created Successfully')
            console.log(data)
            handelClick()
            setMessage('')
            setCaption('')
            setAudience('')
            setLink('')
            setAction('')
            setEmail('')
            setDuration('')
            setLoading(true)
            setFilePreview({
                type: "",
                file: "",
                name: "",
            });
        } catch (error) {
            console.log(error);
            toast.warn('Oops something happened')
        }
    }

    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Create Advert</Modal.Title>
                    </div>
                </Modal.Header>
                {/* <Modal.Body> */}
                <div className="bg-gray-200 w-full p-4 text-center relative">
                    {image?.type === "image" && (
                        <img onClick={() => uploadRef.current?.click()} src={image.file} width="500" className="h-52 absolute top-0" />
                    )}
                    <input
                        type="file"
                        ref={uploadRef}
                        className="d-none"
                        onChange={handleImage}
                    />
                    <img onClick={() => uploadRef.current?.click()} src="/images/home/icons/ant-design_camera-outlined.svg" className="w-20 h-20 mx-auto" alt="" />
                    <div className="text-base my-3">Upload Advert Cover  Image</div>
                    <div className="text-sm my-2 text-gray-800">Cover image should be minimum of 500pxl/width</div>
                </div>
                <div className="mt-2">
                    <div className='text-sm my-1'>Caption</div>
                    <input type="text" onChange={(e) => setCaption(e.target.value)} className="p-1 border border-gray-700 w-full rounded-sm" />
                </div>
                <div className="mt-2">
                    <div className='text-sm my-1'>Message</div>
                    <textarea onChange={(e) => setMessage(e.target.value)} className="p-1 border border-gray-700 w-full h-20 rounded-sm" />
                </div>
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%]">
                        <div className='text-sm my-1'>Email</div>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border border-gray-700 text-sm" />
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Website link</div>
                        <input onChange={(e) => setLink(e.target.value)} type="text" className="w-full border border-gray-700 text-sm" />
                    </div>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%]">
                        <div className='text-sm my-1'>Phone number</div>
                        <input type="number" className="w-full border border-gray-700 text-sm" />
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Duration</div>
                        <input onChange={(e) => setDuration(e.target.value)} type="text" className="w-full border border-gray-700 text-sm" />
                    </div>
                </div>
                {/* <div className='flex justify-between mt-2'>
                    <div className="w-[45%]">
                        <div className='text-sm my-1'>Start date</div>
                        <input type="date" className="w-full border border-gray-700 text-sm" />
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>End date</div>
                        <input type="date" className="w-full border border-gray-700 text-sm" />
                    </div>
                </div> */}
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Target audience</div>
                        <select onChange={(e) => setAudience(e.target.value)} name="" id="" className="w-full border border-gray-700 text-sm">
                            <option value="">Everyone</option>
                            <option value="">Followers</option>
                            <option value="">Interest</option>
                            <option value="">Location</option>
                        </select>
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Call to action</div>
                        <select onChange={(e) => setAction(e.target.value)} name="" id="" className="w-full border border-gray-700 text-sm">
                            <option value="">Book now</option>
                            <option value="">Call us</option>
                            <option value="">Visit our website</option>
                            <option value="">Email us</option>
                            <option value="">Apply Now</option>
                        </select>
                    </div>
                </div>
                {/* </Modal.Body> */}
                <Modal.Footer>
                    <button onClick={handleSubmit} className="p-1 bg-warning text-white rounded-md w-44 my-4">
                        {loading ? 'Loading...' : 'Create Event'}
                    </button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
};
export default CreateAdvert;