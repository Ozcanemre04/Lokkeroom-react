import React, { memo, useState } from 'react'
import { Socket } from 'socket.io-client';
import axiosInstance from '../../../../Interceptor/axiosInstance';
interface Props{
socket: Socket;
}

const CreateLobby:React.FC<Props> = ({socket}) => {
const[input,setInput] = useState('')
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
     setInput(e.target.value);   
  }

  async function handleSubmit(){
   await axiosInstance.post('api/admin/newadmin/lobby',{
      name:input
    })
    .then(res=>{
      socket.emit("create-lobby",res.data)
      setInput("")
    });
  }
  
  
  return (
    <div className='form'>
        <input type="text" name="" id="" placeholder='write lobby name' onChange={handleChange} value={input} />
        <button onClick={handleSubmit} >+</button>
    </div>
  )
}

export default memo(CreateLobby)
