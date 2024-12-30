import React, { memo, useState } from 'react'


import EachMessage from './EachMessage';
import { Socket } from 'socket.io-client';

export interface Mes{
    messages: {
        message: string;
        lobby_id: string;
        id: string;
        author_id: string;
        name:string
    }[];
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
  setMessages: React.Dispatch<React.SetStateAction<{
    message: string;
    lobby_id: string;
    id: string;
    author_id: string;
    name:string
}[] >> ;

}

const Messages:React.FC<Mes> =({messages,setMessages,display,config,LobbyId,adminId,socket}) => {
  



  return (
    <section className='all-messages'>
      {messages?.map((message)=>(
      <EachMessage key={messages.indexOf(message)} message={message} display={display} config={config} LobbyId={LobbyId} adminId={adminId} socket={socket} />
    
      ))}
      
    </section>
  )
}

export default memo(Messages)
