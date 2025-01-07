import React, { memo } from 'react'
import { Socket } from 'socket.io-client';
import EachMessage from './EachMessage';
import { IMessage } from '../../../../Interface/IMessage';
import { IDisplay } from '../../../../Interface/IDisplay';

export interface Mes{
  messages: IMessage[]|null;
  display: IDisplay|null
  LobbyId:string;
  adminId:string;
  socket: Socket;
}

const Messages:React.FC<Mes> =({messages,display,LobbyId,adminId,socket}) => {
  
  return (
    <section className='all-messages' id='all-messages'>
      {messages?.map((message)=>(
      <EachMessage key={messages.indexOf(message)} message={message} display={display} LobbyId={LobbyId} adminId={adminId} socket={socket} />
    
      ))}
      
    </section>
  )
}

export default memo(Messages)
