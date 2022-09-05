import React from 'react'

export interface Props{
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
}

const Messages:React.FC<Props> = ({messages,display}) => {
   
    


    
  return (
    <section className='all-messages'>
      {messages?.map(message=>(
        <div className={ display.id===message.author_id?'own-message':'message'} key={message.id} >
            <p>{message?.message}</p>
            </div>
            
      ))}
      
    </section>
  )
}

export default Messages
