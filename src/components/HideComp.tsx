import React, { useEffect, useState } from 'react';
import { SERVER_URL } from "utils/constants"
import axios from "axios"
import { HIDE, UNHIDE } from "apollo/queries/generalQuery"
import { print } from "graphql"
import { useRecoilValue } from "recoil"
import { UserAtom } from "atoms/UserAtom"
import { setTimeout } from 'timers';

const HideComp = ({ id }: { id: string }) => {
  const author = useRecoilValue(UserAtom)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 10000);
  }, [])

  const hide = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(HIDE),
        variables: {
          authorId: author.id,
          itemId: id
        },
      })
      console.log(data)
      setShow(true)
    } catch (e) {
      console.log(e.response)
    }
  }

  const setUndo = async () => {
    try {
      const { data } = await axios.post(SERVER_URL + "/graphql", {
        query: print(UNHIDE),
        variables: {
          authorId: author.id,
          itemId: id
        },
      })
      console.log(data)
      setShow(false)
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <div className='w-[10%] mx-auto my-auto'>
      <img src="/images/close.png" onClick={() => hide()} className="cursor-pointer w-3 h-3 ml-auto my-auto" alt="" />
      {
        show && <div className='fixed z-10 left-0 right-0 w-full bottom-10'>
          <div className="flex px-6 w-1/2 mx-auto justify-between items-center bg-white shadow-lg border rounded-lg py-3">
            <div>You have just removed an item from your timeline.</div>
            <button className='p-2 bg-warning text-white' onClick={() => setUndo()}>Undo</button>
          </div>
        </div>
      }
    </div>
  );
};

export default HideComp;