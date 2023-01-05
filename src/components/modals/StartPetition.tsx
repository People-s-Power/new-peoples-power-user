/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
import { useState, useRef, useEffect } from 'react'
import { Dropdown } from 'rsuite';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bodyStreamToNodeStream } from 'next/dist/server/body-streams';
import { useRouter } from 'next/router'


const CreateEvent = ({ open, handelClick, data }: { open: boolean, handelClick(): void, data: any }): JSX.Element => {
    const [title, setTitle] = useState(data?.title || "")
    const [loading, setLoading] = useState(false)
    const uploadRef = useRef<HTMLInputElement>(null);
    const [category, setCategory] = useState("Add Category")
    const [image, setFilePreview] = useState({
        type: data === null ? "" : "image",
        file: data?.image || "",
        name: "",
    })
    const router = useRouter()
    const [aim, setAim] = useState(data?.aim || "")
    const [target, setTarget] = useState(data?.target || "")
    const [body, setBody] = useState(data?.body || "")
    useEffect(() => {
    }, [])
    const [preview, setPreview] = useState(false)
    const handelPreview = () => {
        handelClick();
        setPreview(!preview);
    }
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

    const createPetition = async () => {
        if (data === null) {
            try {
                setLoading(true)
                const { data } = await axios.post('https://apiv5-xacq2.ondigitalocean.app/api/v3/petition', {
                    title: title,
                    category: category,
                    image: image.type === "image" ? image.file : "",
                    aim: aim,
                    target: target,
                    body: body
                });
                console.log(data)
                setLoading(false)
                setPreview(false)
                toast('Petition Created Successfully')
                router.push(`/promote?slug=${data.slug}`)
                setTitle("");
                setCategory("")
                setAim("");
                setTarget("");
                setBody("");
                setFilePreview({
                    type: "",
                    file: "",
                    name: "",
                });
            } catch (error) {
                console.log(error);
                toast.warn('Oops! Something went wrong')
            }
        } else {
            try {
                setLoading(true)
                const { data } = await axios.put('https://apiv5-xacq2.ondigitalocean.app/api/v3/petition', {
                    title: title,
                    category: category,
                    image: image.type === "image" ? image.file : "",
                    aim: aim,
                    target: target,
                    body: body
                });
                console.log(data)
                setLoading(false)
                setPreview(false)
                toast('Petition Updated Successfully')
                setTitle("");
                setCategory("")
                setAim("");
                setTarget("");
                setBody("");
                setFilePreview({
                    type: "",
                    file: "",
                    name: "",
                });
            } catch (error) {
                console.log(error);
                toast.warn('Oops! Something went wrong')
            }
        }
    };

    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Create petition</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
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
                        <img onClick={() => uploadRef.current?.click()} src="/images/home/icons/ant-design_camera-outlined.svg" className="w-20 cursor-pointer h-20 mx-auto" alt="" />
                        <div className="text-base my-3">Upload Petition Cover  Image</div>
                        <div className="text-sm my-2 text-gray-800">Cover image should be minimum of 500pxl/width</div>
                    </div>
                    <div className="my-3 text-sm">
                        <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} className="p-2 border border-gray-700 w-full rounded-sm text-sm" placeholder='Title of petition' />
                    </div>
                    <div className="mt-3 text-sm">
                        <textarea value={aim} onChange={(e) => setAim(e.target.value)} className="p-1 border border-gray-700 w-full h-20 rounded-sm" placeholder='What is the aim of this petition' />
                    </div>

                    <div className="mt-3 text-sm">
                        <textarea value={target} onChange={(e) => setTarget(e.target.value)} className="p-1 border border-gray-700 w-full h-20 rounded-sm" placeholder='Who are you addressing the petition to ? ( e.g Presidnt, Prime minister, Governor, Senator, Rep e.t.c)' />
                    </div>
                    <div className="mt-3 text-sm">
                        <textarea value={body} onChange={(e) => setBody(e.target.value)} className="p-1 border border-gray-700 w-full h-32 rounded-sm" placeholder='Type the issue that you are complaining about' />
                    </div>
                    <div className='z-40'>
                        <Dropdown placement="topStart" title={<div className='text-sm text-warning'>{category}</div>}>
                            <Dropdown.Item onClick={() => setCategory('Human right awareness')}>Human right awareness</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Social Policy')}>Social Policy</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Criminal Justice')}>Criminal Justice</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Human Right Action')}>Human Right Action</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Development')}>Development</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Environment')}>Environment</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Health')}>Health</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Politics')}>Politics</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Disability')}>Disability</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory('Equality')}>Equality</Dropdown.Item>
                        </Dropdown>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex justify-evenly w-1/2 mx-auto'>
                        <button onClick={handelClick} className="p-1 text-warning border border-warning rounded-md w-20 my-4">
                            Save
                        </button>
                        <button onClick={handelPreview} className="p-1 bg-warning text-white rounded-md w-44 my-4">
                            {loading ? 'Loading...' : 'Preview and launch'}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal open={preview} onClose={handelPreview}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Preview petition</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='my-2 text-lg'>{title}</div>
                        <div className='my-2 w-full'>
                            <img src={image.file} alt="" />
                        </div>
                        <div className="text-sm my-2">{body}</div>
                        <div className="text-sm my-2">Category: {category}</div>
                        <div className="text-sm my-2">Aim: {aim}</div>
                        <div className="text-sm my-2">Target: {target}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex justify-evenly w-1/2 mx-auto'>
                        <button onClick={() => { handelPreview(); handelClick() }} className="p-1 text-warning border border-warning rounded-md w-20 my-4">
                            Edit
                        </button>
                        <button onClick={() => { createPetition(); }} className="p-1 bg-warning text-white rounded-md w-44 my-4">
                            {loading ? 'Loading...' : 'Launch'}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
};
export default CreateEvent;