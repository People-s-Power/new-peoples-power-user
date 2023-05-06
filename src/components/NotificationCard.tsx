import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Modal } from 'rsuite';

const NotificationCard = ({ hide, msg, link }: { hide: boolean, msg: string, link: any }) => {
  const [show, setShow] = useState(hide)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setShow(false)
  //   }, 10000)
  // }, [])
  return (
    <>
      <div className='fixed bottom-10 w-full left-0 right-0 z-10'>
        {show && (link !== null ?
          <Modal open={show} onClose={() => setShow(false)}>
            <Modal.Header>Success</Modal.Header>
            <Modal.Body>
              <div className='text-center'>
                <img src="/images/success.png" className='mx-auto w-32 my-4' alt="" />
                <div>{msg}. <Link href={link}><span className='text-warning'>View</span></Link></div>
              </div>
            </Modal.Body>
          </Modal> :
          <div className="flex px-6 w-1/2 mx-auto justify-between items-center bg-white shadow-lg rounded-lg py-3">
            <div>{msg}</div>
            <button className='p-2 bg-warning text-white'>Undo</button>
          </div>
        )
        }
      </div>
    </>
  );
};

export default NotificationCard;