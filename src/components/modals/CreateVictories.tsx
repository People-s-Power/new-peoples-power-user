import React from 'react';
import { Modal } from 'rsuite';
import { useState, useRef } from 'react'

const CreateVictories = ({ open, handelClick, victory }: { open: boolean, handelClick(): void, victory: any }): JSX.Element => {
    const [body, setBody] = useState("")
    const handelSubmit = () => {

    }
    return (
        <>
            <Modal open={open} onClose={handelClick}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Celebrate Victory</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex">
                        <img src="/images/person.png" className="w-10 h-10 rounded-full mr-4" alt="" />
                        <div className="text-sm">Evans Doe</div>
                    </div>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} name="" className="w-full h-32 border border-white text-sm" placeholder="Let your supporters congratulate you on this Victory..."></textarea>

                </Modal.Body>

                <Modal.Footer>

                    <div className="flex justify-between text-gray-500">

                        <button onClick={handelSubmit} className="p-1 bg-warning text-white rounded-sm w-40">
                            Celebrate Victory
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateVictories;