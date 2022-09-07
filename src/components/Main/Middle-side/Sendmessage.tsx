import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'

interface Props{
  config: {
    headers: {
        Authorization: string;
    };};
    LobbyId:string;

    messages: [{
      message: string;
      name: string;
      id: string;
      author_id: string;
  }] | undefined
  setMessages: React.Dispatch<React.SetStateAction<[{
    message: string;
    name: string;
    id: string;
    author_id: string;
}] | undefined>> ;

messageCount: number
setMessageCount: React.Dispatch<React.SetStateAction<number>>
}
const Sendmessage:React.FC<Props> = ({config,LobbyId,setMessages,messages,messageCount,setMessageCount}) => {
const [input,setInput] =useState('')
 function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setInput(e.target.value)
 }

const copyMessage= Object.assign([],messages)

 function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
  e.preventDefault()
  axios.post('https://lokkeroom.herokuapp.com/api/lobby/'+LobbyId,{
    message:input
  },config)
  .then(res=>copyMessage.push(res.data))
  setMessages(copyMessage)
  setMessageCount(messageCount + 1)
 }

  return (
    <section className='text'>
      <form action="">
         <input type="text" onChange={handleChange} />
      <button onClick={handleClick}><FontAwesomeIcon icon={faPlay} /></button>
      </form>
      
    </section>
  )
}

export default Sendmessage
