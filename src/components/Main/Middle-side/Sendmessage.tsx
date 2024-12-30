import React, { memo, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Socket } from 'socket.io-client';
import { log } from 'console';
import { randomInt } from 'crypto';

interface Props{
  config: {
    headers: {
        Authorization: string;
    };};
    socket: Socket
    LobbyId:string;
    display: {
      name: string;
      id: string;
  }
    messages: {
      message: string;
      lobby_id: string;
      id: string;
      author_id: string;
      name:string
  }[]
  setMessages: React.Dispatch<React.SetStateAction<{
    message: string;
    lobby_id: string;
    id: string;
    author_id: string;
    name:string
}[] >> ;
}
const Sendmessage:React.FC<Props> = ({config,LobbyId,messages,socket,display}) => {
const [message,setMessage] =useState('')
 function handleChange(e:React.ChangeEvent<HTMLInputElement>){
  setMessage(e.target.value)
 }



 function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
  e.preventDefault() 
  axios.post('http://localhost:5000/api/lobby/'+LobbyId,{
    message:message
  },config)
  .then(res=>{
    if(res.data.lobby_id===LobbyId){
      socket.emit("send-message",res.data)
    }
  })
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

export default memo(Sendmessage)
