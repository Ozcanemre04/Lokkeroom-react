import React, { useEffect, useState } from 'react'
import MiddleTitle from './components/MiddleTitle'
import Messages from './components/Messages'
import Sendmessage from './components/Sendmessage'
import { Socket } from 'socket.io-client';
import axios from 'axios'
import axiosInstance from '../../../Interceptor/axiosInstance';
import useFetch from '../../../hooks/useFetch';
import { log } from 'console';
import useMessageSocket from '../../../hooks/useMessageSocket';
import { IMessage } from '../../../Interface/IMessage';
import { IDisplay } from '../../../Interface/IDisplay';

export interface IMiddleSide{
  display:IDisplay|null
  LobbyId:string;
  adminId:string;
  socket: Socket;
  title:string|null|undefined
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
}

const MiddleSide:React.FC<IMiddleSide> = ({title,setIsShown,display,adminId,LobbyId,socket}) => {
  const {data:messages,setData:setMessages} = useFetch<IMessage[]|null>
  (`api/lobby/${LobbyId}?page=1&limit=10000000000000`,LobbyId)
  useMessageSocket(socket,setMessages);
  
  useEffect(() => {
      if (LobbyId) {
        socket.emit('join-room', LobbyId)
      }
      socket.off("receive-message").on("receive-message", msg => { 
        if (msg.lobby_id === LobbyId) {
          setMessages((prev) => (prev?[...prev, msg]:[msg]))
        }
      })
    }, [LobbyId])
    

  return (
    <>
          <MiddleTitle title={title} setIsShown={setIsShown} display={display} adminId={adminId} />
          <Messages messages={messages} display={display} LobbyId={LobbyId} adminId={adminId} socket={socket} />
          <Sendmessage LobbyId={LobbyId} setMessages={setMessages} socket={socket} />
    </>
  )
}

export default MiddleSide