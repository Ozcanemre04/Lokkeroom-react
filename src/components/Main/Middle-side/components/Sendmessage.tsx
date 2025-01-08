import React, { memo, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../../../Interceptor/axiosInstance';
import { DisplayContext, LobbyIdContext, SocketContext } from '../../../../pages/Main';

const Sendmessage:React.FC = () => {
const socket = useContext(SocketContext) 
const display = useContext(DisplayContext)
const LobbyId = useContext(LobbyIdContext)
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
      socket.emit("send-message",{id: res.data.id, message: res.data.message, author_id: res.data.author_id, lobby_id: res.data.lobby_id,name:display?.name})
    }
    setMessage("")
  })
 }

  return (
    <section className='text'>
      <form action="">
         <input type="text" onChange={handleChange} value={message} />
      <button onClick={handleClick} disabled={!message}><FontAwesomeIcon icon={faPlay} /></button>
      </form>
      
    </section>
  )
}

export default memo(Sendmessage)
