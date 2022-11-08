/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
import { useState, useRef } from 'react'
import { Dropdown } from 'rsuite';
import axios from "axios";

const CreateEvent = ({ open, handelClick }: { open: boolean, handelClick(): void }): JSX.Element => {
    const [title, setTitle] = useState("")
    const uploadRef = useRef<HTMLInputElement>(null);
    const [category, setCategory] = useState("Add Category")
    const [image, setFilePreview] = useState({
        type: "",
        file: "",
        name: "",
    })
    const [aim, setAim] = useState("")
    const [target, setTarget] = useState("")
    const [body, setBody] = useState("")

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
        // handelClick()
        try {
            const { data } = await axios.post('https://apiv5-xacq2.ondigitalocean.app/api/v3/petition', {
                title: title,
                category: category,
                image: image.type === "image" ? image.file : "",
                aim: aim,
                target: target,
                body: body
            });
            console.log(data)
            handelClick()
        } catch (error) {
            console.log(error);
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
                    <div className="text-base my-3">Upload Petition Cover  Image</div>
                    <div className="text-sm my-2 text-gray-800">Cover image should be minimum of 500pxl/width</div>
                </div>
                <div className="my-3 text-sm">
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="p-2 border border-gray-700 w-full rounded-sm text-sm" placeholder='Title of petition' />
                </div>
                <div className="mt-3 text-sm">
                    <textarea onChange={(e) => setAim(e.target.value)} className="p-1 border border-gray-700 w-full h-20 rounded-sm" placeholder='What is the aim of this petition' />
                </div>

                <div className="mt-3 text-sm">
                    <textarea onChange={(e) => setTarget(e.target.value)} className="p-1 border border-gray-700 w-full h-20 rounded-sm" placeholder='Who are you addressing the petition to ? ( e.g Presidnt, Prime minister, Governor, Senator, Rep e.t.c)' />
                </div>
                <div className="mt-3 text-sm">
                    <textarea onChange={(e) => setBody(e.target.value)} className="p-1 border border-gray-700 w-full h-32 rounded-sm" placeholder='Type the issue that you are complaining about' />
                </div>
                <div className='z-40'>
                    <Dropdown placement="topStart" title={<div className='text-sm text-warning'>{category}</div>}>
                        <Dropdown.Item>Human right awareness</Dropdown.Item>
                        <Dropdown.Item>Social Policy</Dropdown.Item>
                        <Dropdown.Item>Criminal Justice</Dropdown.Item>
                        <Dropdown.Item>Human Right Action</Dropdown.Item>
                        <Dropdown.Item>Development</Dropdown.Item>
                        <Dropdown.Item>Environment</Dropdown.Item>
                        <Dropdown.Item>Health</Dropdown.Item>
                        <Dropdown.Item>Politics</Dropdown.Item>
                        <Dropdown.Item>Disability</Dropdown.Item>
                        <Dropdown.Item>Equality</Dropdown.Item>
                    </Dropdown>
                </div>
                {/* </Modal.Body> */}
                <Modal.Footer>
                    <div className='flex justify-evenly w-1/2 mx-auto'>
                        <button onClick={handelClick} className="p-1 text-warning border border-warning rounded-md w-20 my-4">
                            Save
                        </button>
                        <button onClick={createPetition} className="p-1 bg-warning text-white rounded-md w-44 my-4">
                            Preview and launch
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CreateEvent;