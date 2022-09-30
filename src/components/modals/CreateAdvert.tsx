/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
import { useState } from 'react'

const CreateAdvert = ({ open, handelClick }: { open: boolean, handelClick(): void }): JSX.Element => {
    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Create Advert</Modal.Title>
                    </div>
                </Modal.Header>
                {/* <Modal.Body> */}
                <div className="bg-gray-200 w-full p-4 text-center">
                    <img src="/images/home/icons/ant-design_camera-outlined.svg" className="w-20 h-20 mx-auto" alt="" />
                    <div className="text-base my-3">Upload Advert Cover  Image</div>
                    <div className="text-sm my-2 text-gray-800">Cover image should be minimum of 500pxl/width</div>
                </div>
                <div className="mt-2">
                    <div className='text-sm my-1'>Caption</div>
                    <input type="text" className="p-1 border border-gray-700 w-full rounded-sm" />
                </div>
                <div className="mt-2">
                    <div className='text-sm my-1'>Message</div>
                    <textarea className="p-1 border border-gray-700 w-full h-20 rounded-sm" />
                </div>
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%]">
                        <div className='text-sm my-1'>Email</div>
                        <input type="email" className="w-full border border-gray-700 text-sm" />
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Website link</div>
                        <input type="text" className="w-full border border-gray-700 text-sm" />
                    </div>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%]">
                        <div className='text-sm my-1'>Phone number</div>
                        <input type="number" className="w-full border border-gray-700 text-sm" />
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Duration</div>
                        <input type="text" className="w-full border border-gray-700 text-sm" />
                    </div>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%]">
                        <div className='text-sm my-1'>Start date</div>
                        <input type="date" className="w-full border border-gray-700 text-sm" />
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>End date</div>
                        <input type="date" className="w-full border border-gray-700 text-sm" />
                    </div>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Target audience</div>
                        <select name="" id="" className="w-full border border-gray-700 text-sm">
                            <option value="">Everyone</option>
                            <option value="">Followers</option>
                            <option value="">Location</option>
                        </select>
                    </div>
                    <div className="w-[45%] text-sm">
                        <div className='text-sm my-1'>Call to action</div>
                        <select name="" id="" className="w-full border border-gray-700 text-sm">
                            <option value="">Book appointment</option>
                            <option value="">Call us</option>
                            <option value="">Visit our website</option>
                            <option value="">Email us</option>
                        </select>
                    </div>
                </div>
                {/* </Modal.Body> */}
                <Modal.Footer>
                    <button onClick={handelClick} className="p-1 bg-warning text-white rounded-md w-44 my-4">
                        Create Event
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CreateAdvert;