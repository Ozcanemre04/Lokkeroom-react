import React, { useContext, useEffect } from 'react'
import MiddleTitle from './components/MiddleTitle'
import Messages from './components/Messages'
import Sendmessage from './components/Sendmessage'
import useFetch from '../../../hooks/useFetch';
import useMessageSocket from '../../../hooks/useMessageSocket';
import { IMessage } from '../../../Interface/IMessage';
import {AdminIdContext, LobbyIdContext, SocketContext } from '../../../pages/Main';

export interface IMiddleSide{
  title:string|null|undefined
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
}

const MiddleSide:React.FC<IMiddleSide> = ({title,setIsShown}) => {
  const socket = useContext(SocketContext)
  const LobbyId = useContext(LobbyIdContext)
  const {data:messages,setData:setMessages} = useFetch<IMessage[]|null>
  (`api/lobby/${LobbyId}?page=1&limit=10000000000000`,LobbyId)
  useMessageSocket(socket,setMessages);
  
  useEffect(() => {
      if (LobbyId) {
        socket.emit('join-room', LobbyId)
      }
      socket.off("receive-message").on("receive-message", msg => {
        console.log(msg);
        
        if (msg.lobby_id === LobbyId) {
          setMessages((prev) => (prev?[...prev, msg]:[msg]))
        }
      })
    }, [LobbyId])
    
    useEffect(()=>{
        let container = document.getElementById("all-messages")!;
        container.scrollTop = container.scrollHeight;
      },[messages])

  return (
    <>
          <MiddleTitle title={title} setIsShown={setIsShown} />
          <Messages messages={messages} />
          <Sendmessage />
    </>
  )
}

export default MiddleSide