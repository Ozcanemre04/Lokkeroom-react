import React, { useState } from 'react'
import axios from 'axios'

interface Props{
  LobbyId:string;

  config: {
    headers: {
        Authorization: string;
    };};
allUser: [{
  id: string;
  name: string;
  lobby_id: string;
}] | undefined

setAllUser: React.Dispatch<React.SetStateAction<[{
  id: string;
  name: string;
  lobby_id: string;
}] | undefined>>

adminId:string

display: {
  name: string;
  id: string;
}
}
const AddUser:React.FC<Props> = ({LobbyId,config,allUser,setAllUser,adminId,display}) => {
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
