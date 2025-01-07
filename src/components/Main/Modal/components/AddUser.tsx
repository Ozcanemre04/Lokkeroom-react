import React, { memo, useState } from 'react'
import axios from 'axios'
import { Socket } from 'socket.io-client';
import axiosInstance from '../../../../Interceptor/axiosInstance';

interface Props{
LobbyId:string;
adminId:string
socket:Socket
LobbyName:string;
}
const AddUser:React.FC<Props> = ({LobbyId,adminId,socket,LobbyName}) => {
  const[input,setInput] =useState('')

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setInput(e.target.value)
  }


  async function onSubmit(){
    
  await axiosInstance.post('api/admin/lobby/'+ LobbyId +'/add_user',{
    user_name:input
   })
   .then(res=>{    
    socket.emit("add-user",{id:res.data.id,name:res.data.name,lobby_id:res.data.lobby_id,user_id:res.data.user_id,lobbyName:LobbyName})
    })
    
  }
  
  return (
    <>
      {adminId!=='0'&& 
        <div className='form'>
        <input type="text" name="" id="" placeholder='write name of user' onChange={handleChange} />
        <button onClick={onSubmit} >+</button>
        </div>
      }
      </>
  )
}

export default memo(AddUser)
