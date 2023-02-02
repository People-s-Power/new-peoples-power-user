/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Modal } from 'rsuite';
import { useState, useRef } from 'react'
import { CREATE_POST, UPDATE_POST } from "apollo/queries/postQuery";
import { Dropdown } from 'rsuite';
import axios from "axios";
import { SERVER_URL, states } from "utils/constants";
import { print } from 'graphql';

import { useRecoilValue } from "recoil";
import { UserAtom } from "atoms/UserAtom";
import PropTypes, { InferProps } from 'prop-types';
import Select from 'react-select';

const FindExpartModalProp = {
    author: PropTypes.shape({ image: PropTypes.string, name: PropTypes.string }).isRequired,
    open: PropTypes.bool.isRequired,
    handelClose: PropTypes.func.isRequired
}

const FindExpartModal = ({ author, open, handelClose }: InferProps<typeof FindExpartModalProp>): JSX.Element => {
    const [message, setMessage] = React.useState('')
    const [screen, setScreen] = React.useState(1)

    const [categoryValue, setCategoryValue] = React.useState('')
    const [subCategoryValue, setSubCategoryValue] = React.useState('')

    const category = [
        { value: 'NGO', label: 'Non-Governmental Organization (NGO)' },
        { value: 'coaching and mentoring', label: 'Coaching and mentoring' },
        { value: 'health', label: 'Health' },
        { value: 'leadership development', label: 'Leadership development' },
        { value: 'law', label: 'Law' },
        { value: 'information technology', label: 'Information technology' },
        { value: 'others', label: 'Others' },

    ];
    const subCategory = [
        { value: 'human right awareness', label: 'Human right awareness' },
        { value: 'social policy', label: 'Social Policy' },
        { value: 'criminal justice', label: 'Criminal Justice' },
        { value: 'human right action', label: 'Human Right Action' },
        { value: 'environment', label: 'Environment' },
        { value: 'health', label: 'Health' },
        { value: 'disability', label: 'Disability' },
        { value: 'equality', label: 'Equality' },
        { value: 'others', label: 'Others' },

    ];
    const handleSubmit = () => {
        if (screen === 1 && categoryValue && subCategoryValue) {
            setScreen(2)
        }
        if (screen === 2 && categoryValue && subCategoryValue) {
            console.log(message)
            setScreen(1)
            setCategoryValue('')
            setSubCategoryValue('')
        }
    }
    return (
        <>
            <Modal open={open} onClose={handelClose}>
                <Modal.Header>
                    <div className="border-b border-gray-200 p-3 w-full">
                        <Modal.Title>Find An Expart</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex mb-4">
                        <img src={author?.image || ''} className="w-10 h-10 rounded-full mr-4" alt="" />
                        <div className="text-sm">{author?.name || ''}</div>
                    </div>
                    {

                        screen === 1 ? <div>

                            <div className="h-96">
                                <Select
                                    className="mb-4"
                                    classNamePrefix="select"
                                    placeholder="Select Category of Service Provider"
                                    onChange={(val) => setCategoryValue(val.value)}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="color"
                                    options={category}
                                />
                                <Select
                                    className="mb-4"
                                    classNamePrefix="select"
                                    onChange={(val) => setSubCategoryValue(val.value)}

                                    placeholder="Select Sub-Category of Service Provider"
                                    isClearable={true}
                                    isSearchable={true}
                                    name="color"
                                    options={subCategory}
                                />
                                <Select
                                    className="mb-4"
                                    classNamePrefix="select"
                                    placeholder="Select Location of Service Provider"
                                    isClearable={true}
                                    isSearchable={true}
                                    name="color"
                                    options={states}
                                />
                                <textarea name="" onChange={(e) => setMessage(e.target.value)} className="w-full h-32 border border-white bg-gray-100 text-sm" placeholder="Start your complaint..."></textarea>
                            </div>
                        </div> :
                            <div>
                                <div className="text-bold">{categoryValue}</div>
                                <div className='mb-6'>{subCategoryValue}</div>
                                <div>{message}</div>
                            </div>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={handleSubmit} className="p-1 bg-warning text-white rounded-sm ">
                        {screen === 1 ? "Next" : "SendMessage"}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default FindExpartModal;
