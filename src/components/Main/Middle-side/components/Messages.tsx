import React, { memo} from 'react'
import EachMessage from './EachMessage';
import { IMessage } from '../../../../Interface/IMessage';


export interface Mes{
  messages: IMessage[]|null;
}

const Messages:React.FC<Mes> =({messages}) => {

  return (
    <section className='all-messages' id='all-messages'>
      {messages?.map((message)=>(
      <EachMessage key={messages.indexOf(message)} message={message} />
    
      ))}
      
    </section>
  )
}

export default memo(Messages)
