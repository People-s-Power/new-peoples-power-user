import React, { useState, useEffect } from 'react';
import { socket } from "pages/_app"

const online = ({ id }: { id: any }) => {
  const [online, setOnline] = useState(false)

  useEffect(() => {
    socket.emit('get_online_status', id, response => {
      // console.log(response)
      setOnline(response)
    });
  }, [])
  return (
    <>
      <div className='my-auto h-2'>
        {
          online ? <div className="mx-1 bg-green-500 w-2 h-2 my-auto rounded-full"></div> : <div className="mx-1 bg-gray-500 w-2 h-2 my-auto rounded-full"></div>
        }
      </div>
    </>
  );
};

export default online;