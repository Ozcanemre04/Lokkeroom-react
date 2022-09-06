import React, { useState } from 'react'


import EachMessage from './EachMessage';

export interface Mes{
    messages: [{
        message: string;
        name: string;
        id: string;
        author_id: string;
    }] | undefined;
    display: {
        name: string;
        id: string;
    }
    config: {
      headers: {
          Authorization: string;
      };
  }

  messageCount: number
  setMessageCount: React.Dispatch<React.SetStateAction<number>>
}

const Messages:React.FC<Mes> = ({messages,display,config,messageCount,setMessageCount}) => {
  



  return (
    <section className='all-messages'>
      {messages?.map((message)=>(
      <EachMessage key={message?.id} message={message} display={display} config={config} messageCount={messageCount} setMessageCount={setMessageCount} />

        
            
      ))}
      
    </section>
  )
}

export default Messages
