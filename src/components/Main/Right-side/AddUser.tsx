import React, { useState } from 'react'
import axios from 'axios'
import { Socket } from 'socket.io-client';

interface Props{
  LobbyId:string;

  config: {
    headers: {
        Authorization: string;
    };};


adminId:string


socket:Socket
LobbyName:string;
}
const AddUser:React.FC<Props> = ({LobbyId,config,adminId,socket,LobbyName}) => {
  const[input,setInput] =useState('')

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setInput(e.target.value)
  }

const int = parseInt(LobbyId)
  function onSubmit(){
    
   axios.post('http://localhost:5000/api/admin/lobby/'+ LobbyId +'/add_user',{
    user_name:input
   },config)
   .then(res=>{
    console.log(LobbyId);
    
    console.log(res.data);
    
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

export default AddUser
