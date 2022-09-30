/* eslint-disable react/react-in-jsx-scope */
import { Modal } from 'rsuite';
// import { useState } from 'react'
import { Dropdown } from 'rsuite';

const CreateEvent = ({ open, handelClick }: { open: boolean, handelClick(): void }): JSX.Element => {
    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Create petition</Modal.Title>
                    </div>
                </Modal.Header>
                {/* <Modal.Body> */}
                <div className="bg-gray-200 w-full p-4 text-center">
                    <img src="/images/home/icons/ant-design_camera-outlined.svg" className="w-20 h-20 mx-auto" alt="" />
                    <div className="text-base my-3">Upload Petition Cover  Image</div>
                    <div className="text-sm my-2 text-gray-800">Cover image should be minimum of 500pxl/width</div>
                </div>
                <div className="my-3 text-sm">
                    <input type="text" className="p-2 border border-gray-700 w-full rounded-sm text-sm" placeholder='Title of petition' />
                </div>
                <div className="mt-3 text-sm">
                    <textarea className="p-1 border border-gray-700 w-full h-20 rounded-sm" placeholder='What is the aim of this petition' />
                </div>

                <div className="mt-3 text-sm">
                    <textarea className="p-1 border border-gray-700 w-full h-20 rounded-sm" placeholder='Who are you addressing the petition to ? ( e.g Presidnt, Prime minister, Governor, Senator, Rep e.t.c)' />
                </div>
                <div className="mt-3 text-sm">
                    <textarea className="p-1 border border-gray-700 w-full h-32 rounded-sm" placeholder='Type the issue that you are complaining about' />
                </div>
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
                {/* </Modal.Body> */}
                <Modal.Footer>
                    <div className='flex justify-evenly w-1/2 mx-auto'>
                        <button onClick={handelClick} className="p-1 text-warning border border-warning rounded-md w-20 my-4">
                            Save
                        </button>
                        <button onClick={handelClick} className="p-1 bg-warning text-white rounded-md w-44 my-4">
                            Preview and launch
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CreateEvent;