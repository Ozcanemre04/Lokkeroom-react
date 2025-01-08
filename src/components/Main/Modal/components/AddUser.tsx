import React, { memo, useContext, useState } from 'react'
import { Socket } from 'socket.io-client';
import axiosInstance from '../../../../Interceptor/axiosInstance';
import { AdminIdContext, LobbyIdContext, SocketContext } from '../../../../pages/Main';

interface Props{
LobbyName:string;
}
const AddUser:React.FC<Props> = ({LobbyName}) => {
  const[input,setInput] =useState('')
  const[error,setError] =useState('')
  const socket = useContext(SocketContext)
  const LobbyId = useContext(LobbyIdContext)
  const adminId = useContext(AdminIdContext)
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setInput(e.target.value)
    setError("")
  }


  async function onSubmit(){
    
  await axiosInstance.post('api/admin/lobby/'+ LobbyId +'/add_user',{
    user_name:input
   })
   .then(res=>{
    if(res.data==='already added'){
      setError(res.data);
    }
    else{
      socket.emit("add-user",{id:res.data.id,name:res.data.name,lobby_id:res.data.lobby_id,user_id:res.data.user_id,lobbyName:LobbyName})
    }
    setInput("")
    })
  .catch(err=>console.log(err)
  )
    
  }
  
  return (
    <>
      {adminId!=='0'&& 
        <div className='form'>
        <input type="text" name="" id="" placeholder='write name of user' onChange={handleChange} value={input} />
        <button onClick={onSubmit} disabled={!input} >+</button>
        </div>
      }
      <p style={{color:"red",paddingLeft:"5px"}}>{error}</p>
      </>
  )
}

export default memo(AddUser)
