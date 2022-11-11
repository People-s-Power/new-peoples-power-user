/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
import { useState, useRef } from 'react'
import { CREATE_POST } from "apollo/queries/postQuery";
import { Dropdown } from 'rsuite';
import axios from "axios";
import { SERVER_URL } from "utils/constants";
import { print } from 'graphql';

const CreatePost = ({ open, handelClick }: { open: boolean, handelClick(): void }): JSX.Element => {
    const [image, setFilePreview] = useState({
        type: "",
        file: "",
        name: "",
    })
    const [body, setBody] = useState("")
    const uploadRef = useRef<HTMLInputElement>(null);

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
        try {
            const { data } = await axios.post(SERVER_URL + '/graphql', {
                query: print(CREATE_POST),
                variables: {
                    body: body,
                    imageFile: image.file
                }
            })
            console.log(data)
            handelClick()
            setBody("")
            setFilePreview({
                type: "",
                file: "",
                name: "",
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Make a post</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex">
                        <img src="/images/person.png" className="w-10 h-10 rounded-full mr-4" alt="" />
                        <div className="text-sm">Evans Doe</div>
                    </div>
                    <textarea onChange={(e) => setBody(e.target.value)} name="" className="w-full h-32 border border-white text-sm" placeholder="Start your complaint, let people know about it and win your supporters"></textarea>

                </Modal.Body>
                <div className='z-40'>
                    <Dropdown placement="topStart" title={<div className='text-sm text-warning'>Add Category</div>}>
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
                <Modal.Footer>
                    <input
                        type="file"
                        ref={uploadRef}
                        className="d-none"
                        onChange={handleImage}
                    />
                    {
                        image.file === "" ? null : (
                            <div className='flex '>
                                <img src={image.file} className="w-20 h-20" alt="" />
                            </div>
                        )
                    }
                    <div className="flex justify-between text-gray-500">
                        <div className="w-24 flex justify-between my-auto">
                            <div onClick={() => uploadRef.current?.click()} className="cursor-pointer">
                                <img className="w-4 h-4 my-auto" src="/images/home/icons/ic_outline-photo-camera.svg" alt="" />
                            </div>
                            <div className="cursor-pointer">
                                <img className="w-4 h-4 my-auto" src="/images/home/icons/charm_camera-video.svg" alt="" />
                            </div>
                            <div className="cursor-pointer">
                                <img className="w-4 h-4 my-auto" src="/images/home/icons/fe_sitemap.svg" alt="" />
                            </div>
                            <div className="cursor-pointer">
                                <img className="w-4 h-4 my-auto" src="/images/home/icons/tabler_article.svg" alt="" />
                            </div>
                        </div>
                        <div className="text-sm my-auto">Celebrate victory</div>
                        <div className="text-sm my-auto">Make petition</div>
                        <button onClick={handleSubmit} className="p-1 bg-warning text-white rounded-sm w-20">
                            Post
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CreatePost;
