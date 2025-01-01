import React, { memo, useState } from 'react'
import axios from 'axios'
import { log } from 'console';
import { Socket } from 'socket.io-client';
interface Props{
  config: {
    headers: {
        Authorization: string;
    }
}
socket: Socket;

}

const CreateLobby:React.FC<Props> = ({config,socket}) => {
const[input,setInput] = useState('')
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
     setInput(e.target.value);
     
  }


  function handleSubmit(){
    
    axios.post('http://localhost:5000/api/admin/newadmin/lobby',{
      name:input
    },config)
    
    .then(res=>{
      socket.emit("create-lobby",res.data)
    });
  }
  
  
  return (
    <div className='form'>
        <input type="text" name="" id="" placeholder='write lobby name' onChange={handleChange} />
        <button onClick={handleSubmit} >+</button>
    </div>
  )
}

export default memo(CreateLobby)
