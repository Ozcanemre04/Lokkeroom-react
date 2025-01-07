import React, { memo, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Socket } from 'socket.io-client';
import { log } from 'console';
import { randomInt } from 'crypto';
import axiosInstance from '../../../../Interceptor/axiosInstance';
import { IMessage } from '../../../../Interface/IMessage';

interface Props{
  socket: Socket
  LobbyId:string; 
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]|null >> ;
}

const Sendmessage:React.FC<Props> = ({LobbyId,socket}) => {
const [message,setMessage] =useState('')
 function handleChange(e:React.ChangeEvent<HTMLInputElement>){
  setMessage(e.target.value)
 }

 async function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
  e.preventDefault() 
  await axiosInstance.post('api/lobby/'+LobbyId,{
    message:message
  })
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
