import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const NotificationCard = ({ hide, msg, link }: { hide: Boolean, msg: string, link: any }) => {
  const [show, setShow] = useState(hide)
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 10000)
  }, [])
  return (
    <>
      <div className='fixed bottom-10 w-full left-0 right-0 z-10'>
        {show && (
          <div className="flex px-6 w-1/2 mx-auto justify-between items-center bg-white shadow-lg rounded-lg py-3">
            <div>{msg}</div>
            {
              link !== null ? <Link href={link}>
                <button className='p-2 bg-warning text-white'>View</button></Link> : <button className='p-2 bg-warning text-white'>Undo</button>
            }
          </div>
        )
        }
      </div>
    </>
  );
};

export default NotificationCard;