import React, { useEffect, useState } from 'react'
import MiddleTitle from './components/MiddleTitle'
import Messages from './components/Messages'
import Sendmessage from './components/Sendmessage'
import { Socket } from 'socket.io-client';
import axios from 'axios'

export interface IMiddleSide{
    
    display: {
        name: string;
        id: string;
    }
    config: {
      headers: {
          Authorization: string;
      };
  }
  LobbyId:string;
  adminId:string;
  socket: Socket;


title:string|null|undefined
setIsShown: React.Dispatch<React.SetStateAction<boolean>>

}

const MiddleSide:React.FC<IMiddleSide> = ({title,setIsShown,display,adminId,LobbyId,socket,config}) => {
  const [messages, setMessages] = useState<{ message: string, lobby_id: string, id: string, author_id: string, name: string }[]>([])
  const displayMessage = () => {
    axios.get('http://localhost:5000/api/lobby/' + LobbyId + '?page=1&limit=10000000000000', config)
      .then(res => setMessages(res.data.result))
  }

  useEffect(() => {
      if (LobbyId) {
        socket.emit('join-room', LobbyId)
      }
      displayMessage()
      socket.off("receive-message").on("receive-message", msg => {
        if (msg.lobby_id === LobbyId) {
          setMessages((prev) => [...prev, msg])
        }
      })
    }, [LobbyId])

    useEffect(()=>{
      socket.on("deleted-message", deletedMsg => {
        setMessages((prev) => prev.filter(x => x.id !== deletedMsg.id));
      })
      socket.on("updated-message", (updatedMsg: { message: string, author_id: string, name: string, id: string, lobby_id: string }) => {
        setMessages((prev) => prev.map((item) => item.id === updatedMsg.id ? { ...item, message: updatedMsg.message } : item));
  
      })
      return () => {
        socket.off("deleted-message");
        socket.off("updated-message");
        
      }
    },[])

  return (
    <>
          <MiddleTitle title={title} setIsShown={setIsShown} display={display} adminId={adminId} />
          <Messages messages={messages} display={display} config={config} LobbyId={LobbyId} adminId={adminId} socket={socket} setMessages={setMessages} />
          <Sendmessage config={config} LobbyId={LobbyId} setMessages={setMessages} messages={messages} socket={socket} display={display} />
    </>
  )
}

export default MiddleSide