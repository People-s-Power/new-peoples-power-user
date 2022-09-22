import { Modal } from 'rsuite';
import { useState } from 'react'

const CreatePost = ({ open, handelClick }: { open: boolean, handelClick(): void }): JSX.Element => {
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
                    <textarea name="" className="w-full h-32 border border-white text-sm" placeholder="What are your social concern ?"></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-between text-gray-500">
                        <div className="w-24 flex justify-between my-auto">
                            <div className="cursor-pointer">
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
                        <div className="text-sm my-auto">Make petition</div>
                        <div className="text-sm my-auto">Celebrate victory</div>
                        <button onClick={handelClick} className="p-1 bg-warning text-white rounded-sm w-20">
                            Post
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CreatePost;
