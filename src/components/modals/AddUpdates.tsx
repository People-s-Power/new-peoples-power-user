/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
import { useState, useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";

const AddUpdates = ({ open, handelClick, petition }: { open: boolean, handelClick(): void, petition: any }): JSX.Element => {
    const author = useRecoilValue(UserAtom);
    const [loading, setLoading] = useState(false)
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
    const clearFile = () => {
        setFilePreview({
            type: "",
            file: "",
            name: "",
        })
    }
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post('petition/update', {
                petitionId: petition.id,
                body: body,
                image: image.file
            })
            toast.success("Updates added successfulluy");
            setLoading(false);
            handelClick()
        } catch (err) {
            console.log(err)
            toast.warn("Oops an error occured");
            setLoading(false);
        }
    }

    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Add Update</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex">
                        <img src={author?.image} className="w-10 h-10 rounded-full mr-4" alt="" />
                        <div className="text-sm">{author?.name}</div>
                    </div>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} name="" className="w-full h-32 border border-white text-sm" placeholder="Let your supporters know about the progress of this petition ..."></textarea>

                </Modal.Body>

                <Modal.Footer>
                    <input
                        type="file"
                        ref={uploadRef}
                        className="d-none"
                        onChange={handleImage}
                    />
                    {
                        image.file === "" ? null : (
                            <div className='relative w-20 h-20'>
                                <img src={image.file} className="w-20 h-20" alt="" />
                                <div className='absolute top-1 right-1 w-6 h-6 rounded-full bg-danger text-sm text-center text-white'>
                                    <div className="mx-auto my-auto text-white" onClick={() => clearFile()}>x</div>
                                </div>
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
                        <button onClick={handleSubmit} className="p-1 bg-warning text-white rounded-sm w-40">
                            {loading ? "Loading..." : "Add Update"}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
};
export default AddUpdates;
